import { auth } from "@/lib/auth";
import { Book, Paperclip, Plus } from "lucide-react";
import AllBooks from "@/components/all-books";
import RecentBooks from "@/components/recent-books";
import { Bricolage_Grotesque } from "next/font/google";
import MaxWidthProvider from "@/components/maxwidthprovider";
import UploadDialogBox from "@/components/upload-dialog";

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
    <MaxWidthProvider>
      <div className="p-5 flex-col">
        <div className="flex items-center justify-between">
          <h1 className={`${font.className} text-5xl font-bold flex gap-2 items-center mb-8`}>
            <Book size={50} /> Your Library
          </h1>
          <UploadDialogBox/>
        </div>
        <RecentBooks />
        <AllBooks />
      </div>
    </MaxWidthProvider>
  );
}
