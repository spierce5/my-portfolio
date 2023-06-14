import Head from "next/head";
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

export default function Contact() {
  const contactList = [
    {
      type: "email",
      value: "sam.pierce76@gmail.com",
      text: "sam.pierce76@gmail.com",
    },
    {
      type: "phone",
      value: "4024059977",
      text: "(402) 405-9977",
    },
  ];

  const typeProperties = {
    email: {
      icon: EmailIcon,
      prefix: "mailto:",
    },
    phone: {
      icon: PhoneEnabledIcon,
      prefix: "tel:",
    },
  };

  return (
    <Container>
      <Head>
        <title>S. Pierce | Contact</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <main className="flex flex-row">
        <div className="flex flex-col">
          <article className="prose lg:prose-xl">
            <h1>Contact</h1>
          </article>
          <List>
            {contactList.map((entry) => (
              <ListItem key={entry.value}>
                <ListItemButton
                  href={`${typeProperties[entry.type].prefix}${entry.value}`}
                >
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText>{entry.text}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </main>
    </Container>
  );
}
