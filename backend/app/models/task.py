from beanie import Document
from bson import ObjectId
from enum import Enum
from ..schemas.task import Task


class TaskInDb(Task, Document):
  user_id: str
  class Setting:
    name = "tasks"