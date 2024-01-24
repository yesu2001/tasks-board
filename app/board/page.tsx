import { generateUniqueId } from "@/utils/generateUid";
import { redirect } from "next/navigation";
import React from "react";

export default function page() {
  const uid = generateUniqueId();

  redirect(`/board/${uid}`);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Board Page
    </div>
  );
}
