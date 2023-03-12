import React, { useEffect, useState, useCallback } from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  Container,
  Stack,
  Button,
} from "@mui/material";
import {
  getContent,
  updateContent,
  getContentOnce,
  uploadFile,
  getFile,
} from "../firebase/firebase.js";
import RichTextEditor from "../components/RichTextEditor";
import AppBar from "../components/AppBar";

export async function getServerSideProps() {
  const content = await getContentOnce();
  const cvFile = await getFile("curriculum_vitae.pdf");
  const data = {
    curriculum_vitae: cvFile,
    ...content,
  };

  return {
    props: {
      serverSideProps: data,
    },
  };
}

export default function Editor({ serverSideProps }) {
  const [content, setContent] = useState({
    biography: serverSideProps.biography,
    research_interests: serverSideProps.research_interests,
  });
  const [cvFile, setCvFile] = useState({
    url: serverSideProps.curriculum_vitae,
    newFile: null,
  });
  const [isNewCvFile, setIsNewCvFile] = useState(false);

  const handleSave = useCallback(
    (e) => {
      const target = e.target;
      const name = target.name;
      const path = name.replace("save_", "");
      updateContent(path, content[path]);
    },
    [content]
  );

  const handleFileUpload = useCallback(() => {
    const path = "/curriculum_vitae.pdf";
    uploadFile(path, cvFile.newFile);
    setIsNewCvFile(false);
  }, [cvFile, uploadFile, setIsNewCvFile]);

  const handleChange = useCallback(
    (value, attribute) => {
      let editedContent = { ...content };
      editedContent[attribute] = value;
      setContent(editedContent);
    },
    [content, setContent]
  );

  const handleFileSelection = useCallback(
    (e) => {
      let newCvFile = {};
      const target = e.target;
      const files = target.files;
      const [file] = files;
      if (file) {
        newCvFile = {
          url: URL.createObjectURL(file),
          newFile: file,
        };
      }
      setCvFile(newCvFile);
      setIsNewCvFile(true);
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
          <Stack direction="row" spacing={2}>
            <Button variant="contained" component="label" sx={{ width: 150 }}>
              Select File
              <input type="file" hidden onChange={handleFileSelection} />
            </Button>
            <Button
              variant="contained"
              component="label"
              // disabled={!isNewCvFile}
              disabled={false}
              sx={{ width: 150 }}
              onClick={handleFileUpload}
            >
              Upload
            </Button>
          </Stack>
          <object
            data={cvFile.url}
            type="application/pdf"
            width="100%"
            className="h-screen"
          />
        </Stack>
        <Stack direction="column" spacing={2} className="grow md:mx-4">
          <Typography variant="h5">biography</Typography>
          <div className="flex-col space-y-28 md:space-y-12">
            <RichTextEditor
              name="biography"
              value={content.biography}
              onChange={(value) => handleChange(value, "biography")}
            />
            <Stack direction="row" spacing={1} className="justify-end">
              <Button
                name="save_biography"
                onClick={handleSave}
                variant="outlined"
              >
                Save
              </Button>
              <Button variant="outlined">Cancel</Button>
            </Stack>
          </div>
          <Typography variant="h5">Research Interests</Typography>
          <div className="flex-col space-y-28 md:space-y-12">
            <RichTextEditor
              name="research_interests"
              value={content.research_interests}
              onChange={(value) => handleChange(value, "research_interests")}
            />
            <Stack direction="row" spacing={1} className="justify-end">
              <Button
                name="save_research_interests"
                onClick={handleSave}
                variant="outlined"
              >
                Save
              </Button>
              <Button variant="outlined">Cancel</Button>
            </Stack>
          </div>
        </Stack>
      </Container>
    </>
  );
}

Editor.getLayout = (page) => page;
