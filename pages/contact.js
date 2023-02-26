import Head from "next/head";
import styles from "../styles/Home.module.css";
import SchoolIcon from "@mui/icons-material/School";
import {
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

export default function ResearchInterest() {
  return (
    <Container>
      <Head>
        <title>N. Wensel|Research Interest</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main>
        <Typography variant="h6">Contact</Typography>
        <List>
          <ListItem>
            <ListItemButton href="mailto:abc@def.com">
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText>Nicksemail@email.com</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </main>
    </Container>
  );
}
