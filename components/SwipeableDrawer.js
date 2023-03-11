import {
  SwipeableDrawer as MUISwipeableDrawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BiotechIcon from "@mui/icons-material/Biotech";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import DescriptionIcon from "@mui/icons-material/Description";
import EmailIcon from "@mui/icons-material/Email";

export default function SwipeableDrawer(props) {
  const listItems = [
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
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => console.log("click")}
      onKeyDown={() => console.log("keydown")}
    >
      <List>
        {listItems.map((item, index) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton href={item.route}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
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
      {list()}
    </MUISwipeableDrawer>
  );
}
