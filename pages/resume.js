import Head from "next/head";
import styles from "../styles/Home.module.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button, Divider, Typography } from "@mui/material";
import myResume from "../public/files/PierceS_Resume.pdf";
import { pdfjs, Document, Page } from "react-pdf";
import { useWindowWidth } from "@wojtekmaj/react-hooks";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Resume() {
  const width = useWindowWidth();
  const downloadPdf = () => {
    const a = document.createElement("a");
    a.href = "./files/PierceS_Resume.pdf";
    a.download = "PierceS_Resume.pdf";
    a.click();
    a.remove();
  };

  return (
    <>
      <Head>
        <title>S. Pierce|Resume</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <div className="mt-16 flex flex-col w-full items-center">
        <div className="w-11/12 self-start flex justify-end">
          <Button
            onClick={downloadPdf}
            size="small"
            variant="contained"
            color="primary"
            startIcon={<FileDownloadIcon />}
            className="self-end max-w-min"
          >
            Download
          </Button>
        </div>
        <Document file="./files/PierceS_Resume.pdf" className="">
          <Page
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={width * 0.9}
          />
          <Divider />
          <Page
            pageNumber={2}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={width * 0.9}
          />
        </Document>
      </div>
    </>
  );
}
