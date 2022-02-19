import React from "react";
import "./loadingPage.css";

function LoadingPage() {
  return (
    <div className="body1">
      <div className="content">
        <div className="planet">
          <div className="ring"></div>
          <div className="cover-ring"></div>
          <div className="spots">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <p>loading</p>
      </div>
    </div>
  );
}

export default LoadingPage;
