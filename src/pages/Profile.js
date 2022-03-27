import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import LoadingProfile from "../components/LoadingProfile";
import NotFound from "../components/NotFound";
import HeatMap from "../components/HeatMap";
import "./profile.css";

function Profile() {
  const user = useSelector(selectUser);

  const params = useParams();
  // console.log(params.id+" hello");

  // const [currentUser, setCurrentUser] = useState(params.id)
  // setCurrentUser(params.id)

  const serverUrl = "http://localhost:2000/";

  const [searchingUser, setSearchingUser] = useState(true);
  const [userParam, setuserParam] = useState(params.id);
  const [displayPopUp, setDisplayPopUp] = useState(false);
  // const [userDetails, setUserDetails] = useState({
  //   name: "Ritu Raj Shandilya",
  //   userName: "rituraj",
  //   imageURL:
  //     "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png ",
  //   school: "Indian Institute of Information Technology Guwahati",
  //   location: "Bihar, India",
  //   linkedin: "riturajshandilya",
  //   twitter: "anonymouslaunda",
  //   github: "javedchaurasiya",
  // });
  const [userDetails, setUserDetails] = useState(null);
  const [otherData, setOtherData] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const handleClose = () => {
    setDisplayPopUp(!displayPopUp);
  };

  const update = () => {
    setUserDetails({ ...editUser });
    getProfileDetails();
  };
  const updateCopy = () => {
    setEditUser({ ...editUser });
  };

  const editFunction = () => {
    setEditUser({ ...userDetails });
    handleClose();
  };

  const [tabIndex, setTabIndex] = useState("1");

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const getProfileDetails = async () => {
    try {
      const response = await axios.post(serverUrl + "profile", {
        userName: params.id,
      });
      // console.log(response);
      if (!response.data.profileData) {
        // alert("UserNotFound");
        setSearchingUser(false);
        return;
      }
      const profileData = response.data.profileData;
      setUserDetails({
        name: profileData.general_name,
        userName: profileData.user_name,
        imageURL: profileData.imageURL,
        school: profileData.school,
        location: profileData.location,
        linkedin: profileData.socials.linkedin,
        github: profileData.socials.github,
        twitter: profileData.socials.twitter,
      });

      // const otherData = response.data.otherData;
      setOtherData(response.data.otherData);
      console.log(otherData);
      setSearchingUser(false);
    } catch (error) {
      console.log(error);
      // alert("UserNotFound");
      setSearchingUser(false);
    }
  };

  const [PrevUser, setPrevUser] = useState("");

  useEffect(() => {
    // console.log('Entered Effect');
    getProfileDetails();
    setPrevUser(params.id);
  }, []);

  if (PrevUser !== params.id) {
    setSearchingUser(true);
    setUserDetails(null);
    getProfileDetails();
    setPrevUser(params.id);
  }

  // console.log('other data');
  // getProfileDetails()
  return searchingUser ? (
    <LoadingProfile />
  ) : !userDetails ? (
    <NotFound />
  ) : (
    <>
      {displayPopUp && (
        <EditProfilePopup
          userDetail={editUser}
          update={update}
          updateCopy={updateCopy}
          handleClose={handleClose}
        />
      )}
      <div className="main-profile">
        <Container fixed sx={{ minWidth: "1250px" }}>
          <div className="profile-container">
            <div className="left-container-profile">
              <div className="avatar-container">
                <MainAvatar
                  userDetails={{
                    imageURL: userDetails.imageURL,
                    name: userDetails.name,
                    userName: userDetails.userName,
                  }}
                />
              </div>
              {user && user.user_name === userDetails.userName && (
                <div className="edit-container">
                  <Button
                    variant="outlined"
                    sx={{ px: "52px", fontSize: 12 }}
                    endIcon={<EditIcon />}
                    onClick={editFunction}
                  >
                    Edit Profile
                  </Button>
                </div>
              )}
              <div className="school-container">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "7px",
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 17, color: "#9e9e9e" }} />
                </div>
                <span style={{ fontSize: "13px", color: "#9e9e9e" }}>
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
                  <LocationOnIcon sx={{ fontSize: 17, color: "#9e9e9e" }} />
                </div>
                <span style={{ fontSize: "13px", color: "#9e9e9e" }}>
                  {userDetails.location}
                </span>
              </div>
              <Socials
                socialDetails={{
                  linkedin: userDetails.linkedin,
                  github: userDetails.github,
                  twitter: userDetails.twitter,
                }}
              />
              <Submission submissionDetails={otherData.submissionStats} />
            </div>
            <div className="right-container-profile">
              <div className="right-section-1">
                <div className="solved-sec">
                  <span
                    style={{
                      fontSize: "10px",
                      marginLeft: "7px",
                      color: "#9e9e9e",
                    }}
                  >
                    Solved Problems
                  </span>
                  <div className="solved-sec-container">
                    <div className="progress-container">
                      <CircularProgressWithLabel
                        value={otherData.solvedProblems.solvedPercent}
                      />
                    </div>
                    <div className="linear-progress-container">
                      <LinearProgress
                        id="easy-progress"
                        variant="determinate"
                        value={otherData.solvedProblems.easy}
                        sx={{ borderRadius: "5px" }}
                      />
                      <LinearProgress
                        id="medium-progress"
                        variant="determinate"
                        value={otherData.solvedProblems.medium}
                        sx={{ borderRadius: "5px" }}
                      />
                      <LinearProgress
                        id="hard-progress"
                        variant="determinate"
                        value={otherData.solvedProblems.hard}
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
                      color: "#9e9e9e",
                    }}
                  >
                    Community Stats
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
              <div className="cal-heatmap">
                <span
                  style={{
                    fontSize: "10px",
                    marginLeft: "7px",
                    color: "#9e9e9e",
                  }}
                >
                  Submission History
                </span>
                <HeatMap />
              </div>
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
                    <SubmissionPageComponent
                      submissionArray={otherData.recentAC}
                    />
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
