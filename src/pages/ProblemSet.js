import { React, useState, useEffect } from "react";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import "./problemSet.css";
import LoadingProfile from "../components/LoadingProfile";
import TablePagination from "@mui/material/TablePagination";

const getColor = (level) => {
  if (level == "easy") return "green";
  else if (level == "medium") return "#ffd252";
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function ProblemSet() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [Status, setStatus] = useState({
    loading: true,
  });
  const tags = ["DP", "Array", "Maths", "Greedy"];
  const [filter, setFilter] = useState({
    level: "all",
    tags: [...tags],
  });
  const [Problems, setProblems] = useState([]);

  useEffect(() => {
    const getProblemSet = async () => {
      try {
        const response = await axios.post(serverURL + "getproblemSet", {
          ...filter,
        });
        console.log(response);
        setProblems(response.data.result);
      } catch (error) {
        console.log(error);
        alert("Something Went Wrong");
      }
      Status.loading = false;
      setStatus({ ...Status });
    };
    getProblemSet();
  }, [filter]);

  return Status.loading ? (
    <LoadingProfile />
  ) : (
    <div className="main-problemSet-body">
      <Container fixed sx={{ minWidth: "800px" }}>
        <div className="filter-container">
          <FormControl sx={{ minWidth: "200px" }}>
            <InputLabel>Level</InputLabel>
            <Select
              value={filter.level}
              label="Level"
              onChange={(e) => {
                setFilter({ ...filter, level: e.target.value });
              }}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"easy"}>Easy</MenuItem>
              <MenuItem value={"medium"}>Medium</MenuItem>
              <MenuItem value={"hard"}>Hard</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ ml: 1 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              multiple
              value={filter.tags}
              onChange={(e) => {
                const {
                  target: { value },
                } = e;
                setFilter({
                  ...filter,
                  tags: typeof value === "string" ? value.split(",") : value,
                });
              }}
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {tags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={filter.tags.indexOf(tag) > -1} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <TableContainer className="problemSetTable" sx={{ maxHeight: 440 }} component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            stickyHeader
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Difficulty</StyledTableCell>
                <StyledTableCell align="right">Likes</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {Problems.map((prob) => (
                <StyledTableRow key={prob.problem_id}>
                  <StyledTableCell component="th" scope="row">
                    <Link to={"/problem/" + prob.problem_id}>{prob.title}</Link>
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    sx={{ color: getColor(prob.level) }}
                  >
                    {prob.level}
                  </StyledTableCell>
                  <StyledTableCell align="right">{prob.likes}</StyledTableCell>
                </StyledTableRow>
              ))} */}
              {Problems.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((prob) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={prob.problem_id}
                  >
                    {/* {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })} */}
                    <StyledTableCell component="th" scope="row">
                      <Link to={"/problem/" + prob.problem_id}>
                        {prob.title}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      sx={{ color: getColor(prob.level) }}
                    >
                      {prob.level}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {prob.likes}
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
          count={Problems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </div>
  );
}

export default ProblemSet;
