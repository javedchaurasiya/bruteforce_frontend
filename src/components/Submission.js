import React from "react";
import SubButton from "./SubButton";
import "./submission.css";

function Submission(props) {
  const { submissionDetails } = props;
  return (
    <div className="main-submission">
      <span
        style={{ fontWeight: 600, letterSpacing: 0.5, marginBottom: "10px" }}
      >
        Submission Stats
      </span>
      <SubButton language={"total"} number={submissionDetails.total} />
      <SubButton language={"cpp"} number={submissionDetails.cpp} />
      <SubButton language={"java"} number={submissionDetails.java} />
      <SubButton language={"python"} number={submissionDetails.python} />
    </div>
  );
}

export default Submission;
