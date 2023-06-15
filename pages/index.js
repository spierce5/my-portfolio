import Head from "next/head";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";

import { Container, Typography, Chip } from "@mui/material";

export default function Home() {
  const competencies = {
    libsFrams: [
      "React",
      "Next JS",
      "Node",
      "Spring Boot",
      "Firebase",
      "Pandas",
    ],
    stylesMarkup: ["HTML", "CSS", "Tailwindcss", "LaTeX"],
    languages: ["Javascript", "Java", "Python", "MS SQL", "PostgreSQL"],
  };

  return (
    <>
      <Head>
        <title>S. Pierce Portfolio</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <Container disableGutters={false}>
        <div class="flex flex-col w-full min-h-screen items-center z-10">
          <div class="flex flex-row justify-between items-center ">
            <div class="flex flex-col">
              <div class="text-2xl font-bold">Samuel Pierce.</div>
              <div class="text-xl">Web Developer.</div>
            </div>
            <img
              id="me-img"
              src="/images/me.jpg"
              alt="me.jpg"
              class="h-48 w-48 scale-50 aspect-square rounded-full object-cover shadow-lg self-end z-20"
            />
          </div>
          <Typography variant="h5">Languages: </Typography>
          <div className="w-full space-x-1 flex justify-center">
            {competencies.languages.map((lang) => (
              <Chip key={lang} label={lang} size="small" variant="outlined" />
            ))}
          </div>
          <Typography variant="h5">Libraries & Frameworks: </Typography>
          <div className="w-full space-x-1 flex justify-center">
            {competencies.libsFrams.map((libFram) => (
              <Chip
                key={libFram}
                label={libFram}
                size="small"
                variant="outlined"
              />
            ))}
          </div>
          <Typography variant="h5">Markup & Styles: </Typography>
          <div className="w-full space-x-1 flex justify-center">
            {competencies.stylesMarkup.map((sM) => (
              <Chip key={sM} label={sM} size="small" variant="outlined" />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
