"use client";
import { Plus } from "lucide-react";
import React from "react";

export default function BookUploadButton() {
  return (
    <div className="flex flex-col items-center justify-center px-10 py-20 border border-green-500 border-dashed rounded-md hover:border-green-800">
      <div className="flex">
        <Plus size={40} />
      </div>
      <h2 className="text-sm">Upload</h2>
    </div>
  );
}