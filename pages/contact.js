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
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { getContentOnce, getFile } from "../firebase/firebase.js";

export async function getServerSideProps() {
  const data = await getContentOnce();
  let contact = JSON.parse(JSON.stringify(data.contact));

  contact.email_list.sort((a, b) => a.order - b.order);
  contact.phone_list.sort((a, b) => a.order - b.order);

  const imgFileName = (({ images }) => ({
    name: images.contact_image.file_name,
  }))(data);

  const imgSrc = await getFile(imgFileName.name);

  contact = { ...contact, src: imgSrc };

  return {
    props: {
      serverSideProps: contact,
    },
  };
}

export default function Contact({ serverSideProps }) {
  return (
    <Container>
      <Head>
        <title>N. Wensel|Research Interest</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main className="flex flex-row">
        <div className="flex flex-col">
          <article className="prose lg:prose-xl">
            <h1>Contact</h1>
          </article>
          <List>
            {serverSideProps.email_list.map((entry) => (
              <ListItem key={entry.value}>
                <ListItemButton href={"mailto:" + entry.value}>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText>{entry.value}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            {serverSideProps.phone_list.map((entry) => (
              <ListItem key={entry.value}>
                <ListItemButton href={"tel:" + entry.value}>
                  <ListItemIcon>
                    <PhoneEnabledIcon />
                  </ListItemIcon>
                  <ListItemText>{entry.value}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <img src={serverSideProps.src} alt=" " />
      </main>
    </Container>
  );
}
