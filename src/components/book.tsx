import Link from "next/link";
import { BookHeartIcon } from "lucide-react";
import {Bricolage_Grotesque} from "next/font/google"
import { Books } from "@/generated/prisma";

const font = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export default function Book({book}:{book: Books}){
    return(
        <Link href={`/library/${book.id}`}>
        <div className="flex flex-col items-center justify-between w-48 min-h-64 border border-muted-foreground hover:border-dashed hover:border-ring rounded-md h-full text-balance hover:scale-102 transition-all duration-300 p-5 bg-muted">
            <BookHeartIcon/>
            <h1 className={`${font.className} text-sm text-center font-semibold m-2 gap-2 max-w-3/4 mx-auto overflow-scroll`}>{book.title?.slice(0, 25)}</h1>
            <h2 className={`text-xs`}>Last Read : {book.lastOpenedAt?.toUTCString()?book.lastOpenedAt?.getDate() +"/"+book.lastOpenedAt?.getMonth()+"/"+book.lastOpenedAt?.getFullYear():"Never"}</h2>          </div>
        </Link>
    )
}