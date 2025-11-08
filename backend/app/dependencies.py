from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, status, Depends, Request
import jwt
from jwt.exceptions import InvalidTokenError
from .schemas.token import  TokenData
from .models.user import UserInDB

from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")



async def get_user(username: str):
    user = await UserInDB.find_one(UserInDB.username == username)
    if username:
        return user

async def get_current_user(request: Request):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate" : "Bearer"}
        )
    
    token = request.cookies.get("access_token")
    if token is None:
        print("token: ", token)
        raise credentials_exception
    
    try:
        if not ALGORITHM:
            raise ValueError("ALGORITHM environment variable is not set")
        
        if not SECRET_KEY:
            raise ValueError("SECRET_KEY environment variable is not set")
        
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("username")
        user_id = payload.get("user_id")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    
    user = await get_user(username = token_data.username)
    if user is None:
        raise credentials_exception
    
    return user