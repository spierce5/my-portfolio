import Head from "next/head";
import { useState, useEffect } from "react";
import { getContent, getContentOnce } from "../firebase/firebase.js";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";

import { Container } from "@mui/material";

export async function getServerSideProps() {
  const data = await getContentOnce();
  const researchInterests = (({ research_interests }) => ({
    research_interests: research_interests.published,
  }))(data);
  return {
    props: {
      serverSideProps: researchInterests,
    },
  };
}

export default function ResearchInterest({ serverSideProps }) {
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
            __html: serverSideProps.research_interests,
          }}
        />
      </main>
    </Container>
  );
}
