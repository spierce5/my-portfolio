import Head from "next/head";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";

import { Container, Typography } from "@mui/material";

export default function Publications() {
  return (
    <Container disableGutters={true}>
      <Head>
        <title>N. Wensel|Publications</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main>
        <article className="prose lg:prose-xl">
          <h1>Publications</h1>
        </article>
      </main>
    </Container>
  );
}
