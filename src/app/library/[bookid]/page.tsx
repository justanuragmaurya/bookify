"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { pdfjs, Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function BookView() {
  const params = useParams();
  const [bookURL, setBookURL] = useState<string>();
  const [pageNumber,setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);

  const handleNext = useCallback(() => {
    setPageNumber(prev => prev < numPages ? prev + 1 : prev);
  }, [numPages]);

  const handlePrevious = useCallback(() => {
    setPageNumber(prev => prev > 1 ? prev - 1 : prev);
  }, []);

  const handleKeyboardInput = useCallback((e: KeyboardEvent) => {
    console.log(e.key);
    switch(e.key) {
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
      case 'ArrowUp':
        handlePrevious();
        break;
        case 'ArrowDown':
        handleNext();
        break;
      default:
        break;
    }
  }, [handleNext, handlePrevious]);

  useEffect(() => {
    const getBook = async () => {
      const book = await axios.post("/api/book", { bookid: params.bookid });
      setBookURL(book.data);
    };
    getBook();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardInput);
    
    return () => {
      document.removeEventListener('keydown', handleKeyboardInput);
    };
  }, [handleKeyboardInput]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex items-center justify-center h-screen relative">
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-background/80 backdrop-blur-sm rounded-md border shadow-sm p-2">
          <div className="flex items-center gap-2">
            <Button 
              onClick={handlePrevious} 
              disabled={pageNumber <= 1}
              variant="secondary" 
              size="sm"
            >
              <ArrowLeftCircle className="w-4 h-4" />
            </Button>
            
            <Input 
              type="text" 
              value={pageNumber} 
              onChange={(e) => {
                const newPage = Number(e.target.value);
                if (newPage >= 1 && newPage <= numPages) {
                  setPageNumber(newPage);
                }
              }}
              className="w-12 h-8 text-center text-sm"
            />
            
            <Button 
              onClick={handleNext} 
              disabled={pageNumber >= numPages}
              variant="secondary" 
              size="sm"
            >
              <ArrowRightCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      {bookURL && (
        <div className="h-full mx-auto relative flex flex-col max-w-full">
          <Document
            file={bookURL}
            loading={"Loading"}
            onLoadSuccess={onDocumentLoadSuccess}
            className="h-full flex items-center justify-center"
          >
            <Page
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              height={window.innerHeight - 32}
              onGetTextSuccess={(e)=>{console.log(e)}}
              className="shadow-lg"
            />
          </Document>
        </div>
      )}
    </div>
  );
}
