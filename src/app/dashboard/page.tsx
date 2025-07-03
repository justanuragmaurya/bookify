"use client"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRef, useState } from "react"
import axios from "axios"

export default function Dashboard() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file,setFile] = useState<File | null>(null)
    const [loading,setLoading] = useState<boolean>(false)
    
    const handleChange = (e:any)=>{
        setFile(e.target.files[0])
    }

    const handleUpload = async()=>{
        setLoading(true)

        const { status , data } = await axios.get("/api/upload/")

        if(file != null && status==200){
            const { signedUrl, fileUrl } = data;
        
            const response = await axios.put(signedUrl,file);
            
            if(response.status===200){
                console.log("Uploaded")
            }
            
            const db = await axios.post("/api/upload",{title:file.name,bookURL:fileUrl})

            if(db.status===200){
                console.log("updated db")
            }

        }
        setLoading(false)
        return;
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        {file?.name}
        <input ref={inputRef} onChange={handleChange} className="hidden" type="file" accept="application/pdf" name="" id="" />
        <div onClick={()=>inputRef.current?.click()} className="py-18 px-32 rounded-md border border-accent-foreground w-max mx-auto hover:scale-105 border-dashed ">
            <Plus/>
        </div>        
        <Button disabled={loading} onClick={handleUpload}>Upload</Button>
    </div>
  )
}
