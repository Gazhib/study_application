from enum import Enum
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal

class Priority(str, Enum):
  low = "low"
  normal = "normal"
  high = "high"
  all = "all"
  
class Status(str, Enum):
  todo = "todo"
  doing = "doing"
  done = "done"
  archieved = "archived"
  all = "all"


class Task(BaseModel):
  title: str
  description: str | None = None
  due_at: datetime
  priority: Priority = Priority.normal
  status: Status = Status.todo
  total_ms: int = 0
  
  
class FilterParams(BaseModel):
  model_config = {"extra" : "forbid"} 
  title: str = Field(min_length=0, max_length=50, default="")
  due_at: datetime | None = None
  priority: Priority | None = None
  status: Status | None = None