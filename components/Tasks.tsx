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

interface TasksProps {
  data: TaskArray[]; // Adjust the type within the array if you have a specific data structure
  boardId: string;
}
export default function Tasks({ data, boardId }: TasksProps) {
  const [tasks, setTasks] = useState<TaskArray[]>([]);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTasks(data);
      setLoading(false);
    }, 2000);
  }, []);

  const handleNewTask = () => setIsNew(!isNew);

  const handleDelete = (id: String) => {
    console.log("delete", id);
  };

  const handleSave = async (taskdata: any) => {
    console.log(taskdata);
    const newTaskData = {
      ...taskdata,
      board_id: boardId,
    };
    const response = await axios.post(
      `http://localhost:3000/api/tasks/${boardId}`,
      newTaskData
    );
    const { data } = await response.data;
    console.log(data);
    setTasks((prevState: TaskArray[]) => [data, ...prevState]);
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
      {isNew && (
        <Drawer
          isOpen={isNew}
          onClose={() => setIsNew(false)}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

const tasksData = [
  {
    task_id: "2t347tgf73t73t5",
    task_name: "Task in Progress",
    task_description: "",
    icon: "⏰",
    status: "In Progress",
  },
  {
    task_id: "fw78t874trg38",
    task_name: "Task Completed",
    task_description: "",
    icon: "🤖",
    status: "Completed",
  },
  {
    task_id: "hiuher8w38dii",
    task_name: "Tasks Won't Do",
    task_description: "",
    icon: "☕",
    status: "Won't do",
  },
  {
    task_id: "inw94756wy9h9h",
    task_name: "Task To Do",
    task_description: "Work on dev challenges , learn typescript",
    icon: "📚",
    status: "",
  },
];
