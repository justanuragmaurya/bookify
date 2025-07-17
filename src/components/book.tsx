"use client"
import Link from "next/link";
import { BookHeartIcon } from "lucide-react";
import {Bricolage_Grotesque} from "next/font/google"
import { Books } from "@/generated/prisma";
import { motion } from "motion/react"
import { once } from "events";
const font = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export default function Book({book , index }:{book: Books , index:number}){
    return(
        <Link href={`/library/${book.id}`}>
            <motion.div 
                className="flex flex-col items-center justify-between w-48 min-h-64 border border-muted-foreground hover:border-dashed hover:border-ring rounded-md h-full text-balance hover:scale-102 transition-all duration-300 p-5 bg-muted"
                initial = {{
                    y : 10,
                    opacity:0
                }}
                whileInView={{
                    y : 0,
                    opacity:1
                }}
                transition={{ delay:index*0.25 ,ease:"easeInOut"}}
                viewport={{ once: true, margin: "-200px" }}
            >
                <BookHeartIcon/>
                <h1 className={`${font.className} text-sm text-center font-semibold m-2 gap-2 max-w-3/4 mx-auto overflow-scroll`}>{book.title?.slice(0, 25)}</h1>
                <h2 className={`text-xs`}>Last Read : {book.lastOpenedAt?.toUTCString()?book.lastOpenedAt?.getDate() +"/"+book.lastOpenedAt?.getMonth()+"/"+book.lastOpenedAt?.getFullYear():"Never"}</h2>          
            </motion.div>
        </Link>
    )
}