import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import {
  AppBar as MUIAppBar,
  Stack,
  Link,
  Button,
  Divider,
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

const VerticalDivider = () => (
  <Divider
    orientation="vertical"
    variant="middle"
    style={{ height: "2em", width: "4px" }}
  />
);

export default function Header() {
  return (
    <Stack
      className="flex-col justify-center md:flex-row md:justify-end md:pt-12 md:pr-16"
      style={{ position: "sticky" }}
      sx={{}}
    >
      <Link
        href="/"
        component={Button}
        variant="h5"
        underline="none"
        className={
          getPageName() === "bio" ? "border-b-4 border-black border-solid" : ""
        }
      >
        Bio
      </Link>
      <Divider
        orientation="vertical"
        variant="middle"
        sx={{ height: "2em", width: "4px" }}
      />
      <Link
        href="/publications"
        component={Button}
        variant="h5"
        underline="none"
        className={
          getPageName() === "publications"
            ? "border-b-4 border-black border-solid"
            : ""
        }
      >
        Publications
      </Link>
      <VerticalDivider />
      <Link
        href="/research-interests"
        component={Button}
        variant="h5"
        underline="none"
        className={
          getPageName() === "research-interests"
            ? "border-b-4 border-black border-solid"
            : ""
        }
      >
        Research Interests
      </Link>
      <VerticalDivider />
      <Link
        href="/curriculum-vitae"
        component={Button}
        variant="h5"
        underline="none"
        className={
          getPageName() === "curriculum-vitae"
            ? "border-b-4 border-black border-solid"
            : ""
        }
      >
        Curriculum Vitae
      </Link>
      <VerticalDivider />
      <Link
        href="/contact"
        component={Button}
        variant="h5"
        underline="none"
        className={
          getPageName() === "contact"
            ? "border-b-4 border-black border-solid"
            : ""
        }
      >
        Contact
      </Link>
    </Stack>
  );
}
