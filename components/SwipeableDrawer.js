import { useState, useCallback } from "react";
import {
  SwipeableDrawer as MUISwipeableDrawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BiotechIcon from "@mui/icons-material/Biotech";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import DescriptionIcon from "@mui/icons-material/Description";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

export default function SwipeableDrawer(props) {
  const [pagesOpen, setPagesOpen] = useState(false);
  const [editPanelOpen, setEditPanelOpen] = useState(true);

  const pages = [
    {
      title: "Biography",
      route: "/",
      icon: <SentimentSatisfiedAltIcon />,
    },
    {
      title: "Publications",
      route: "/publications",
      icon: <LibraryBooksIcon />,
    },
    {
      title: "Research Interests",
      route: "/research-interests",
      icon: <BiotechIcon />,
    },
    {
      title: "Curriculum Vitae",
      route: "/curriculum-vitae",
      icon: <DescriptionIcon />,
    },
    {
      title: "Contact",
      route: "/contact",
      icon: <EmailIcon />,
    },
  ];

  const editPanelItems = () => {
    if (editPanelOpen) {
      return props.editableObjects.map((item, index) => (
        <ListItem key={item.title} disablePadding>
          <ListItemButton onClick={() => props.handleSelect(item.reference)}>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ));
    }
  };

  const pageItems = () => {
    if (pagesOpen) {
      return pages.map((item, index) => (
        <ListItem key={item.title} disablePadding>
          <ListItemButton href={item.route}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ));
    }
  };

  const menu = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => console.log("click")}
      onKeyDown={() => console.log("keydown")}
    >
      <List>
        <ListItemButton
          className="bg-gray-100"
          onClick={() => setEditPanelOpen(!editPanelOpen)}
        >
          <ListItemText primary="Editor" />
          <ListItemIcon>
            <KeyboardArrowDown
              sx={{
                transform: editPanelOpen ? "rotate(0)" : "rotate(-90deg)",
                transition: "0.2s",
              }}
            />
          </ListItemIcon>
        </ListItemButton>
        <Divider />
        {editPanelItems()}
        <Divider />
        <ListItemButton
          className="bg-gray-100"
          onClick={() => setPagesOpen(!pagesOpen)}
        >
          <ListItemText primary="Site Pages" />
          <ListItemIcon>
            <KeyboardArrowDown
              sx={{
                transform: pagesOpen ? "rotate(0)" : "rotate(-90deg)",
                transition: "0.2s",
              }}
            />
          </ListItemIcon>
        </ListItemButton>
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
