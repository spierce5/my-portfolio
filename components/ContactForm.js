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
  const [content, setContent] = useState(props.content || { val: "no data" });

  const setCurrentContent = useCallback(
    (content) => {
      if (content) {
        setContent(content[props.reference]);
      }
    },
    [setContent]
  );

  useEffect(() => {
    getContent(setCurrentContent);
  }, [setCurrentContent]);

  return (
    <Container className="h-screen">
      <Typography variant="h3" className="mb-12">
        {props.title}
      </Typography>
      <Stack spacing={1} className="min-h-fit">
        <Typography variant="h6">Email</Typography>
        <RankList
          list={content ? content.email_list : []}
          listType="email_list"
        />
        <Typography variant="h6">Phone</Typography>
        <RankList
          list={content ? content.phone_list : []}
          listType="phone_list"
        />
      </Stack>
    </Container>
  );
}
