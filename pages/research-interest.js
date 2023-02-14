import Head from "next/head";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";

import { Container } from "@mui/material";

export default function ResearchInterest() {
  return (
    <Container maxWidth={true} disableGutters={true}>
      <Head>
        <title>N. Wensel|Research Interest</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main>
        <h1>Research Interest</h1>
      </main>
    </Container>
  );
}
