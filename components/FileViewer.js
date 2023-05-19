import { Stack, Button, Typography, Container } from "@mui/material";

export default function FileViewer(props) {
  return (
    <Container className="h-screen">
      <Stack spacing={1} className="h-full">
        <Typography variant="h3">{props.name}</Typography>
        <div className="flex-col space-y-28 md:space-y-12 h-full">
          <object
            data={props.path}
            type="application/pdf"
            width="100%"
            className="h-screen"
          />
        </div>
      </Stack>
    </Container>
  );
}
