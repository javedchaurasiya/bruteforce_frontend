import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import { checkboxClasses, TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./editProfilePopup.css";
function EditProfilePopup(props) {
  const serverUrl = "http://localhost:2000/";
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const Input = styled("input")({
    display: "none",
  });

  const { userDetail, update, updateCopy, handleClose } = props;

  const validateData = () => {
    if (userDetail.name === "") return false;
    if (userDetail.school === "") return false;
    if (userDetail.address === "") return false;
    return true;
  };

  const trimData = () => {
    userDetail.name = userDetail.name.trim();
    updateCopy();
    userDetail.school = userDetail.school.trim();
    updateCopy();
    userDetail.location = userDetail.location.trim();
    updateCopy();
    userDetail.linkedin = userDetail.linkedin.trim();
    updateCopy();
    userDetail.github = userDetail.github.trim();
    updateCopy();
    userDetail.twitter = userDetail.twitter.trim();
    updateCopy();
  };

  const submit = async () => {
    try {
      trimData();

      if (!validateData()) {
        alert("Fields marked * are required");
        return;
      }

      const response = await axios.post(serverUrl + "updateProfile", {
        imageURL: userDetail.imageURL,
        user_name: userDetail.userName,
        general_name: userDetail.name,
        school: userDetail.school,
        location: userDetail.location,
        linkedin: userDetail.linkedin != "" ? userDetail.linkedin : "n/a",
        github: userDetail.github != "" ? userDetail.github : "n/a",
        twitter: userDetail.twitter != "" ? userDetail.twitter : "n/a",
      });

      console.log(response.data);
      if (!response.data.success) {
        alert("Something Went Wrong");
        return;
      }
      if (user) {
        dispatch(
          login({
            user_name: userDetail.userName,
            general_name: userDetail.name,
            imageURL: userDetail.imageURL,
          })
        );
      }
      alert("Saved Successfully");
      update();
      handleClose();
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    }
  };

  const [uploadingImage, setUploadingImage] = useState(false);

  const uploadImage = async (e) => {
    // console.log(e.target.files[0]);
    try {
      if (!e.target.files) {
        alert("Image is needed");
        return;
      }
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const response = await axios.post(serverUrl + "imageUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response);
      userDetail.imageURL = response.data.data.Location;
      updateCopy();
      alert("Uploaded Successfully");
    } catch (error) {
      console.log(error);
      alert("Error in Uploading Image");
    }
    setUploadingImage(false);
  };

  return (
    <div className="overlay">
      <div className="popup">
        <div className="textField-containers">
          <span
            style={{
              marginBottom: "10px",
              fontSize: "14px",
              marginLeft: "5px",
              color: "#9e9e9e",
            }}
          >
            Edit Profile
          </span>

          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={uploadImage}
            />
            <Button variant="contained" component="span" sx={{ mb: "10px" }}>
              Upload Image
            </Button>
          </label>
          <TextField
            required
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ mb: "15px" }}
            value={userDetail.name}
            onChange={(e) => {
              userDetail.name = e.target.value;
              updateCopy();
            }}
          />
          <TextField
            required
            id="outlined-basic"
            label="User Name"
            variant="outlined"
            fullWidth
            disabled
            sx={{ mb: "15px", p: 0 }}
            value={userDetail.userName}
          />
          <TextField
            required
            id="outlined-basic"
            label="School"
            variant="outlined"
            fullWidth
            sx={{ mb: "15px", p: 0 }}
            value={userDetail.school}
            onChange={(e) => {
              userDetail.school = e.target.value;
              updateCopy();
            }}
          />
          <TextField
            required
            id="outlined-basic"
            label="Address"
            variant="outlined"
            fullWidth
            sx={{ mb: "15px", p: 0 }}
            value={userDetail.location}
            onChange={(e) => {
              userDetail.location = e.target.value;
              updateCopy();
            }}
          />
          <TextField
            required
            id="outlined-basic"
            label="LinkedIn Username"
            variant="outlined"
            fullWidth
            sx={{ mb: "15px", p: 0 }}
            value={userDetail.linkedin}
            onChange={(e) => {
              userDetail.linkedin = e.target.value;
              updateCopy();
            }}
          />
          <TextField
            required
            id="outlined-basic"
            label="Github Username"
            variant="outlined"
            fullWidth
            sx={{ mb: "15px", p: 0 }}
            value={userDetail.github}
            onChange={(e) => {
              userDetail.github = e.target.value;
              updateCopy();
            }}
          />
          <TextField
            required
            id="outlined-basic"
            label="Twitter Username"
            variant="outlined"
            fullWidth
            sx={{ mb: "15px", p: 0 }}
            value={userDetail.twitter}
            onChange={(e) => {
              userDetail.twitter = e.target.value;
              updateCopy();
            }}
          />
          <div className="save-close-btn">
            <Button
              disabled={uploadingImage}
              variant="contained"
              onClick={submit}
            >
              {uploadingImage ? "Uploading..." : "Save"}
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePopup;
