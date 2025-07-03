import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {Bricolage_Grotesque} from "next/font/google"
import BookUploadButton from "./bookUploadButton";
import Link from "next/link";
import { Book, BookA, BookHeartIcon, BookMarked } from "lucide-react";

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

    <div className="grid grid-cols-5 gap-3 h-full">
      <BookUploadButton/>
      {books.map((book, index) => {
        return (
          <div>
            <Link href={`/library/${book.id}`}>
              <div key={index} className="flex flex-col justify-between min-h-32 border border-ring/60 hover:border-dashed hover:border-ring rounded-md h-full text-balance hover:scale-102 transition-all duration-300 ">
                <h1 className={`${font.className} font-semibold m-2 flex gap-2`}><Book/>{book.title?.slice(0, 25)} ...</h1>
                <h2 className={`m-2 text-xs`}>Last Read : {book.lastOpenedAt?.toUTCString()?book.lastOpenedAt?.toUTCString():"Never"}</h2>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
    </div>
  )
}
 