import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./circularProgressLabel.css";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        id="circular-progress-label"
        size={90}
        variant="determinate"
        {...props}
        sx={{color:'#5f0a87'}}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "black", letterSpacing: 0 }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
        <Typography
          variant="caption"
          component="div"
          sx={{ fontSize: 10, color: "#9e9e9e" }}
        >
          {`Solved`}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;
