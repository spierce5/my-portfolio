import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import {
  AppBar as MUIAppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const getPageName = () => {
  const router = useRouter();
  let pageName = router.route;
  if (pageName === "/") {
    pageName = "Bio";
  } else {
    pageName = parsePageName(pageName);
  }
  return pageName;
};

const parsePageName = (pageName) => {
  let parsedPageName = pageName.replace("/", "").replace("-", " ");
  const words = parsedPageName.split(" ");
  parsedPageName = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
  return parsedPageName;
};

export default function AppBar() {
  return (
    <MUIAppBar position="sticky" color="primary">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {getPageName()}
        </Typography>
      </Toolbar>
    </MUIAppBar>
  );
}
