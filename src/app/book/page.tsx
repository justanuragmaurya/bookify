import BookUploadButton from "@/components/bookUploadButton";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Plus, PlusSquareIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Books() {
  const session = await auth();
  if (!session) {
    return <div>Please Login</div>;
  }

  const books = await prisma.books.findMany({
    where: {
      ownerID: session?.user?.id!,
    },
  });
  return (
    <div className="p-5">
    <h1 className="text-5xl">Your Library </h1>
    <div className="grid grid-cols-5 gap-3 h-full">
      <BookUploadButton/>
      {books.map((book, index) => {
        return (
          <>
            <Link href={`/book/${book.id}`}>
              <div key={index} className="flex flex-col items-center justify-center px-10 py-20 border rounded-md h-full text-balance">
                <h1>{book.title?.slice(0, 50)}...</h1>
              </div>
            </Link>
          </>
        );
      })}
    </div>
    </div>
  );
}
