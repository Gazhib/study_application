from fastapi import FastAPI, Depends, HTTPException
from .api.v1.routes import auth
from typing import Annotated

from fastapi.middleware.cors import CORSMiddleware

from .dependencies import get_current_user
from .schemas.user import User


from beanie import init_beanie, Document
from pymongo import AsyncMongoClient
from .models.user import UserInDB


from dotenv import load_dotenv
import os


load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")
db_name = "study_application"
mongodb_client = None

async def init_db():
    global mongodb_client
    client = AsyncMongoClient(MONGODB_URI)
    await init_beanie(database=client[db_name], document_models=[UserInDB])
    mongodb_client = client


origins = [
  "http://localhost:5173"
]

app = FastAPI()

app.include_router(auth.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    await init_db()
    
    
@app.get("/healthz")
async def health_check():
    try:
        if mongodb_client is None:
            raise HTTPException(status_code=503, detail="Database not initialized")
        await mongodb_client.admin.command("ping")
        return {"status" : "OK"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connections failed {e}")

