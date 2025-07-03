import { auth } from "@/lib/auth";
import { Book } from "lucide-react";
import AllBooks from "@/components/all-books";
import RecentBooks from "@/components/recent-books";
import { Bricolage_Grotesque } from "next/font/google";

const font = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default async function Books() {
  const session = await auth();
  if (!session) {
    return <div>Please Login</div>;
  }

  return (
    <div className="p-5 flex-col">
      <h1 className={`${font.className} text-5xl font-bold flex gap-2 items-center mb-8`}><Book size={50} /> Your Library</h1>
      <RecentBooks />
      <AllBooks />
    </div>
  );
}
