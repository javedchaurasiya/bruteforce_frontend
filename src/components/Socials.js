import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./socials.css";
// import { grey } from "@mui/material/colors";
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

function Socials(props) {
  const { socialDetails } = props;
  return (
    <div className="main-social">
      <span style={{ fontWeight: 600, letterSpacing: 0.5 }}>Socials</span>
      <a style={{marginTop:10}} href={"http://linkedin.com/in/" + socialDetails.linkedin}>
        <LinkedInIcon id="child-icon-linkedin" sx={{ fontSize: 17 }} />
        <span style={{ marginLeft: 5, fontSize:'13px' }}>{socialDetails.linkedin}</span>
      </a>
      <a style={{marginTop:8}} href={"http://github.com/" + socialDetails.github}>
        <GitHubIcon  sx={{ fontSize: 17 }} />
        <span style={{ marginLeft: 5,  fontSize:'13px' }}>{socialDetails.github}</span>
      </a>
      <a style={{marginTop:8}} href={"http://twitter.com/" + socialDetails.twitter}>
        <TwitterIcon id="child-icon-twitter" sx={{ fontSize: 17 }} />
        <span style={{ marginLeft: 5,  fontSize:'13px' }}>{socialDetails.twitter}</span>
      </a>
    </div>
  );
}

export default Socials;
