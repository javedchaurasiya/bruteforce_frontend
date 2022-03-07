import React from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "./editProfilePopup.css";
function EditProfilePopup() {
  return (
    <div className="overlay">
      <div className="popup">
        <div className="textField-containers">
          <TextField
            required
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            className="edit-container-textF"
          />
          <TextField
            required
            id="outlined-basic"
            label="User Name"
            variant="outlined"
            fullWidth
            disabled
            className="edit-container-textF"
          />
          <TextField
            required
            id="outlined-basic"
            label="School"
            variant="outlined"
            fullWidth
            className="edit-container-textF"
          />
          <TextField
            required
            id="outlined-basic"
            label="Address"
            variant="outlined"
            fullWidth
            className="edit-container-textF"
          />
          <TextField
            required
            id="outlined-basic"
            label="LinkedIn Username"
            variant="outlined"
            fullWidth
            className="edit-container-textF"
          />
          <TextField
            required
            id="outlined-basic"
            label="Github Username"
            variant="outlined"
            fullWidth
            className="edit-container-textF"
          />
          <TextField
            required
            id="outlined-basic"
            label="Twitter Username"
            variant="outlined"
            fullWidth
            className="edit-container-textF"
          />
          <div className="save-close-btn">
            <Button variant="contained">Save</Button>
            <Button variant="contained">Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePopup;
