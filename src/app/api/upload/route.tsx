import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: true, message: "Not logged in" },
      { status: 401 }
    );
  }

  const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.ACCESSKEYID!,
      secretAccessKey: process.env.SECRETACCESSKEY!,
    },
  });

  const key = `books/uploads/${
    Math.floor(Math.random() * 1000) + Date.now().toString()
  }.pdf`;

  const cmd = new PutObjectCommand({
    Bucket: "thumbnaily-storage",
    Key: key,
    ContentType: "pdf",
  });

  const signedUrl = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
  const fileUrl = `https://thumbnaily-storage.s3.ap-south-1.amazonaws.com/${key}`;

  return NextResponse.json({ signedUrl, fileUrl }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: true, message: "Not logged in" },
      { status: 401 }
    );
  }

  const { title, bookURL } = await req.json();

  try {
    await prisma.books.create({
      data: {
        title: title,
        bookURL: bookURL,
        ownerID: session.user?.id!,
      },
    });
    return NextResponse.json({message:"Uploaded Successfully"})
  } catch (e: any) {
    console.error("Database Error", 500);
    return NextResponse.json({error:true,message:"Error updating data in databse"})
  }
}