import Header from "@/components/Header";
import Tasks from "@/components/Tasks";
import React from "react";

export default function page() {
  return (
    <div className="mx-auto flex w-full h-full flex-col items-center p-4 md:p-20">
      <Header />
      <Tasks />
    </div>
  );
}
