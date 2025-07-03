"use client";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PDFViewer() {
  const [pageNum, setPage] = useState<number>(1);

  const pdfUrl =
    "https://thumbnaily-storage.s3.ap-south-1.amazonaws.com/books/uploads/2621751484455177.pdf";

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="h-full mx-auto relative flex flex-col max-w-full">
        <Document file={pdfUrl} loading={"Loading..."} className="h-full flex items-center justify-center">
          <Page
            pageNumber={pageNum}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            height={window.innerHeight - 32}
            className="shadow-lg"
          />
        </Document>
      </div>
    </div>
  );
}