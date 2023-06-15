import Head from "next/head";
import {
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
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
      icon: <EmailIcon />,
      prefix: "mailto:",
    },
    phone: {
      icon: <PhoneEnabledIcon />,
      prefix: "tel:",
    },
  };

  return (
    <>
      <Head>
        <title>S. Pierce | Contact</title>
        <link rel="icon" href="/bookmark-book.ico" />
      </Head>
      <Container>
        <main className="flex flex-row">
          <div className="flex flex-col">
            <Typography variant="h3">Contact</Typography>
            <List>
              {contactList.map((entry) => (
                <>
                  <ListItem key={entry.value}>
                    <ListItemButton
                      href={`${typeProperties[entry.type].prefix}${
                        entry.value
                      }`}
                    >
                      <ListItemIcon>
                        {typeProperties[entry.type].icon}
                      </ListItemIcon>
                      <ListItemText>{entry.text}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </div>
        </main>
      </Container>
    </>
  );
}
