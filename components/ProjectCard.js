import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

export default function ProjectCard(props) {
  const formatName = (name) => {
    const excludedWords = [
      "a",
      "and",
      "as",
      "at",
      "but",
      "by",
      "down",
      "for",
      "from",
      "if",
      "in",
      "into",
      "like",
      "near",
      "nor",
      "of",
      "off ",
      "on",
      "once",
      "onto",
      "or",
      "over",
      "past",
      "so",
      "than",
      "that",
      "to",
      "upon",
      "when",
      "with",
      "yet",
    ];

    let words = name.split("-");
    words = words.map((word, i) => {
      if (i != 0 && excludedWords.includes(word.toLowerCase())) {
        return word;
      } else {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
      }
    });
    const formattedName = words.join(" ");
    return formattedName;
  };

  return (
    <>
      <Card key={props.id} className="w-full md:w-96 md:h-60" elevation={3}>
        <CardHeader title={formatName(props.name)} className="md:h-16" />
        <CardContent className="md:h-32">{props.description}</CardContent>
        <CardActions className="md:h-12">
          <Button
            size="small"
            variant="contained"
            color="primary"
            href={props.url}
            target="_blank"
          >
            View on Github
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
