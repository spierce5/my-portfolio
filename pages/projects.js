import Head from "next/head";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";

import { Container, Typography } from "@mui/material";

export default function Projects() {
  return (
    <>
      <Head>
        <title>S. Pierce | Projects</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <Container disableGutters={false}>
        <div class="flex flex-col w-full min-h-screen items-center z-10"></div>
      </Container>
    </>
  );
}
