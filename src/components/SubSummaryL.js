import React from "react";
import { Link } from "react-router-dom";
import "./SubSummaryL.css";

function SubSummaryL(props) {

  const { sub } = props;
  // console.log(sub);
   var color;
   if(sub.status==='accepted')color='green'
   else if(sub.status==='compilation error')color='#9e9b0a'
   else color='red'
  // console.log(1234);
  function timeConverter(x) {
    // console.log(typeof x);

    var d=new Date(x)
    // console.log(d);
    return d.toString()
  }
  return (
    <div className="sub-table">
      <div>{timeConverter(sub.timeline)}</div>
      <div>
        <Link style={{ color }} to={"/submissions/" + sub.submission_id}>
          {sub.status}
        </Link>
      </div>
      <div>{sub.language}</div>
    </div>
  );
}

export default SubSummaryL;
