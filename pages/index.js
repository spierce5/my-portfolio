import Head from "next/head";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import { Container, Typography, Button, IconButton } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import Chip from "../components/Chip";

export const getServerSideProps = async () => {
  const res = await fetch("https://api.github.com/users/spierce5/repos");
  let repos = await res.json();
  const featuredProjects = ["vehicle-maintenance", "task-organizer"];
  repos = repos.filter((repo) => featuredProjects.includes(repo.name));

  return {
    props: {
      repos,
    },
  };
};

export default function Home({ repos }) {
  const competencies = {
    libsFrams: [
      "React",
      "Next.js",
      "Node.js",
      "Firebase",
      "Material UI",
      "Tailwindcss",
      "Spring Boot",
      "Pandas",
    ],
    stylesMarkup: ["HTML", "CSS", "LaTeX"],
    languages: [
      "JavaScript",
      "Java",
      "Python",
      "MS SQL",
      "PostgreSQL",
      "MySQL",
    ],
  };

  return (
    <>
      <Head>
        <title>S. Pierce Portfolio</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>

      <div
        id="index"
        style={{ scrollbarWidth: "thin" }}
        className="flex flex-col h-full min-h-full items-center z-10 space-y-24 snap-y snap-mandatory overflow-auto scroll-smooth"
      >
        <div
          id="intro"
          className="space-y-12 h-screen min-h-screen flex flex-col justify-center items-center snap-always snap-center md:w-1/3"
        >
          <div className="flex flex-col justify-between items-center ">
            <img
              id="me-img"
              src="/images/me.jpg"
              alt="me.jpg"
              className="h-48 w-48 scale-50 aspect-square rounded-full object-cover shadow-lg self-end z-20"
            />
            <div className="flex flex-col min-w-max text-center">
              <div className="text-2xl font-bold">Samuel Pierce.</div>
              <div className="text-xl">Web Developer.</div>
            </div>
          </div>
          <Typography variant="h6" className="text-center">
            Thanks for taking the time to check out my portfolio. Take a look
            around and reach out to get to know me! You can reach me with any of
            the methods listed on my contact page.
          </Typography>
          <IconButton href="#skills" className="animate-pulse max-w-fit">
            <KeyboardDoubleArrowDownIcon fontSize="large" />
          </IconButton>
        </div>
        <div
          id="skills"
          className="h-screen min-h-screen flex flex-col justify-center items-center text-center space-y-4 snap-always snap-center"
        >
          <IconButton href="#intro" className="max-w-fit">
            <KeyboardDoubleArrowUpRoundedIcon fontSize="large" />
          </IconButton>
          <Typography variant="h3">Skills</Typography>
          <div className="space-y-4 flex flex-col items-center text-center pb-4">
            <div>
              <Typography variant="h5">Languages</Typography>
              <div className="gap-1 flex flex-wrap justify-center">
                {competencies.languages.map((lang) => (
                  <Chip label={lang} />
                ))}
              </div>
            </div>
            <div>
              <Typography variant="h5">Libraries & Frameworks</Typography>
              <div className="gap-1 flex flex-wrap justify-center">
                {competencies.libsFrams.map((libFram) => (
                  <Chip label={libFram} />
                ))}
              </div>
            </div>
            <div>
              <Typography variant="h5">Markup & Styles</Typography>
              <div className="gap-1 flex flex-wrap justify-center">
                {competencies.stylesMarkup.map((sM) => (
                  <Chip label={sM} />
                ))}
              </div>
            </div>
          </div>
          <IconButton
            href="#featured-projects"
            className="animate-pulse max-w-fit"
          >
            <KeyboardDoubleArrowDownIcon fontSize="large" />
          </IconButton>
        </div>
        <div
          id="featured-projects"
          className="h-screen min-h-screen space-y-12 text-center flex flex-col justify-center items-center snap-always snap-center"
        >
          <div>
            <IconButton href="#skills" className="justify-self-start max-w-fit">
              <KeyboardDoubleArrowUpRoundedIcon fontSize="large" />
            </IconButton>
            <Typography variant="h3">Featured Projects</Typography>
          </div>
          {repos.map((repo) => (
            <ProjectCard
              key={repo.id}
              id={repo.id}
              name={repo.name}
              description={repo.description}
              url={repo.html_url}
            />
          ))}
          <Button href="/projects" className="max-w-fit">
            See more
          </Button>
        </div>
      </div>
    </>
  );
}
