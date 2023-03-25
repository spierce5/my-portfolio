import { useState, useCallback, useEffect } from "react";
import { Stack, Button, Typography, Container } from "@mui/material";
import { uploadFile, getFile } from "../firebase/firebase.js";

export default function PDFEditor(props) {
  const [pdf, setPdf] = useState({
    url: props.pdf,
    newFile: null,
  });
  const [isNewFile, setIsNewFile] = useState(false);

  useEffect(() => {
    getFile(props.reference + ".pdf").then((file) => {
      setPdf({
        url: file,
        newFile: null,
      });
    });
  }, [setPdf]);

  const handleFileUpload = useCallback(() => {
    const path = "/curriculum_vitae.pdf";
    uploadFile(path, pdf.newFile);
    setIsNewFile(false);
  }, [pdf, uploadFile, setIsNewFile]);

  const handleFileSelection = useCallback(
    (e) => {
      let selectedFile = {};
      const target = e.target;
      const files = target.files;
      const [file] = files;
      if (file) {
        selectedFile = {
          url: URL.createObjectURL(file),
          newFile: file,
        };
      }
      setPdf(selectedFile);
      setIsNewFile(true);
    },
    [pdf, setPdf]
  );

  return (
    <Container className="h-screen">
      <Stack spacing={1} className="h-full">
        <Typography variant="h3">{props.title}</Typography>
        <div className="flex-col space-y-28 md:space-y-12 h-full">
          <Stack direction="row" spacing={1} className="justify-end">
            <Button component="label" variant="outlined">
              Select PDF
              <input type="file" hidden onChange={handleFileSelection} />
            </Button>
            <Button
              name={props.reference}
              onClick={handleFileUpload}
              variant="outlined"
            >
              Publish
            </Button>
          </Stack>
          <object
            data={pdf.url}
            type="application/pdf"
            width="100%"
            className="h-screen"
          />
        </div>
      </Stack>
    </Container>
  );
}
