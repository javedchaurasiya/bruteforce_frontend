import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ViewMoreComponent(props) {
  return (
    <Link to={`/${props.link}`}>
      <Button variant="contained" endIcon={<AddIcon id="add-more-icon" />} sx={{fontSize:'10px',borderRadius:'28px',py:'2px',pt:'4px'}}>
        View More
      </Button>
    </Link>
  );
}

export default ViewMoreComponent;
