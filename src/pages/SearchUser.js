import { React, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import "./searchUser.css";
import UserSearch from "../components/UserSearch";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function SearchUser() {
  const serverURL = "http://localhost:2000/";

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (query != "") setSearching(true);
    const getUsers = setTimeout(async () => {
      try {
        const response = await axios.post(serverURL + "search", {
          name: query,
        });
        // console.log(response.data);
        if (query !== "") setResult(response.data.result);
        else setResult([]);
      } catch (error) {
        console.log(error);
        alert("Something Went wrong");
      }
      setSearching(false);
    }, 1500);

    return () => clearTimeout(getUsers);
  }, [query]);

  return (
    <div className="search-body">
      <Container fixed sx={{ background: "#f5f5f5", minWidth: "500px" }}>
        <div className="items">
          <div className="search-box">
            <TextField
              fullWidth
              value={query}
              id="Search User"
              label="Search"
              variant="outlined"
              placeholder="Search User..."
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {searching && (
                      <CircularProgress color="success" sx={{ p: 1 }} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="search-results">
            {result.map((user) => (
              <UserSearch key={user.user_name} user={user} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SearchUser;
