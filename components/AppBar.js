import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar as MUIAppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function AppBar() {
  return (
    <MUIAppBar position="fixed" color="primary">
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
          Nicholas Wensel
        </Typography>
      </Toolbar>
    </MUIAppBar>
  );
}
