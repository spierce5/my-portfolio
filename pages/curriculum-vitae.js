import Head from "next/head";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";
import { Container } from "@mui/material";
import { getFile } from "../firebase/firebase";

export async function getServerSideProps() {
  const cvFile = await getFile("curriculum_vitae.pdf");
  const data = {
    curriculum_vitae: cvFile,
  };

  return {
    props: {
      serverSideProps: data,
    },
  };
}

export default function CurriculumVitae({ serverSideProps }) {
  return (
    <Container maxWidth="false" disableGutters={true}>
      <Head>
        <title>N. Wensel|Curriculum Vitae</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main>
        <article className="prose lg:prose-xl">
          <h1>Curriculum Vitae</h1>
        </article>
        {/* <img src="demo-files/Capture.PNG" alt="" /> */}
        <object
          data={serverSideProps.curriculum_vitae}
          type="application/pdf"
          width="100%"
          className="h-screen"
        >
          <embed src="demo-files/demo_resume.pdf" type="application/pdf" />
        </object>
      </main>
    </Container>
  );
}
