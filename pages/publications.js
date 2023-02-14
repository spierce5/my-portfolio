import Head from "next/head";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";

import { Container } from "@mui/material";

export default function Publications() {
  return (
    <Container maxWidth={true} disableGutters={true}>
      <Head>
        <title>N. Wensel|Publications</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main>
        <h1>Publications</h1>
      </main>
    </Container>
  );
}
