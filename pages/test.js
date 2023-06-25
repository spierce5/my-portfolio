import { useRef, useEffect } from "react";
import ResumePDF from "../components/ResumePDF";
import { getLocalData } from "../lib/localdata";
import ReactDOMServer from "react-dom/server";
import { jsPDF } from "jspdf";
import { Button } from "@mui/material";

export async function getStaticProps() {
  let resumeData = await getLocalData();
  // resumeData = resumeData.resume;
  // console.log(resumeData);
  return {
    props: { resumeData },
  };
}

export default function Test({ resumeData }) {
  const pdfRef = useRef(null);

  const downloadPdf = () => {
    const html = pdfRef.current.innerHTML;
    console.log(html);
    // console.log(html);
    // console.log(pdfRef.current);

    // const html = ReactDOMServer.renderToString();
    // console.log(pdf);
    // const pdf = new jsPDF();
    // pdf.html(html, {
    //   callback: function (doc) {
    //     doc.save();
    //   },
    // });

    // doc.text("Hello world!", 10, 10);
  };

  return (
    <div className="m-12 flex flex-col justify-center items-center">
      <Button onClick={downloadPdf}>Download</Button>
      <ResumePDF ref={pdfRef} data={resumeData.resume} />
    </div>
  );
}
