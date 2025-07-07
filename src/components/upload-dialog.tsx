"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "./ui/input";

export default function UploadDialogBox(){
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

    return(
        <Dialog>
            <DialogTrigger><div className="flex gap-1 items-center p-2 bg-primary text-primary-foreground font-semibold rounded-md px-4"> Add a Book <Plus size={20}/> </div></DialogTrigger>  
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-bold">Add a book !</DialogTitle>
                <DialogDescription>
                  Upload your book's pdf give , it a name and click on the upload button.
                </DialogDescription>
              </DialogHeader>
                <div>
                <input
                    ref={inputRef}
                    onChange={handleChange}
                    className="hidden"
                    type="file"
                    accept="application/pdf"
                />
                
                <div>
                    <h2>Enter book's name : </h2>
                    <Input placeholder="Enter the book name here ..."/>
                </div>
                
                </div>
              <DialogFooter>
                <Button>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
    )
}