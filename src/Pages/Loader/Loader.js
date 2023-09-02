import React from "react";
import { CircularProgress, Typography } from "@mui/material";
export const Loader = () => {
  return (
    <div style={{ padding: "8vh 10vw" }}>
      <CircularProgress
        style={{
          width: "80px",
          height: "80px",
          color: "black",
        }}
        size={32}
      />
      <Typography style={{ fontSize: "40px", marginTop: "40px" }}>
        Loading...
      </Typography>
    </div>
  );
};
