import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import "./searchUser.css";
import UserSearch from "../components/UserSearch";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchUser() {
  return (
    <div className="search-body">
      <Container fixes sx={{ background: "#f5f5f5", minWidth: "500px" }}>
        <div className="items">
          <div className="search-box">
            <TextField
              fullWidth
              id="Search User"
              label="Search"
              variant="outlined"
              placeholder="Search User..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="search-results">
            <UserSearch name="user one" userName="bajak" questions={120} />
            <UserSearch name="user two" userName="raja" questions={150} />
            <UserSearch name="user three" userName="rahul" questions={200} />
            <UserSearch name="user one" userName="bajak" questions={120} />
            <UserSearch name="user two" userName="raja" questions={150} />
            <UserSearch name="user three" userName="rahul" questions={200} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SearchUser;
