import React from "react";
import { Link } from "react-router-dom";
import "./submissionSkeleton.css";

function SubmissionSkeleton(props) {
  const { submissionDetails } = props;
  return (
    <div className="main-sub-skeleton">
      <Link  to={`/submissions/${submissionDetails.id}`}>
        <div style={{width:'100%'}}>
        <span>
          {submissionDetails.problemName}
          <span
            style={{
              fontSize: "10px",
              marginLeft: "10px",
              fontWeight: "400",
              color: "#9e9e9e",
            }}
          >
            {submissionDetails.timeline}
          </span>
        </span>
        </div>
      </Link>
    </div>
  );
}

export default SubmissionSkeleton;
