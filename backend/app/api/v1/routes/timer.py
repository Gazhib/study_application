from fastapi import APIRouter, Depends, HTTPException, status, Response, Query
from typing import Annotated


from bson import ObjectId

from ....models.user import UserInDB
from ....models.task import TaskInDb
from ....dependencies import get_current_user


from ....models.timer import TimerSessionDB

from datetime import datetime

router = APIRouter(tags=["timer"])



@router.post("/tasks/{id}/timer/start")
async def start_timer(id: str, user: Annotated[UserInDB, Depends(get_current_user)]):
  
  DBtask = await TaskInDb.find(TaskInDb.id == ObjectId(id)).first_or_none()
  
  if not DBtask:
    raise HTTPException(status.HTTP_404_NOT_FOUND)
  
  if str(DBtask.user_id) != str(user.id):
    raise HTTPException(status.HTTP_403_FORBIDDEN)
  
  timer_session = await TimerSessionDB.find(TimerSessionDB.task_id == id, TimerSessionDB.is_active == True).first_or_none()
    
  if timer_session:
    print(timer_session)
    raise HTTPException(status.HTTP_405_METHOD_NOT_ALLOWED)
  
  new_timer_session = TimerSessionDB(task_id=str(DBtask.id), user_id = user.id.__str__(), start_time=datetime.now() )
  
  await new_timer_session.create()
  
  return new_timer_session


@router.get("/tasks/{id}/timer/current")
async def current_timer(id: str, user: Annotated[UserInDB, Depends(get_current_user)]):
    
  DBtask = await TaskInDb.find(TaskInDb.id == ObjectId(id)).first_or_none()
  
  if not DBtask:
    raise HTTPException(status.HTTP_404_NOT_FOUND)
  
  if str(DBtask.user_id) != str(user.id):
    raise HTTPException(status.HTTP_403_FORBIDDEN)
   
  timer_session = await TimerSessionDB.find(TimerSessionDB.task_id == id, TimerSessionDB.is_active == True).first_or_none()
    
  if not timer_session:
    raise HTTPException(status.HTTP_404_NOT_FOUND)
  
  return timer_session

@router.post("/tasks/{id}/timer/stop")
async def stop_timer(id: str, user: Annotated[UserInDB, Depends(get_current_user)]):
      
  DBtask = await TaskInDb.find(TaskInDb.id == ObjectId(id)).first_or_none()
  
  if not DBtask:
    raise HTTPException(status.HTTP_404_NOT_FOUND)
  
  if str(DBtask.user_id) != str(user.id):
    raise HTTPException(status.HTTP_403_FORBIDDEN)
   
  timer_session = await TimerSessionDB.find(TimerSessionDB.task_id == id, TimerSessionDB.is_active == True).first_or_none()
    
  if not timer_session:
    raise HTTPException(status.HTTP_404_NOT_FOUND)
  
  timer_session.end_time = datetime.now()
  timer_session.is_active = False

  await timer_session.save()

  return timer_session
