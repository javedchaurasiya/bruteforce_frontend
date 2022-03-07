import React from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./postSkeleton.css";

function PostSkeleton(props) {
  const { postDetails } = props;
//   console.log(postDetails);
  return (
    <div className="main-post-skeleton">
      <Link to={`/posts/${postDetails.id}`} className="post-details-container">
        <div className="post-skeleton-heading-container">
          {postDetails.heading}
        </div>
        <div className="post-stats-container">
          <div
            style={{
              //   marginLeft: "40px",
              width: "90px",
              fontWeight: "400",
              color: "#9e9e9e",
              fontSize: "11px",
              paddingTop: "2px",
            }}
          >
            {postDetails.timeline}
          </div>
          <div
            style={{
              // marginLeft: "35px",
              fontSize: "11px",
              paddingTop: "3px",
              fontWeight: "400",
              color: "#9e9e9e",
              width: "50px",
            }}
          >
            <FavoriteBorderIcon sx={{ fontSize: "14px", mb: "2px" }} />
            {postDetails.likes}
          </div>
          <div
            style={{
              // marginLeft: "10px",
              fontSize: "11px",
              paddingTop: "3px",
              fontWeight: "400",
              color: "#9e9e9e",
            }}
          >
            <VisibilityOutlinedIcon sx={{ fontSize: "14px", mb: "2px" }} />
            {postDetails.views} views
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostSkeleton;
