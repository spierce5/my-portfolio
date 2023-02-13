import Head from "next/head";
import styles from "../styles/Home.module.css";
import AppBar from "../components/AppBar.js";
import Footer from "../components/Footer";

import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth={true} disableGutters={true}>
      <Head>
        <title>Nick Wensel Bio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AppBar />
        <Footer />
      </main>
    </Container>
  );
}
