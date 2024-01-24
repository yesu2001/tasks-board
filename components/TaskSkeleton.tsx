import React from "react";

export default function TaskSkeleton() {
  return (
    <div className="cursor-pointer max-w-xl  flex gap-4 items-center p-3 rounded-lg bg-slate-300">
      <div className="bg-slate-100 rounded-lg w-10 h-10 animate-pulse">
        <p className="text-xl animate-pulse" />
      </div>
      <div className="flex-1 w-[80%] animate-pulse">
        <p className="font-semibold animate-pulse" />
        <p className="text-sm animate-pulse" />
      </div>
      <div className="bg-[#E9A23B] rounded-lg p-3 animate-pulse">
        <div className="w-4 h-4 animate-pulse" />
      </div>
    </div>
  );
}
