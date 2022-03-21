import React from "react";
import SubSummaryL from "./SubSummaryL";
import "./SubmissionSummary.css";

function SubmissionSummary(props) {
  const { submissions } = props;
//   console.log(submissions);
  return (
    <div className="main-submission-summary">
      <div className="sub-table-heading">
        <div>Time Submitted</div>
        <div>Status</div>
        <div>Language</div>
      </div>
      {submissions.map((sub) => {
        //   console.log(sub);
       return ( <SubSummaryL key={sub.submission_id}  sub={sub} />);
      })}
    </div>
  );
}

export default SubmissionSummary;
