import { useState, useCallback, useEffect } from "react";
import { Stack, Button, Typography, Container } from "@mui/material";
import { uploadFile, getFile } from "../firebase/firebase.js";

export default function PhotoEditor(props) {
  const [image, setImage] = useState({
    url: props.url,
    newFile: null,
  });
  const [isNewFile, setIsNewFile] = useState(false);

  useEffect(() => {
    /*
    Retrieve URL from realtime database. URL will be stored on upload to avoid 
    using regex to search file names without extensions each time
    */
  }, []);

  const handleFileUpload = useCallback(() => {
    const path = "/curriculum_vitae.pdf";
    uploadFile(path, image.newFile);
    setIsNewFile(false);
  }, [image, uploadFile, setIsNewFile]);

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
    [image, setImage]
  );

  return (
    <Container className="h-screen">
      <Stack spacing={1} className="h-full">
        <Typography variant="h3">{props.title}</Typography>
        <div className="flex-col space-y-28 md:space-y-12 h-full">
          <Stack direction="row" spacing={1} className="justify-end">
            <Button component="label" variant="outlined">
              Upload
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileSelection}
              />
            </Button>
            <Button
              name={props.reference}
              onClick={handleFileUpload}
              variant="outlined"
            >
              Publish
            </Button>
          </Stack>
          <img src={image.url} alt={props.reference} />
        </div>
      </Stack>
    </Container>
  );
}
