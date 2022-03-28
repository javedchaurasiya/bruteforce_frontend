import React from "react";
import SubSummaryL from "./SubSummaryL";
import "./SubmissionSummary.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const getColor = (status) => {
  var color;
  if (status === "accepted") color = "green";
  else if (status === "compilation error") color = "#c3bf2f";
  else color = "red";
  return color;
};
// console.log(1234);
function timeConverter(x) {
  // console.log(typeof x);

  var d = new Date(x);
  // console.log(d);
  return d.toLocaleString();
}

function SubmissionSummary(props) {
  const { submissions } = props;
  //   console.log(submissions);
  return (
    <div className="main-submission-summary">
      {/* <div className="sub-table-heading">
        <div>Time Submitted</div>
        <div>Status</div>
        <div>Language</div>
      </div>
      {submissions.map((sub) => {
        //   console.log(sub);
       return ( <SubSummaryL key={sub.submission_id}  sub={sub} />);
      })} */}
      <TableContainer sx={{ maxHeight: 540 }} component={Paper}>
        <Table stickyHeader  sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow key={"table-header"}>
              <StyledTableCell>Time Submitted</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Language</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((sub) => (
              <StyledTableRow key={sub.submission_id}>
                <StyledTableCell component="th" scope="row">
                  {timeConverter(sub.timeline)}
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    style={{ color:getColor(sub.status) }}
                    to={"/submissions/" + sub.submission_id}
                  >
                    {sub.status}
                  </Link>
                </StyledTableCell>
                <StyledTableCell>{sub.language}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SubmissionSummary;
