import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar as MUIAppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import RichTextEditor from "../components/RichTextEditor";

export default function Editor() {
  return (
    <>
      <div>
        <RichTextEditor />
      </div>
    </>
  );
}

Editor.getLayout = (page) => page;
