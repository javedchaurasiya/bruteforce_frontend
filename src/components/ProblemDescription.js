import { React, useState, useEffect } from "react";
import ProblemFeatures from "./ProblemFeatures";
// import axios from "axios";
// import parse from "html-react-parser";
import { Markup } from 'interweave';
import "./ProblemDescription.css";

function ProblemDescription(props) {
  
    const {problem}=props

  return (
    <div className="main-problem-description">
      <ProblemFeatures problem={problem} />
      <div className="problem-description">
        <Markup content={problem.description}/>
      </div>
    </div>
  );
}

export default ProblemDescription;
