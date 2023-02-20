import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import {
  AppBar as MUIAppBar,
  Toolbar,
  IconButton,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Link,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const getPageName = () => {
  const router = useRouter();
  let pageName = router.route;
  if (pageName === "/") {
    pageName = "bio";
  } else {
    pageName = pageName.replace("/", "");
  }
  return pageName;
};

export default function Header() {
  const [currentSelection, setCurrentSelection] = useState("bio");

  const handleChange = useCallback(
    (event) => {
      const target = event.target;
      const value = target.value;
      setCurrentSelection(value);
    },
    [setCurrentSelection]
  );
  /*
   * Instead of menu have multiple buttons with underline indicating the current location. See https://www.pierrickcalvez.com/
   */
  return (
    <Stack
      direction="row"
      style={{ position: "sticky" }}
      sx={{
        justifyContent: "flex-end",
        paddingTop: "50px",
        paddingRight: "50px",
      }}
    >
      <Link
        href="/"
        component={Button}
        variant="h5"
        underline={getPageName() === "bio" ? "always" : "none"}
      >
        Bio
      </Link>
      <Link
        href="/publications"
        component={Button}
        variant="h5"
        underline={getPageName() === "publications" ? "always" : "none"}
      >
        Publications
      </Link>
      <Link
        href="curriculum-vitae"
        component={Button}
        variant="h5"
        underline={getPageName() === "curriculum-vitae" ? "always" : "none"}
      >
        Curriculum Vitae
      </Link>
    </Stack>
  );
}
