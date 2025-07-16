import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const { id , page  } = await req.json();
    
    const data = await prisma.books.update({
        where:{
            id:id
        },
        data:{
            currentPage:page
        }
    })

    console.log(data);


    return NextResponse.json("updated");
}