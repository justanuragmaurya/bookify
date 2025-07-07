import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {Bricolage_Grotesque} from "next/font/google"
import BookUploadButton from "./bookUploadButton";
import Link from "next/link";
import { BookA, BookMarked } from "lucide-react";
import Book from "./book";

const font = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});


export default async function AllBooks() {
  const session = await auth();
  if (!session) {
    return <div>Please Login</div>;
  }

  const books = await prisma.books.findMany({
    where: {
      ownerID: session?.user?.id!,
    },
  });

  return(
    <div className="mb-5">
        <h1 className={`${font.className} text-xl font-semibold mb-3 flex gap-2 items-center`}><BookMarked />{" "}All Your Books</h1>
    <div className="flex p-3 gap-3 overflow-scroll">
      <BookUploadButton/>
      {books.map((book, index) => {
        return (
          <Book key={index} book={book}/>
        );
      })}
    </div>
    </div>
  )
}
 