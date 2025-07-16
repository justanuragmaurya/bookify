import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {Bricolage_Grotesque} from "next/font/google"
import { Clock10Icon } from "lucide-react";
import Book from "./book";

const font = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export default async function RecentBooks(){
    const session = await auth();

    const recentBooks = await prisma.books.findMany({
    where: {
      ownerID: session?.user?.id || '',
      lastOpenedAt: { not: null }
    },
    orderBy: { lastOpenedAt: 'desc' },
    take: 10
  });

    return(<div className="mb-5">
    <h1 className={`${font.className} text-xl font-semibold mb-2 flex gap-2 items-center`}><Clock10Icon />{" "}Recently Read Books</h1>
    
    <div className="flex sm:grid-cols-3 md:grid-cols-5 gap-3 p-3 h-full overflow-scroll">
      {recentBooks.map((book, index) => {
        return (
          <Book key={index} book={book}/>
        );
      })}
    </div>
    </div>)
}