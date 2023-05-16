import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
} from "@mui/material";
import { updateContent, getContent } from "../../firebase/firebase.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function RankList(props) {
  const [list, setList] = useState(props.list);

  const setCurrentContent = useCallback(
    (content) => {
      setList(content.contact[props.listType]);
    },
    [setList]
  );

  useEffect(() => {
    getContent(setCurrentContent);
  }, [setCurrentContent]);

  return (
    <List
      dense={true}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {list.map((entry) => (
        <ListItem
          key={entry.order}
          disableGutters
          secondaryAction={
            <Stack direction="row">
              <IconButton>
                <ExpandMoreIcon />
              </IconButton>
              <IconButton>
                <ExpandLessIcon />
              </IconButton>
              <IconButton>
                <RemoveIcon />
              </IconButton>
            </Stack>
          }
        >
          <ListItemText primary={entry.value} />
        </ListItem>
      ))}
      <ListItem
        key={list.reduce((a, b) => Math.max(a, b.order), 0) + 1}
        dense={true}
        disableGutters={true}
        secondaryAction={
          <IconButton>
            <AddIcon />
          </IconButton>
        }
      >
        <TextField size="small" />
      </ListItem>
    </List>
  );
}
