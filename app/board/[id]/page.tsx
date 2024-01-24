import Header from "@/components/Header";
import Tasks from "@/components/Tasks";
import React from "react";
import axios from "axios";

export default async function page({ params }: any) {
  const { id } = params;

  const fetchTasks = async () => {
    const response = await axios.get(`http://localhost:3000/api/tasks/${id}`);
    const { data } = await response.data;
    return data;
  };
  const tasksData = await fetchTasks();

  return (
    <div className="mx-auto flex w-full h-full flex-col items-center p-4 md:p-20">
      <Header />
      <Tasks data={tasksData} boardId={id} />
    </div>
  );
}
