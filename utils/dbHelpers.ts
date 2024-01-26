import axios from "axios";
import { Task } from "./types";

export const fetchTasksAndBoardInfo = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/tasks/${id}`
  );
  const { data, board } = await response.data;
  return { data, board };
};

export async function handleEditTaskInDB(editedTask: Task) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_URL}/api/tasks`,
    editedTask
  );
  const { data } = await response.data;
  return data;
}

export async function saveNewDataInDB(newTaskData: Task) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/tasks`,
    newTaskData
  );
  const { data } = await response.data;
  return data;
}

export async function deleteTaskByIDInDB(taskData: Task) {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_URL}/api/tasks/${taskData._id}`
  );
  const { data } = await response.data;
  return data;
}

export async function updateBoardByIdInDB(editedBoard: any) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_URL}/api/board/${editedBoard._id}`,
    editedBoard
  );
  const { data } = await response.data;
  return data;
}
