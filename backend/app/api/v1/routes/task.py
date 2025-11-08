from fastapi import APIRouter, Depends, HTTPException, status, Response, Query
from typing import Annotated


from bson import ObjectId

from ....schemas.task import Task
from ....models.user import UserInDB
from ....models.task import TaskInDb
from ....dependencies import get_current_user
from beanie import SortDirection

from ....schemas.task import FilterParams

router = APIRouter(tags=["task"])

@router.get("/tasks")
async def get_tasks(user: Annotated[UserInDB, Depends(get_current_user)], filter_query: Annotated[FilterParams, Query()]):
  username = user.username
  user_id = user.id
  
  taskTitle = filter_query.title
  taskDue = filter_query.due_at
  taskPriority = filter_query.priority
  taskStatus = filter_query.status
  
  filters = [TaskInDb.user_id == user_id.__str__()]

    
  if taskDue:
    filters.append(TaskInDb.due_at == taskDue)
    
  if taskPriority and taskPriority != "all":
    filters.append(TaskInDb.priority == taskPriority)
    
  if taskStatus and taskStatus != "all":
    filters.append(TaskInDb.status == taskStatus)
    
  print("filters:", filters)
  print("title:", taskTitle)
  
  tasks = await TaskInDb.find(*filters, {"title" : {"$regex" : taskTitle, "$options" : "i"}}).sort(("due_at", SortDirection.ASCENDING)).to_list()
  
  return tasks


@router.post("/tasks")
async def add_task(user: Annotated[UserInDB, Depends(get_current_user)], task: Task):
  username = user.username
  user_id = user.id
  print("task title:", task.title)
  print(len(task.title.replace(" ", "")))
  
  if len(task.title.replace(" ", "")) == 0:
    raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Task title can not be empty")
  
  if task.description and len(task.description.replace(" ", "")) > 50:
    raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Task description can not be longer than 50 characters")
  
  
  newTaskInDb = TaskInDb(title=task.title, description=task.description, due_at=task.due_at, status=task.status, priority=task.priority, user_id=user_id.__str__())
  
  await newTaskInDb.create()
  
  return newTaskInDb


@router.post("/tasks/{id}")
async def get_task(id: str, user: Annotated[UserInDB, Depends(get_current_user)]):
  
  task = await TaskInDb.find(TaskInDb.id == ObjectId(id)).first_or_none()
  
  if not task:
    raise HTTPException(status.HTTP_404_NOT_FOUND)
  
  if str(task.user_id) != user.id:
    raise HTTPException(status.HTTP_403_FORBIDDEN)
  
  return task


@router.patch("/tasks/{id}")
async def patch_task(id: str, changedTask: Task, user: Annotated[UserInDB, Depends(get_current_user)]):
  
  DBtask = await TaskInDb.find(TaskInDb.id == ObjectId(id)).first_or_none()
  
  if not DBtask:
    raise HTTPException(status.HTTP_404_NOT_FOUND)
  
  if str(DBtask.user_id) != str(user.id):
    raise HTTPException(status.HTTP_403_FORBIDDEN)
  
  if changedTask.title.replace(" ", "") == "":
    return HTTPException(status.HTTP_400_BAD_REQUEST)
  
  for key, value in changedTask.model_dump().items():
    setattr(DBtask, key, value)
    
  await DBtask.replace()
  
  return DBtask



@router.delete("/tasks/{id}")
async def delete_task(id: str, changedTask: Task, user: Annotated[UserInDB, Depends(get_current_user)], response: Response):
  
  DBtask = await TaskInDb.find(TaskInDb.id == ObjectId(id)).first_or_none()
  
  if not DBtask:
    raise HTTPException(status.HTTP_404_NOT_FOUND)
  
  if str(DBtask.user_id) != str(user.id):
    raise HTTPException(status.HTTP_403_FORBIDDEN)
    
  await DBtask.delete()
  return {"detail": "Successfully deleted"}

    
  
  
  