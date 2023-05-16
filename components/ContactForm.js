import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { updateContent, getContent } from "../firebase/firebase.js";
import RankList from "./utilities/RankList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ContactForm(props) {
  const [content, setContent] = useState(props.content);

  const setCurrentContent = useCallback(
    (content) => {
      setContent(content[props.reference]);
    },
    [setContent]
  );

  useEffect(() => {
    getContent(setCurrentContent);
  }, [setCurrentContent]);

  return (
    <Container className="h-screen">
      <Stack spacing={1} className="h-full">
        <Typography variant="h3">{props.title}</Typography>
        <Typography variant="h6">Email</Typography>
        <RankList list={content.email_list} listType="email_list" />
        <Typography variant="h6">Phone</Typography>
        <RankList list={content.phone_list} listType="phone_list" />
      </Stack>
    </Container>
  );
}
