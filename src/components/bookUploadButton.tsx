"use client";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { Button } from "./ui/button";

export default function BookUploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const handleChange = async (e: any) => {
    setFile(e.target.files[0]);
    return;
  };

  const handleUpload = async () => {
    setLoading(true);

    const { status, data } = await axios.get("/api/upload/");

    if (file != null && status == 200) {
      const { signedUrl, fileUrl } = data;

      const response = await axios.put(signedUrl, file);

      if (response.status === 200) {
        console.log("Uploaded");
      }

      const db = await axios.post("/api/upload", {
        title: file.name,
        bookURL: fileUrl,
      });

      if (db.status === 200) {
        console.log("updated db");
      }
    }
    setLoading(false);
    router.refresh()
    return;
  };

  return (
    <>
      <input
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
        type="file"
        accept="application/pdf"
        name=""
        id=""
      />
      <div
        className="flex flex-col items-center justify-center px-10 py-20 border border-green-500 border-dashed rounded-md hover:border-green-800"
      >
        <div className="flex">
          <Plus size={40} />
        </div>
        <h2 className="text-sm">
          {file&&`${file?.name.slice(0, 20)}...`}
        </h2>
        {file?<div><Button onClick={handleUpload} disabled={loading}> {loading?"Uploading":"Upload"} </Button></div>:<Button onClick={()=>inputRef.current?.click()}>Select File</Button>}
      </div>
    </>
  );
}