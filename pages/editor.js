import React, { useEffect, useState, useCallback } from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  Container,
  Stack,
  Button,
  Dialog,
  Card,
  CardActionArea,
  CardContent,
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
import ImageCropper from "../components/ImageCropper";
import ContentEditor from "../components/ContentEditor";
import PDFEditor from "../components/PDFEditor";
import PhotoEditor from "../components/PhotoEditor";
import CloseIcon from "@mui/icons-material/Close";

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
  const [currentSelection, setCurrentSelection] = useState("biography");
  const [dialogOpen, setDialogOpen] = useState(false);

  const editableObjects = {
    biography: {
      title: "Biography Content",
      reference: "biography",
      content: content.biography,
      type: "richtext",
    },
    research_interests: {
      title: "Research Interests Content",
      reference: "research_interests",
      content: content.research_interests,
      type: "richtext",
    },
    curriculum_vitae: {
      title: "Curriculum Vitae PDF",
      reference: "curriculum_vitae",
      pdf: serverSideProps.curriculum_vitae,
      type: "pdf",
    },
    biography_image: {
      title: "Biography Page Image",
      reference: "biography_image",
      type: "image",
    },
    research_interests_image: {
      title: "Research Interests Image",
      reference: "research_interests_image",
      type: "image",
    },
    curriculum_vitae_image: {
      title: "Curriculum Vitae Image",
      reference: "curriculum_vitae_image",
      type: "image",
    },
  };

  const handleSelect = useCallback(
    (value) => {
      setDialogOpen(true);
      setCurrentSelection(value);
    },
    [setCurrentSelection, setDialogOpen]
  );

  const handlePublish = useCallback(
    (e) => {
      const target = e.target;
      const name = target.name;
      updateContent(name, content[name]);
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

  const getDialogContent = () => {
    const currentDialog = editableObjects[currentSelection];
    switch (currentDialog.type) {
      case "richtext":
        return (
          <ContentEditor
            title={currentDialog.title}
            content={currentDialog.content}
            reference={currentDialog.reference}
          />
        );
      case "pdf":
        return (
          <PDFEditor
            title={currentDialog.title}
            pdf={currentDialog.pdf}
            reference={currentDialog.reference}
          />
        );
      case "image":
        return (
          <PhotoEditor
            title={currentDialog.title}
            reference={currentDialog.reference}
          />
        );
      default:
        return;
    }
  };

  const getTiles = () => {
    return Object.values(editableObjects).map((obj) => (
      <Card raised={false} key={obj.value} className="h-40 w-60 rounded-none">
        <CardActionArea
          className="h-full"
          onClick={() => handleSelect(obj.reference)}
        >
          <CardContent className="h-full text-center flex items-center justify-center pl-12 pr-12">
            <Typography variant="h6" className="">
              {obj.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ));
  };

  return (
    <div className="h-screen min-h-max">
      <AppBar
        editableObjects={Object.values(editableObjects)}
        handleSelect={handleSelect}
      />
      <Container
        maxWidth={false}
        className="h-5/6 pt-6 pb-6  md:px-8 flex justify-center content-end items-end"
      >
        <div className="h-full w-full max-w-max max-h-max min-h-max justify-items-center content-center md:grid md:grid-cols-3 md:gap-0 ">
          {getTiles()}
        </div>
        <Dialog open={dialogOpen} fullScreen={true}>
          <IconButton
            onClick={() => setDialogOpen(false)}
            className="absolute top-0 right-0"
          >
            <CloseIcon />
          </IconButton>
          {getDialogContent()}
        </Dialog>
      </Container>
    </div>
  );
}

Editor.getLayout = (page) => page;
