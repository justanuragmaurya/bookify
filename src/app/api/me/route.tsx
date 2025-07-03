import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    
    if(session){
        console.log(session?.user?.id)
    }else{
        console.log("Not Logged IN")
    }
    
    return NextResponse.json({
        message : JSON.stringify(session)
    });
}