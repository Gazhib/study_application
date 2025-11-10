from pydantic import BaseModel
from datetime import datetime
class TimerSession(BaseModel):
  task_id: str
  user_id: str
  start_time: datetime
  end_time: datetime | None = None
  duration_minutes: int = 25
  is_active: bool = True
  session_type: str = "work"
  paused_at: datetime | None = None
  total_paused_ms: int = 0