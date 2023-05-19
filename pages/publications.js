import Head from "next/head";
import { useState, useCallback, useEffect } from "react";
import FileViewer from "../components/FileViewer";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArticleIcon from "@mui/icons-material/Article";
import CloseIcon from "@mui/icons-material/Close";

import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
} from "@mui/material";

export default function Publications() {
  const [selectedFile, setSelectedFile] = useState(null);

  const publications = [
    {
      name: "Demo 1",
      path: "demo-files/demo_pub_1.pdf",
    },
    {
      name: "Demo 2",
      path: "demo-files/demo_pub_2.pdf",
    },
  ];

  return (
    <Container disableGutters={true}>
      <Head>
        <title>N. Wensel|Publications</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main>
        <article className="prose lg:prose-xl">
          <h1>Publications</h1>
        </article>
      </main>
      <List dense={true} className="w-1/2">
        {publications.map((pub) => (
          <ListItem
            key={pub.path}
            dense={true}
            secondaryAction={
              <IconButton onClick={() => console.log("download clicked")}>
                <FileDownloadIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={() => setSelectedFile(pub)}>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText
                variant="h1"
                primary={pub.name}
                primaryTypographyProps={{ variant: "h6" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Dialog open={Boolean(selectedFile)} fullScreen={true}>
        <IconButton
          onClick={() => setSelectedFile(null)}
          className="absolute top-0 right-0"
        >
          <CloseIcon />
        </IconButton>
        {selectedFile && (
          <FileViewer name={selectedFile.name} path={selectedFile.path} />
        )}
      </Dialog>
    </Container>
  );
}
