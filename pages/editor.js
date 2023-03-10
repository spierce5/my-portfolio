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
} from "../firebase/firebase.js";
import RichTextEditor from "../components/RichTextEditor";
import AppBar from "../components/AppBar";

export async function getServerSideProps() {
  const data = await getContentOnce();
  const temp = {
    biography: "<p>The <em>Biography</em></p>",
    research_interests: "<p>Interesting</p>",
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
  const [cvFile, setCvFile] = useState("demo-files/demo_resume.pdf");

  useEffect(() => {
    console.log(serverSideProps);
  }, []);

  const handleSave = useCallback(
    (e) => {
      const target = e.target;
      const name = target.name;
      const path = name.replace("save_", "");
      updateContent(path, content[path]);
    },
    [content]
  );

  const handleChange = useCallback(
    (value, attribute) => {
      let editedContent = { ...content };
      editedContent[attribute] = value;
      setContent(editedContent);
    },
    [content, setContent]
  );

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
