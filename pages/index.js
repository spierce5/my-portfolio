import Head from "next/head";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";

import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container disableGutters={true}>
      <Head>
        <title>Nicholas Wensel Bio</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main>
        <Typography variant="h5">Index</Typography>
      </main>
    </Container>
  );
}
