import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.ACCESSKEYID!,
      secretAccessKey: process.env.SECRETACCESSKEY!,
    },
  });

  const key = `books/uploads/${Math.floor(Math.random() * 1000) + Date.now().toString()}`;

  const cmd = new PutObjectCommand({
      Bucket: "thumbnaily-storage",
      Key: key, 
      ContentType: "pdf",
    });

    const signedUrl = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
    const fileUrl = `https://thumbnaily-storage.s3.ap-south-1.amazonaws.com/${key}`;

    return NextResponse.json({ signedUrl, fileUrl, key });
}