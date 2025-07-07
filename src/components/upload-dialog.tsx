"use client"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Paperclip, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "./ui/input";

export default function UploadDialogBox(){
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = React.useState<File | null>(null);
    const [title , setTitle] = useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const closeRef = useRef<any>(null)
      
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
        title: title,
        bookURL: fileUrl,
      });

      if (db.status === 200) {
        console.log("updated db");
      }
    }
    setLoading(false);
    setFile(null);
    closeRef.current.click()
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
                  Upload your book's pdf give , give it a name and click on the upload button.
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
                <div className="flex flex-col gap-2">
                    <h2>Enter book's name : </h2>
                    <Input value={title} onChange={(e)=>setTitle(e.target.value)} className="border border-muted-foreground" placeholder="Enter the book name here ..."/>
                </div>
                <div className="flex flex-col gap-2 mt-2 mb-3">
                    <h2>Select book's pdf file: </h2>
                    <Button onClick={()=>inputRef.current?.click()} variant={"ghost"}  className="border border-muted-foreground"> {file?file.name.slice(0,10)+"...":"Upload"} <Paperclip/></Button>
                </div>
                </div>
              <DialogFooter>
                <Button disabled={ !file || loading || title.length == 0} onClick={handleUpload}>{loading?<>Uploading <Loader2 className="animate-spin"/> </>:"Upload"}</Button>
                <DialogClose ref={closeRef} className="hidden">
                    Close
                </DialogClose>
              </DialogFooter>
            </DialogContent>
    </Dialog>
    )
}