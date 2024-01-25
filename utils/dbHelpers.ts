import axios from "axios";
import { Task } from "./types";

export async function handleEditTaskInDB(editedTask: Task) {
  const response = await axios.put(
    `${window.location.origin}/api/tasks`,
    editedTask
  );
  const { data } = await response.data;
  return data;
}

export async function saveNewDataInDB(newTaskData: Task) {
  const response = await axios.post(
    `${window.location.origin}/api/tasks`,
    newTaskData
  );
  const { data } = await response.data;
  return data;
}

export async function deleteTaskByIDInDB(taskData: Task) {
  const response = await axios.delete(
    `${window.location.origin}/api/tasks/${taskData._id}`
  );
  const { data } = await response.data;
  return data;
}

export async function updateBoardByIdInDB(editedBoard: any) {
  const response = await axios.put(
    `${window.location.origin}/api/board/${editedBoard._id}`,
    editedBoard
  );
  const { data } = await response.data;
  console.log(data);
  return data;
}
