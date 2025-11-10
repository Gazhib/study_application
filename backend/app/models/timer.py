from ..schemas.timer import TimerSession
from beanie import Document
class TimerSessionDB(TimerSession, Document):
  class Setting:
    name = "timers"
    