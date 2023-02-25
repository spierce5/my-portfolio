import React from "react";
import {
  styled,
  Stack,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  IconButton,
  Icon,
  Divider,
  Tooltip,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const ConditionalStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
}));

export default function Footer() {
  return (
    <Container
      maxWidth={false}
      disableGutters={false}
      sx={{
        position: "relative",
        bottom: 0,
        width: "100%",
        padding: 0,
        zIndex: 20,
      }}
    >
      <Divider />
      <ConditionalStack divider={<Divider />}>
        <Stack direction="column">
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Contact
          </Typography>
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
        </Stack>
      </ConditionalStack>
    </Container>
  );
}
