import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: true, message: "Not logged in" },
      { status: 401 }
    );
  }

  const { bookid } = await req.json();

  const book = await prisma.books.findUnique({
    where:{
        id:bookid,
        ownerID:session.user?.id
    }
  })

  await prisma.books.update({
    where:{
      id:bookid
    },
    data:{
      lastOpenedAt:new Date()
    }
  })

  return NextResponse.json({
    url:book?.bookURL,
    currentPage:book?.currentPage
  })
}