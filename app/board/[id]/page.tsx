import Header from "@/components/Header";
import Tasks from "@/components/Tasks";
import React from "react";
import axios from "axios";
import { fetchTasksAndBoardInfo } from "@/utils/dbHelpers";

export default async function page({ params }: any) {
  const { id } = params;

  const { data, board } = await fetchTasksAndBoardInfo(id);

  return (
    <div className="mx-auto flex w-full h-full flex-col items-center p-4 md:p-20">
      <Header board={board} />
      <Tasks data={data} boardId={id} />
    </div>
  );
}
