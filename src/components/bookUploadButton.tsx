"use client";
import axios from "axios";
import { Loader2, Plus } from "lucide-react";
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
    setFile(null);
    router.refresh();
    return;
  };

  return (
    <div>
      <input
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
        type="file"
        accept="application/pdf"
        name=""
        id=""
      />
      <div className="flex w-48 min-h-64 flex-col items-center justify-center border-2 border-orange-800 border-dashed rounded-md transition-all duration-300 hover:scale-102">
        <h2 className="text-sm">{file && `${file?.name.slice(0, 20)}...`}</h2>
        {file ? (
          <div>
            <Button variant={"link"} onClick={handleUpload} disabled={loading}>
              {" "}
              {loading ? (
                <>
                  Uploading <Loader2 className="animate-spin" />
                </>
              ) : (
                <span className="underline hover:text-primary/80">
                  click here to upload
                </span>
              )}{" "}
            </Button>
          </div>
        ) : (
          <Button variant={"link"} onClick={() => inputRef.current?.click()}>
            Click to add a PDF<Plus />
          </Button>
        )}
      </div>
    </div>
  );
}
