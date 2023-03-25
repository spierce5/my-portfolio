import { useState, useCallback, useEffect } from "react";
import RichTextEditor from "../components/RichTextEditor";
import { Stack, Button, Typography, Container } from "@mui/material";
import { updateContent, getContent } from "../firebase/firebase.js";

export default function ContentEditor(props) {
  const [content, setContent] = useState(props.content);

  useEffect(() => {
    getContent(setCurrentContent);
  }, [setContent]);

  const setCurrentContent = useCallback(
    (content) => {
      setContent(content[props.reference]);
    },
    [setContent]
  );

  const handleChange = useCallback(
    (value) => {
      let editedContent = { ...content };
      console.log(content);
      editedContent["draft"] = value;
      updateContent(props.reference, "draft", editedContent);
    },
    [content, setContent]
  );

  const handlePublish = useCallback(() => {
    let publishedContent = { ...content };
    publishedContent["published"] = publishedContent["draft"];
    updateContent(props.reference, "published", publishedContent);
  }, [content]);

  return (
    <Container className="h-screen">
      <Stack spacing={2} className="h-full">
        <Typography variant="h3">{props.title}</Typography>
        <Typography variant="caption" sx={{ color: "gray" }}>
          Last saved on {content.draft_last_saved}
        </Typography>
        <div className="flex-col space-y-28 md:space-y-12 h-full">
          <RichTextEditor
            name={props.title}
            value={content.draft}
            height="h-4/5"
            onChange={handleChange}
          />
          <Stack direction="row" spacing={1} className="justify-end">
            <Button variant="outlined">Discard</Button>
            <Button
              name={props.reference}
              onClick={handlePublish}
              variant="outlined"
            >
              Publish
            </Button>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
}
