import Head from "next/head";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";
import { Container } from "@mui/material";

export default function CurriculumVitae() {
  return (
    <Container disableGutters={false}>
      <Head>
        <title>S. Pierce|Resume</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main>
        {/* <object
          data={serverSideProps.curriculum_vitae}
          type="application/pdf"
          width="100%"
          className="h-screen"
        >
          <embed src="demo-files/demo_resume.pdf" type="application/pdf" />
        </object> */}
      </main>
    </Container>
  );
}
