import Head from "next/head";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";
import { getContent } from "../firebase/firebase.js";

import { Container, Typography } from "@mui/material";

export default function Home() {
  const [content, setContent] = useState({
    biography: "",
  });

  useEffect(() => {
    getContent(setContent);
  }, [setContent]);

  return (
    <Container disableGutters={true}>
      <Head>
        <title>Nicholas Wensel Bio</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main>
        <div
          dangerouslySetInnerHTML={{
            __html: content.biography,
          }}
        ></div>
      </main>
    </Container>
  );
}
