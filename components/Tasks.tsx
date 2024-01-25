"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";
import Image from "next/image";
import addIcon from "../assets/Add_round_duotone.svg";
import Drawer from "./Drawer";
import { Task as TaskArray } from "@/utils/types";
import { usePathname } from "next/navigation";
import TaskSkeleton from "./TaskSkeleton";
import {
  deleteTaskByIDInDB,
  handleEditTaskInDB,
  saveNewDataInDB,
} from "@/utils/dbHelpers";

interface TasksProps {
  data: TaskArray[];
  boardId: string;
}
export default function Tasks({ data, boardId }: TasksProps) {
  const [tasks, setTasks] = useState<TaskArray[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTasks(data);
      setLoading(false);
    }, 2000);
  }, []);

  const handleNewTask = () => {
    setOpenDrawer(true);
    setIsEdit(false);
  };

  const handleDelete = async (taskData: any) => {
    const data = await deleteTaskByIDInDB(taskData);
    const updatedTasks = tasks.filter((task) => task._id !== data._id);
    setOpenDrawer(false);
    setTasks(updatedTasks);
  };

  const handleSave = async (taskdata: any) => {
    if (isEdit) {
      const editedTask = {
        ...taskdata,
        board_id: boardId,
      };
      const data = await handleEditTaskInDB(editedTask);
      const updatedTasks = tasks.map((item) =>
        item?._id === data._id ? data : item
      );
      setTasks(updatedTasks);
    } else {
      const newTaskData = {
        ...taskdata,
        board_id: boardId,
      };
      const data = await saveNewDataInDB(newTaskData);
      setTasks((prevState) => [data, ...prevState]);
    }
  };

  return (
    <div className="space-y-3 mt-8 mb-4">
      {loading && tasks.length === 0 && <TaskSkeleton />}
      {tasks?.map((task: TaskArray) => (
        <Task
          key={task.task_id}
          task={task}
          onDelete={handleDelete}
          onSave={handleSave}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      ))}
      <div
        className="w-[100%] md:w-[500px] flex gap-4 items-center bg-[#F5E8D5] p-3 rounded-lg cursor-pointer"
        onClick={handleNewTask}
      >
        <div className=" bg-[#E9A23B] rounded-lg h-70 w-70 p-3">
          <Image src={addIcon} alt="Add icon" width={20} height={20} />
        </div>
        <div>
          <p className="font-semibold">Add new task</p>
        </div>
      </div>
      {openDrawer && (
        <Drawer
          isOpen={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onDelete={handleDelete}
          onSave={handleSave}
          isEdit={isEdit}
        />
      )}
    </div>
  );
}
