import Head from "next/head";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";
import { Container, Divider, Typography } from "@mui/material";

export default function Resume() {
  return (
    <>
      <Head>
        <title>S. Pierce|Resume</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <Container disableGutters={false}>
        <Typography variant="h3">Resume</Typography>
        <object
          data="./files/PierceS_Resume.pdf"
          type="application/pdf"
          width="100%"
          className="h-screen"
        >
          <embed src="./files/PierceS_Resume.pdf" type="application/pdf" />
        </object>
      </Container>
    </>
  );
}
