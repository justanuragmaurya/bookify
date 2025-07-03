import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import {Bricolage_Grotesque} from "next/font/google"
import { BookHeartIcon, Clock10Icon } from "lucide-react";

const font = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export default async function RecentBooks(){
    const session = await auth();

    const recentBooks = await prisma.books.findMany({
    where: {
      ownerID: session?.user?.id!,
      lastOpenedAt: { not: null }
    },
    orderBy: { lastOpenedAt: 'desc' },
    take: 5
  });

    return(<div className="mb-5">
    <h1 className={`${font.className} text-xl font-semibold mb-2 flex gap-2 items-center`}><Clock10Icon />{" "}Recently Read Books</h1>
    
    <div className="grid grid-cols-5 gap-3 h-full">
      {recentBooks.map((book, index) => {
        return (
          <Link href={`/library/${book.id}`}>
             <div key={index} className="flex flex-col justify-between min-h-32 border border-ring/60 hover:border-dashed hover:border-ring rounded-md h-full text-balance hover:scale-102 transition-all duration-300 ">
                <h1 className={`${font.className} font-semibold m-2 flex gap-2`}><BookHeartIcon/>{book.title?.slice(0, 25)} ...</h1>
                <h2 className={`m-2 text-xs`}>Last Read : {book.lastOpenedAt?.toUTCString()?book.lastOpenedAt?.toUTCString():"Never"}</h2>
              </div>
          </Link>
        );
      })}
    </div>
    </div>)
}