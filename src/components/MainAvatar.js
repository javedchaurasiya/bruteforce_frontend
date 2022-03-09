import React from "react";
import Avatar from "@mui/material/Avatar";
import "./mainAvatar.css";

function MainAvatar(props) {
  const { userDetails } = props;
  // console.log(userDetails);
  return (
    <div className="main-avatar">
      <div className="left-container-avatar">
        <Avatar
          alt={userDetails.name}
          src={userDetails.imageURL}
          sx={{ width: 56, height: 56 }}
          variant="square"
          style={{borderRadius:'10px'}}
        />
      </div>
      <div className="right-container-avatar">
        <div style={{ fontWeight: 700 }}>{userDetails.name}</div>
        <div style={{ fontWeight: 200, fontSize: "12px", color:'grey' }}>
          {userDetails.userName}
        </div>
      </div>
    </div>
  );
}

export default MainAvatar;
