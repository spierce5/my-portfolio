import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { IconButton, Stack, Link, Button, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "./SwipeableDrawer";

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
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setDrawerIsOpen(true);
  }, [setDrawerIsOpen]);

  const handleClose = useCallback(() => {
    setDrawerIsOpen(false);
  }, [setDrawerIsOpen]);

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, background: "white", borderRadius: "5px" }}
        onClick={handleOpen}
        className="text-2xl fixed top-2 left-2 z-40"
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <SwipeableDrawer
        isOpen={drawerIsOpen}
        onOpen={handleOpen}
        onClose={handleClose}
      />
    </>
  );
}
