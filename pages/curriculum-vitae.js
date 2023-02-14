import Head from "next/head";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";

import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth={true} disableGutters={true}>
      <Head>
        <title>N. Wensel|Curriculum Vitae</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main>
        <h1>Curriculum Vitae</h1>
      </main>
    </Container>
  );
}
