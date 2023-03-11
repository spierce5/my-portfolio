import Head from "next/head";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";
import { getContent, getContentOnce } from "../firebase/firebase.js";

import { Container, Typography } from "@mui/material";

export async function getServerSideProps() {
  const data = await getContentOnce();
  const biography = (({ biography }) => ({ biography }))(data);
  return {
    props: {
      serverSideProps: biography,
    },
  };
}

export default function Home({ serverSideProps }) {
  return (
    <Container disableGutters={true}>
      <Head>
        <title>Nicholas Wensel Bio</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main>
        <article
          className="prose lg:prose-xl"
          dangerouslySetInnerHTML={{
            __html: serverSideProps.biography,
          }}
        ></article>
      </main>
    </Container>
  );
}
