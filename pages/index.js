import Head from "next/head";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import { Container, Typography, Chip, Button, IconButton } from "@mui/material";
import ProjectCard from "../components/ProjectCard";

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

      <div className="flex flex-col min-h-screen items-center z-10 space-y-24">
        <div
          id="intro"
          className="space-y-12 h-screen flex flex-col justify-center items-center"
        >
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
          <Typography variant="h6" className="text-center">
            Thanks for checking out my portfolio. Take a look around and reach
            out to get to know me! You can reach me with any of the methods
            listed on my contact page.
          </Typography>
          <IconButton href="#skills" className="animate-pulse max-w-fit">
            <KeyboardDoubleArrowDownIcon fontSize="large" />
          </IconButton>
        </div>
        <div
          id="skills"
          className="h-screen flex flex-col justify-center items-center text-center space-y-4"
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
                  <Chip
                    key={lang}
                    label={lang}
                    size="small"
                    variant="filled"
                    color="primary"
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
                    variant="filled"
                    color="primary"
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
                    variant="filled"
                    color="primary"
                  />
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
          className="h-screen space-y-12 text-center flex flex-col justify-center items-center"
        >
          <IconButton href="#skills" className="justify-self-start max-w-fit">
            <KeyboardDoubleArrowUpRoundedIcon fontSize="large" />
          </IconButton>
          <Typography variant="h3">Featured Projects</Typography>
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
