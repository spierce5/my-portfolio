import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import {
  AppBar as MUIAppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "./SwipeableDrawer";

export default function AppBar(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setDrawerIsOpen(true);
  }, [setDrawerIsOpen]);

  const handleClose = useCallback(() => {
    setDrawerIsOpen(false);
  }, [setDrawerIsOpen]);

  return (
    <>
      <MUIAppBar position="sticky" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Editor
          </Typography>
        </Toolbar>
      </MUIAppBar>
      <SwipeableDrawer
        isOpen={drawerIsOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        handleSelect={props.handleSelect}
        editableObjects={props.editableObjects}
      />
    </>
  );
}
