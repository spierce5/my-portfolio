import React, { useEffect, useState, useCallback } from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  Container,
  Stack,
  Button,
} from "@mui/material";
import RichTextEditor from "../components/RichTextEditor";
import AppBar from "../components/AppBar";

export default function Editor() {
  return (
    <>
      <AppBar />
      <Container className="pt-6 pb-6">
        <Stack direction="column" spacing={2}>
          <Typography variant="h5">Bio</Typography>
          <div className="flex-col space-y-12">
            <RichTextEditor />
            <Stack direction="row" spacing={1} className="justify-end">
              <Button variant="outlined">Save</Button>
              <Button variant="outlined">Cancel</Button>
            </Stack>
          </div>
          <Typography variant="h5">Research Interests</Typography>
          <div className="flex-col space-y-12">
            <RichTextEditor />
            <Stack direction="row" spacing={1} className="justify-end">
              <Button variant="outlined">Save</Button>
              <Button variant="outlined">Cancel</Button>
            </Stack>
          </div>
        </Stack>
      </Container>
    </>
  );
}

Editor.getLayout = (page) => page;
