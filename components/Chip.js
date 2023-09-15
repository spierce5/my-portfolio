import React, { useEffect, useState, useCallback } from "react";
import { Chip as MUIChip } from "@mui/material";

export default function Chip(props) {
  return (
    <MUIChip
      key={props.label}
      label={props.label}
      size="small"
      variant="filled"
      color={"info"}
      sx={{
        "& .MuiChip-label": {
          color: "#FAFCFD",
        },
      }}
    />
  );
}
