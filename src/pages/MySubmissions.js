import { React, useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import LoadingProfile from "../components/LoadingProfile";
import TablePagination from "@mui/material/TablePagination";
import NotFound from "../components/NotFound";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const getColor = (level) => {
  if (level == "accepted") return "green";
  else if (level == "compilation error") return "#c3bf2f";
  else return "red";
};

const serverURL = "http://localhost:2000/";

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
function timeConverter(x) {
  // console.log(typeof x);

  var d = new Date(x);
  // console.log(d);
  return d.toLocaleString();
}

function MySubmissions() {
  const user = useSelector(selectUser);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [status, setStatus] = useState({
    loading: true,
    found: false,
  });
  const [subs, setSubs] = useState([]);
  useEffect(() => {
    const getMySubs = async () => {
      try {
        const response = await axios.post(serverURL + "mySubmissions", {
          user_name: user.user_name,
        });
        // console.log(response.data);
        setSubs(response.data.submissions);
        status.found = true;
      } catch (error) {
        console.log(error);
      }
      status.loading = false;
      setStatus({ ...status });
    };
    getMySubs();
  }, []);

  return !user ? (
    <Navigate to="/login" />
  ) : status.loading ? (
    <LoadingProfile />
  ) : !status.found ? (
    <NotFound />
  ) : (
    <div style={{ marginTop: "100px" }}>
      <Container fixed sx={{ minWidth: "800px" }}>
        <TableContainer sx={{ maxHeight: 540 }} component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            stickyHeader
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Problem</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Language</StyledTableCell>
                <StyledTableCell align="right">Time Submitted</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sub) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={sub.submission_id}
                    >
                      <StyledTableCell component="th" scope="row">
                        <Link to={"/problem/" + sub.problem_id}>
                          {sub.problem_name}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        sx={{ color: getColor(sub.status) }}
                      >
                        <Link
                          style={{ color: getColor(sub.status) }}
                          to={`/submissions/${sub.submission_id}`}
                        >
                          {sub.status}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {sub.language}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {timeConverter(sub.timeline)}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={subs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </div>
  );
}

export default MySubmissions;
