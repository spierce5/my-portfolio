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

  const getChipColor = () => {
    const colors = [
      "opt1.main",
      "opt2.main",
      "opt3.main",
      "opt4.main",
      "opt5.main",
      "opt6.main",
    ];

    const randomColor = colors[Math.floor(Math.random() * 5)];

    return {
      color: randomColor,
      borderColor: randomColor,
    };
  };

  return (
    <>
      <Head>
        <title>S. Pierce Portfolio</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <Container className="" disableGutters={false}>
        <div className="flex flex-col min-h-screen items-center z-10">
          <div className="flex flex-row justify-between items-center ">
            <div className="flex flex-col">
              <div className="text-2xl font-bold">Samuel Pierce.</div>
              <div className="text-xl">Web Developer.</div>
            </div>
            <img
              id="me-img"
              src="/images/me.jpg"
              alt="me.jpg"
              className="h-48 w-48 scale-50 aspect-square rounded-full object-cover shadow-lg self-end z-20"
            />
          </div>
          <div className="space-y-2 flex flex-col items-center text-center">
            <div>
              <Typography variant="h5">Languages</Typography>
              <div className="gap-1 flex flex-wrap justify-center">
                {competencies.languages.map((lang) => (
                  <Chip
                    key={lang}
                    label={lang}
                    size="small"
                    variant="outlined"
                    sx={() => getChipColor()}
                  />
                ))}
              </div>
            </div>
            <div>
              <Typography variant="h5">Libraries & Frameworks</Typography>
              <div className="gap-1 flex flex-wrap justify-center">
                {competencies.libsFrams.map((libFram) => (
                  <Chip
                    key={libFram}
                    label={libFram}
                    size="small"
                    variant="outlined"
                    sx={() => getChipColor()}
                  />
                ))}
              </div>
            </div>
            <div>
              <Typography variant="h5">Markup & Styles</Typography>
              <div className="gap-1 flex flex-wrap justify-center">
                {competencies.stylesMarkup.map((sM) => (
                  <Chip
                    key={sM}
                    label={sM}
                    size="small"
                    variant="outlined"
                    sx={() => getChipColor()}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
