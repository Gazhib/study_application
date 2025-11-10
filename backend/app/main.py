from fastapi import FastAPI, HTTPException


from .api.v1.routes import auth
from .api.v1.routes import task
from .api.v1.routes import timer

from fastapi.middleware.cors import CORSMiddleware

from beanie import init_beanie
from pymongo import AsyncMongoClient
from .models.user import UserInDB
from .models.task import TaskInDb
from .models.timer import TimerSessionDB


from dotenv import load_dotenv
import os


load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")
db_name = "study_application"
mongodb_client = None

async def init_db():
    global mongodb_client
    client = AsyncMongoClient(MONGODB_URI)
    await init_beanie(database=client[db_name], document_models=[UserInDB, TaskInDb, TimerSessionDB])
    mongodb_client = client


origins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]

app = FastAPI()

app.include_router(auth.router)
app.include_router(task.router)
app.include_router(timer.router)


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

