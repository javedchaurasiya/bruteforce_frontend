import React from "react";
import Container from "@mui/material/Container";
import "./profile.css";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import MainAvatar from "../components/MainAvatar";
import Socials from '../components/Socials'
import Submission from '../components/Submission'
import SchoolIcon from '@mui/icons-material/School';
import { grey } from "@mui/material/colors";

function Profile() {
  const imageURL =
    "https://media-exp1.licdn.com/dms/image/C5603AQG1B8pmz0jpvg/profile-displayphoto-shrink_800_800/0/1637489130518?e=1651708800&v=beta&t=EQsnNYTlxO0xPxkzHEBcLc63eYizo95UR6qb1lUoILA";

  return (
    <div className="main-profile">
      <Container fixed sx={{ minWidth: "1250px" }}>
        <div className="profile-container">
          <div className="left-container-profile">
            <div className="avatar-container">
              <MainAvatar
                userDetails={{
                  imageURL,
                  name: "Ritu Raj Shandilya",
                  userName: "rituraj",
                }}
              />
            </div>
            <div className="edit-container">
              <Button
                variant="outlined"
                sx={{ px: "45px",fontSize:12 }}
                endIcon={<EditIcon />}
              >
                Edit Profile
              </Button>
            </div>
            <div className="school-container">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "7px",
                }}
              >
                <SchoolIcon sx={{fontSize:17, color:grey[500]}}/>
              </div>
              <span style={{fontSize:'13px', color:'grey'}}>Indian Institute of Information Technology Guwahati</span>
            </div>
            <div className="location-container">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "7px",
                }}
              >
                <LocationOnIcon sx={{fontSize:17, color:grey[500]}} />
              </div>
              <span style={{fontSize:'13px', color:'grey'}}>India</span>
            </div>
            <Socials socialDetails={{linkedin:'abc',github:'abc',twitter:'abc'}}/>
            <Submission submissionDetails={{total:'1000',cpp:'700',java:'100',python:'200'}}/>
          </div>
          <div className="right-container-profile">
            <div className="right-section-1">
              <div className="solved-sec">
                <span style={{fontSize:'10px',marginLeft:'7px'}}>Solved Problems</span>
                <div className="solved-sec-container">
                  <div>a</div>
                  <div>a</div>
                  </div>
                </div>
              <div className="community">Community</div>
              </div>
            </div>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
