from ..schemas.user import User
from beanie import Document
from datetime import datetime
class UserInDB(User, Document):
    hashed_password: str
    created_at: datetime
    class Settings:
      name = "users"