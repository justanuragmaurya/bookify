import BookUploadButton from "@/components/bookUploadButton";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Book } from "lucide-react";
import {Bricolage_Grotesque} from "next/font/google"
import Link from "next/link";
import React from "react";

const font = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

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
    <h1 className={`${font.className} text-5xl font-bold mb-5 flex gap-2 items-center`}><Book size={50}/>{" "}Your Library</h1>
    <div className="grid grid-cols-5 gap-3 h-full">
      <BookUploadButton/>
      {books.map((book, index) => {

        return (
          <>
            <Link href={`/library/${book.id}`}>
              <div key={index} className="flex flex-col items-center justify-center px-10 py-20 border border-ring/60 hover:border-dashed hover:border-ring rounded-md h-full text-balance hover:scale-102 transition-all duration-300 ">
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
