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
import ContactForm from "../components/ContactForm";
import CloseIcon from "@mui/icons-material/Close";
import { IntegrationInstructionsRounded } from "@mui/icons-material";

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
    contact: {
      title: "Contact",
      reference: "contact",
      content: serverSideProps.contact,
      type: "contact-form",
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
    publications_image: {
      title: "Publications Image",
      reference: "publications_image",
      type: "image",
    },
    contact_image: {
      title: "Contact Image",
      reference: "contact_image",
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
      case "contact-form":
        return (
          <ContactForm
            title={currentDialog.title}
            reference={currentDialog.reference}
            content={currentDialog.content}
          />
        );
      default:
        return;
    }
  };

  const getTiles = () => {
    const numTiles = Object.values(editableObjects).length;
    const numTilesToAdd = (3 - (numTiles % 3)) % 3;
    let tiles = Object.values(editableObjects).map((obj) => (
      <Card
        raised={false}
        key={obj.value}
        className="h-40 w-40 md:h-40 md:w-60 rounded-none"
      >
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
    for (let i = 0; i < numTilesToAdd; i++) {
      tiles.push(
        <Card
          raised={false}
          key={"empty-tile-" + i}
          className={
            "rounded-none h-40 w-40 md:h-40 md:w-60 md:visible " +
            (i == 0 ? "visible" : "invisible")
          }
        ></Card>
      );
    }

    return tiles;
  };

  return (
    <div className="h-screen min-h-max">
      <AppBar
        editableObjects={Object.values(editableObjects)}
        handleSelect={handleSelect}
      />
      <Container
        maxWidth={false}
        className="h-5/6 min-h-max pt-6 pb-6  md:px-8 flex justify-center items-center"
      >
        <div className="w-full max-w-max mt-auto min-h-max justify-items-center content-center grid grid-cols-2 md:grid-cols-3 md:gap-0 md:mt-0 md:shadow-xl">
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
