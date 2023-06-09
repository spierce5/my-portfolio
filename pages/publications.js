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
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";

export default function Publications() {
  const [selectedFile, setSelectedFile] = useState(null);

  const publications = [
    {
      name: "Demo 1",
      path: "demo-files/demo_pub_1.pdf",
      description:
        "The continuity of Abelian groups in higher dimensional spaces.",
      order: 1,
    },
    {
      name: "Demo 2",
      path: "demo-files/demo_pub_2.pdf",
      description:
        "Observations on the effect of penguin bathing in regard to overall frontal cortex stimulation.",
      order: 2,
    },
  ];

  return (
    <Container disableGutters={false} maxWidth={false}>
      <Head>
        <title>N. Wensel|Publications</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main className="mb-4">
        <article className="prose lg:prose-xl">
          <h1>Publications</h1>
        </article>
        <TextField select name="sort" label="Sort By">
          <MenuItem key="name" value="name">
            Name (Alphabetical)
          </MenuItem>
        </TextField>
      </main>
      <Paper className="w-1/3">
        <List dense={true} className="">
          {publications.map((pub) => (
            <ListItem
              key={pub.path}
              dense={true}
              divider={
                pub.order <
                publications.reduce((a, b) => Math.max(a, b.order), 0)
              }
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
                  secondary={pub.description}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
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
