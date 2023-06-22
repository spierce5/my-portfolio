import { useState, useCallback } from "react";
import {
  SwipeableDrawer as MUISwipeableDrawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BiotechIcon from "@mui/icons-material/Biotech";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import DescriptionIcon from "@mui/icons-material/Description";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function SwipeableDrawer(props) {
  const pages = [
    {
      title: "Front Page",
      route: "/",
      icon: <SentimentSatisfiedAltIcon />,
    },
    {
      title: "Projects",
      route: "/projects",
      icon: <LibraryBooksIcon />,
    },
    {
      title: "Resume",
      route: "/resume",
      icon: <DescriptionIcon />,
    },
    {
      title: "Contact",
      route: "/contact",
      icon: <EmailIcon />,
    },
  ];

  const pageItems = () => {
    return pages.map((item, index) => (
      <ListItem key={item.title} disablePadding>
        <ListItemButton href={item.route}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    ));
  };

  const menu = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => console.log("click")}
      onKeyDown={() => console.log("keydown")}
    >
      <List>
        <ListItem>
          <ListItemText primary="Pages" />
          <IconButton onClick={() => props.onClose()} className="max-w-fit">
            <KeyboardBackspaceIcon />
          </IconButton>
        </ListItem>
        <Divider />
        {pageItems()}
        <Divider />
      </List>
    </Box>
  );
  return (
    <MUISwipeableDrawer
      anchor="left"
      open={props.isOpen}
      onOpen={props.onOpen}
      onClose={props.onClose}
    >
      {menu()}
    </MUISwipeableDrawer>
  );
}
