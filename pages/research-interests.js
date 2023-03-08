import Head from "next/head";
import { useState, useEffect } from "react";
import { getContent } from "../firebase/firebase.js";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";

import { Container } from "@mui/material";

export default function ResearchInterest() {
  const [content, setContent] = useState({
    research_interests: "",
  });
  useEffect(() => {
    getContent(setContent);
  }, [setContent]);
  return (
    <Container disableGutters={true}>
      <Head>
        <title>N. Wensel|Research Interest</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main>
        <article
          className="prose lg:prose-xl"
          dangerouslySetInnerHTML={{
            __html: content.research_interests,
          }}
        />
      </main>
    </Container>
  );
}
