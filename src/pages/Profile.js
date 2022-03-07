import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import MainAvatar from "../components/MainAvatar";
import Socials from "../components/Socials";
import Submission from "../components/Submission";
import CircularProgressWithLabel from "../components/CircularProgressWithLabel";
import SchoolIcon from "@mui/icons-material/School";
import LinearProgress from "@mui/material/LinearProgress";
import { grey } from "@mui/material/colors";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SubmissionPageComponent from "../components/SubmissionPageComponent";
import PostPageComponent from "../components/PostPageComponent";
import EditProfilePopup from "../components/EditProfilePopup";
import "./profile.css";

function Profile() {
  const [userDetails, setUserDetails] = useState({
    name: "Ritu Raj Shandilya",
    userName: "rituraj",
    school: "IIITG",
    location: "Bihar, India",
    socials: {
      linkedin: "xyz",
      twitter: "xyz",
      github: "xyz",
    },
  });

  const update = () => {
    setUserDetails({...userDetails})
  };

  const imageURL =
    "https://media-exp1.licdn.com/dms/image/C5603AQG1B8pmz0jpvg/profile-displayphoto-shrink_800_800/0/1637489130518?e=1651708800&v=beta&t=EQsnNYTlxO0xPxkzHEBcLc63eYizo95UR6qb1lUoILA";
  const [tabIndex, setTabIndex] = useState("1");

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  return (
    <>
      <EditProfilePopup />
      <div className="main-profile">
        <Container fixed sx={{ minWidth: "1250px" }}>
          <div className="profile-container">
            <div className="left-container-profile">
              <div className="avatar-container">
                <MainAvatar
                  userDetails={{
                    imageURL,
                    name: userDetails.name,
                    userName: userDetails.userName,
                  }}
                />
              </div>
              <div className="edit-container">
                <Button
                  variant="outlined"
                  sx={{ px: "52px", fontSize: 12 }}
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
                  <SchoolIcon sx={{ fontSize: 17, color: grey[500] }} />
                </div>
                <span style={{ fontSize: "13px", color: "grey" }}>
                  {userDetails.school}
                </span>
              </div>
              <div className="location-container">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "7px",
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: 17, color: grey[500] }} />
                </div>
                <span style={{ fontSize: "13px", color: "grey" }}>
                  {userDetails.location}
                </span>
              </div>
              <Socials socialDetails={userDetails.socials} />
              <Submission
                submissionDetails={{
                  total: "1000",
                  cpp: "700",
                  java: "100",
                  python: "200",
                }}
              />
            </div>
            <div className="right-container-profile">
              <div className="right-section-1">
                <div className="solved-sec">
                  <span
                    style={{
                      fontSize: "10px",
                      marginLeft: "7px",
                      color: "#ac8a8e",
                    }}
                  >
                    Solved Problems
                  </span>
                  <div className="solved-sec-container">
                    <div className="progress-container">
                      <CircularProgressWithLabel value={69} />
                    </div>
                    <div className="linear-progress-container">
                      <LinearProgress
                        id="easy-progress"
                        variant="determinate"
                        value={20}
                        sx={{ borderRadius: "5px" }}
                      />
                      <LinearProgress
                        id="medium-progress"
                        variant="determinate"
                        value={20}
                        sx={{ borderRadius: "5px" }}
                      />
                      <LinearProgress
                        id="hard-progress"
                        variant="determinate"
                        value={15}
                        sx={{ borderRadius: "5px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="community">
                  <span
                    style={{
                      fontSize: "10px",
                      marginLeft: "7px",
                      color: "#ac8a8e",
                    }}
                  >
                    Community Status
                  </span>
                  <div className="community-container">
                    <div className="community-sub-container">
                      <DynamicFeedIcon
                        sx={{
                          fontSize: "55px",
                          width: "100%",
                          margin: "0 auto",
                          color: "#ec9f05",
                        }}
                      />
                      <span
                        style={{
                          textAlign: "center",
                          fontSize: "12px",
                          marginTop: "5px",
                        }}
                      >{`${69} Posts`}</span>
                    </div>
                    <div className="community-sub-container">
                      <FavoriteIcon
                        sx={{
                          fontSize: "55px",
                          width: "100%",
                          margin: "0 auto",
                          color: "#b91372",
                        }}
                      />
                      <span
                        style={{
                          textAlign: "center",
                          fontSize: "12px",
                          marginTop: "5px",
                        }}
                      >{`${269} Likes`}</span>
                    </div>
                    <div className="community-sub-container">
                      <VisibilityIcon
                        sx={{
                          fontSize: "55px",
                          width: "100%",
                          margin: "0 auto",
                          color: "#009ffd",
                        }}
                      />
                      <span
                        style={{
                          textAlign: "center",
                          fontSize: "12px",
                          marginTop: "5px",
                        }}
                      >{`${"3.2k"} Views`}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cal-heatmap">Space for Calendar HeatMap</div>
              <div className="solution-posts-container">
                <TabContext value={tabIndex}>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", padding: 0 }}
                  >
                    <TabList
                      onChange={handleChange}
                      textColor="secondary"
                      indicatorColor="secondary"
                      aria-label="lab API tabs example"
                      variant="fullWidth"
                    >
                      <Tab
                        label={
                          <span
                            style={{
                              color: tabIndex === "1" ? "green" : "",
                              fontSize: "12px",
                            }}
                          >
                            <CheckCircleIcon sx={{ fontSize: "16px" }} />
                            <span
                              style={{ marginLeft: "5px", paddingTop: "3px" }}
                            >
                              Recent AC
                            </span>
                          </span>
                        }
                        value="1"
                      />
                      <Tab
                        label={
                          <span
                            style={{
                              color: tabIndex === "2" ? "#fe5f75" : "",
                              fontSize: "12px",
                            }}
                          >
                            <DynamicFeedIcon sx={{ fontSize: "16px" }} />
                            <span
                              style={{ marginLeft: "5px", paddingTop: "3px" }}
                            >
                              Posts
                            </span>
                          </span>
                        }
                        value="2"
                      />
                      <Tab
                        label={
                          <span
                            style={{
                              color: tabIndex === "3" ? "blue" : "",
                              fontSize: "12px",
                            }}
                          >
                            <DynamicFeedIcon sx={{ fontSize: "16px" }} />
                            <span
                              style={{ marginLeft: "5px", paddingTop: "3px" }}
                            >
                              Something
                            </span>
                          </span>
                        }
                        value="3"
                      />
                    </TabList>
                  </Box>
                  <TabPanel value="1" sx={{ padding: 0 }}>
                    <SubmissionPageComponent />
                  </TabPanel>
                  <TabPanel value="2" sx={{ padding: 0 }}>
                    <PostPageComponent />
                  </TabPanel>
                  <TabPanel value="3" sx={{ padding: 0 }}>
                    Item Three
                  </TabPanel>
                </TabContext>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Profile;
