import React from "react";
import SubmissionSkeleton from "./SubmissionSkeleton";
import ViewMoreComponent from "./ViewMoreComponent";
import "./submissionPage.css";

function SubmissionPageComponent(props) {
  const {submissionArray}=props
  // console.log(submissionArray);
  return (
    <div className="main-submission-page">
      {submissionArray.map(sub=>(<SubmissionSkeleton key={sub.id} submissionDetails={sub}/>))}
      {/* <SubmissionSkeleton
        submissionDetails={{
          id: "123456",
          problemName: "Two Sum",
          timeline: "3 days ago",
        }}
      />
      <SubmissionSkeleton
        submissionDetails={{
          id: "123456",
          problemName: "Coin Change II",
          timeline: "3 days ago",
        }}
      />
      <SubmissionSkeleton
        submissionDetails={{
          id: "123456",
          problemName: "Flip Game",
          timeline: "5 days ago",
        }}
      />
      <SubmissionSkeleton
        submissionDetails={{
          id: "123456",
          problemName: "Count Game",
          timeline: "6 days ago",
        }}
      />
      <SubmissionSkeleton
        submissionDetails={{
          id: "123456",
          problemName: "Count All Valid Pickup and Delivery Options",
          timeline: "1 week ago",
        }}
      />
      <SubmissionSkeleton
        submissionDetails={{
          id: "123456",
          problemName: "Three Sum",
          timeline: "1 week ago",
        }}
      />
      <SubmissionSkeleton
        submissionDetails={{
          id: "123456",
          problemName: "Majority Element",
          timeline: "1 week ago",
        }}
      /> */}
      <div className="view-more-submissions-btn">
        <ViewMoreComponent link={"mySubmissions"} />
      </div>
    </div>
  );
}

export default SubmissionPageComponent;
