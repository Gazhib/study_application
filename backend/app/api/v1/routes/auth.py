from fastapi import APIRouter, HTTPException, status, Depends, Response, Cookie, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Annotated
from pwdlib import PasswordHash
from fastapi.security import OAuth2PasswordRequestForm
import jwt
from datetime import timedelta, datetime, timezone
from ....models.user import UserInDB, User
from ....dependencies import get_current_user

from dotenv import load_dotenv
import os


load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


if not ALGORITHM:
    raise ValueError("ALGORITHM environment variable is not set")


router = APIRouter(tags=["auth"])

password_hash = PasswordHash.recommended()

def hash_password(password: str):
  return password_hash.hash(password)

def verify_password(plain_password, hashed_password):
  return password_hash.verify(plain_password, hashed_password)

def create_refresh_or_access_token(data: dict, expiresDelta: timedelta):
  to_encode = data.copy()
  if expiresDelta:
    expire = datetime.now(timezone.utc) + expiresDelta
  else:
    expire = datetime.now(timezone.utc) + timedelta(minutes=15)
  to_encode["exp"] = expire
    
  if not SECRET_KEY:
    raise ValueError("SECRET_KEY environment variable is not set")
    
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt



@router.post("/auth/login", response_model=User)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], response: Response):
  username, password = form_data.username, form_data.password
  user = await UserInDB.find_one(UserInDB.username==username)
  
  if not user:
    raise HTTPException(
          status_code=status.HTTP_401_UNAUTHORIZED,
          detail="Incorrect username or password",
    )
  
  if not verify_password(password, user.hashed_password):
    raise HTTPException(
          status_code=status.HTTP_401_UNAUTHORIZED,
          detail="Incorrect username or password",
    )
  
  token = create_refresh_or_access_token({"username": username}, timedelta(minutes=15))
  response.set_cookie(
    key="access_token",
    path="/",
    value=token,
    httponly=True,
    samesite="lax",
    max_age=910,
  )
  
  refreshToken = create_refresh_or_access_token({"username": username}, timedelta(days=1))
  response.set_cookie(
    key="refresh_token",
    path="/",
    value=refreshToken,
    httponly=True,
    samesite="lax",
    max_age=86400,
  )
  
  return user

@router.post("/auth/registration", response_model=User)
async def registration(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], response: Response):
  username, password = form_data.username, form_data.password
  username = username.lower()
  
  user = await UserInDB.find_one(UserInDB.username==username)
  
  if user:
    raise HTTPException(
          status_code=status.HTTP_418_IM_A_TEAPOT,
          detail="Account with that username already exists",
    )
    
  if " " in username:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="No spaces are allowed in username"
    )
    
  if " " in password:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="No spaces are allowed in password"
    )
    
  hashed_password = hash_password(password)
  
  newUser = UserInDB(username=username, hashed_password=hashed_password, created_at=datetime.now())
  
  await newUser.create()
    
  token = create_refresh_or_access_token({"username": username}, timedelta(minutes=15))
  response.set_cookie(
    key="access_token",
    value=token,
    httponly=True,
    samesite="lax",
    max_age=910,
  )
  
  refreshToken = create_refresh_or_access_token({"username": username}, timedelta(days=1))
  response.set_cookie(
    key="refresh_token",
    value=refreshToken,
    httponly=True,
    samesite="lax",
    max_age=86400,
  )
  
  
  return newUser

@router.get("/auth/refresh")
def refresh(user: str = Cookie(None)):
  return user
  

@router.get("/auth/me")
def me(user: Annotated[User, Depends(get_current_user)]):
  return {
    "user" : user.username
  }
  

@router.get("/auth/logout")
def logout(response: Response):
  response.delete_cookie(key="access_token")
  response.delete_cookie(key="refresh_token")
  
