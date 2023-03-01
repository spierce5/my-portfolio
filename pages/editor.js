import React, { useEffect, useState, useCallback } from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  Container,
  Stack,
  Button,
} from "@mui/material";
import RichTextEditor from "../components/RichTextEditor";
import AppBar from "../components/AppBar";

export default function Editor() {
  const [bio, setBio] = useState("<p>I am the bio</p>");
  const [researchInterests, setResearchInterests] = useState(
    "<p>I like to research</p>"
  );
  const [cvFile, setCvFile] = useState("demo-files/demo_resume.pdf");

  useEffect(() => {
    console.log(cvFile);
  }, []);

  const handleFileUpload = useCallback(
    (e) => {
      let url = "";
      const target = e.target;
      const files = target.files;
      const [file] = files;
      if (file) {
        url = URL.createObjectURL(file);
      }
      console.log(url);
      setCvFile(url);
    },
    [cvFile, setCvFile]
  );

  return (
    <>
      <AppBar />
      <Container
        maxWidth={false}
        className="pt-6 pb-6 flex flex-col-reverse md:flex-row md:justify-between md:px-8"
      >
        <Stack direction="column" spacing={2} className="grow md:mx-4">
          <Typography variant="h5">Curriculum Vitae</Typography>
          <Button variant="contained" component="label" sx={{ width: 150 }}>
            Upload CV
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
          <object
            data={cvFile}
            type="application/pdf"
            width="100%"
            className="h-screen"
          />
        </Stack>
        <Stack direction="column" spacing={2} className="grow md:mx-4">
          <Typography variant="h5">Bio</Typography>
          <div className="flex-col space-y-28 md:space-y-12">
            <RichTextEditor value={bio} onChange={setBio} />
            <Stack direction="row" spacing={1} className="justify-end">
              <Button variant="outlined">Save</Button>
              <Button variant="outlined">Cancel</Button>
            </Stack>
          </div>
          <Typography variant="h5">Research Interests</Typography>
          <div className="flex-col space-y-28 md:space-y-12">
            <RichTextEditor
              value={researchInterests}
              onChange={setResearchInterests}
            />
            <Stack direction="row" spacing={1} className="justify-end">
              <Button variant="outlined">Save</Button>
              <Button variant="outlined">Cancel</Button>
            </Stack>
          </div>
        </Stack>
      </Container>
    </>
  );
}

Editor.getLayout = (page) => page;
