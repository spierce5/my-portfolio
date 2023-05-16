import Head from "next/head";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";
import { getContentOnce, getFile } from "../firebase/firebase.js";

import { Container, Typography } from "@mui/material";

export async function getServerSideProps() {
  const data = await getContentOnce();
  let biography = (({ biography }) => ({ biography: biography.published }))(
    data
  );

  const imgFileName = (({ images }) => ({
    name: images.biography_image.file_name,
  }))(data);

  const imgSrc = await getFile(imgFileName.name);

  biography = { ...biography, src: imgSrc };

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
      <main className="flex flex-row">
        <article
          className="prose lg:prose-xl"
          dangerouslySetInnerHTML={{
            __html: serverSideProps.biography,
          }}
        ></article>
        <img src={serverSideProps.src} alt=" "></img>
      </main>
    </Container>
  );
}
