"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function BookView() {
  const params = useParams();
  const [bookURL, setBookURL] = useState<string>();
  useEffect(() => {
    const getBook = async () => {
      const book = await axios.post("/api/book", { bookid: params.bookid });
      setBookURL(book.data);
    };
    getBook();
  });
  return (
    <div className="flex items-center justify-center h-screen">
      {bookURL && (
        <div className="h-full mx-auto relative flex flex-col max-w-full">
          <Document
            file={bookURL}
            loading={"Loading"}
            className="h-full flex items-center justify-center"
          >
            <Page
              pageNumber={1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              height={window.innerHeight - 32}
              className="shadow-lg"
            />
          </Document>
        </div>
      )}
    </div>
  );
}
