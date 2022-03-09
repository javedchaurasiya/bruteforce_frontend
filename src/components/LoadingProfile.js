import React from "react";
import "./loadingProfile.css";

function LoadingProfile() {
  return (
    <div className="main-loadingProfile" style={{ marginTop: "60px" }}>
      <div className="spinner">
        <span>Loading Profile...</span>
        <div className="half-spinner"></div>
      </div>
    </div>
  );
}

export default LoadingProfile;
