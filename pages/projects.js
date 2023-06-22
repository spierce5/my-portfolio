import Head from "next/head";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";
import ProjectCard from "../components/ProjectCard";

import {
  Container,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";

export const getServerSideProps = async () => {
  const res = await fetch("https://api.github.com/users/spierce5/repos");
  let repos = await res.json();

  repos = repos.sort((a, b) => {
    return Date.parse(b.created_at) - Date.parse(a.created_at);
  });
  return {
    props: {
      repos,
    },
  };
};

export default function Projects({ repos }) {
  return (
    <>
      <Head>
        <title>S. Pierce | Projects</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <div className="flex flex-col w-full min-h-screen items-center mt-16 z-10 space-y-12 overflow-auto scroll-smooth">
        {repos.map((repo) => (
          <ProjectCard
            key={repo.id}
            id={repo.id}
            name={repo.name}
            description={repo.description}
            url={repo.html_url}
          />
        ))}
      </div>
    </>
  );
}
