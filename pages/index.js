import Head from "next/head";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";

import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container disableGutters={true}>
      <Head>
        <title>S. Pierce Portfolio</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main className="flex flex-row"></main>
    </Container>
  );
}
