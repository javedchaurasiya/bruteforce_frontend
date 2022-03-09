import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import validator from 'validator';

const serverUrl = "http://localhost:2000/";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/">bruteForce</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [displayCheck, setDisplayCheck] = useState("none");
  const [displayLoading, setDisplayLoading] = useState("none");
  const [displayCross, setDisplayCross] = useState("none");

  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (userName !== "") {
      setDisplayLoading("");
      setDisplayCross("none");
      setDisplayCheck("none");
    }
    const delayDebounceFn = setTimeout(async () => {
      try {
        console.log(userName);
        // Send Axios request here
        const response = await axios.post(serverUrl + "checkUsername", {
          user_name: userName,
        });
        setDisplayLoading("none");
        console.log(response);
        if (userName !== "") {
          if (response.data.success) {
            setDisplayCross("");
          } else setDisplayCheck("");
        }
      } catch (error) {
        alert(error);
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [userName]);

  const check = (userData) => {
    if (
      userData.email === "" ||
      userData.firstName === "" ||
      userData.lastName === "" ||
      userData.user_name === "" ||
      userData.password === "" ||
      displayCheck === "none"
    )
      return false;
    return true;
  };

  const submitData = async (userData) => {
    try {
      // console.log("submitdata");
      console.log(userData);
      const response = await axios.post(serverUrl + "signup", {
        general_name: userData.firstName + " " + userData.lastName,
        mail: userData.email,
        user_name: userData.user_name,
        password: userData.password,
      });

      console.log(response);
      localStorage.setItem("Token", response.data.token);
      dispatch(
        login({
          user_name: response.data.user_name,
          general_name: response.data.general_name,
          imageURL: response.data.imageURL,
        })
      );
    } catch (error) {
      alert("Something Went Wrong, Try Again");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      user_name: data.get("user_name"),
      password: data.get("password"),
    });
    const userData = {
      firstName: data.get("firstName").trim(),
      lastName: data.get("lastName").trim(),
      email: data.get("email").trim(),
      user_name: data.get("user_name").trim(),
      password: data.get("password").trim(),
    };
    if (check(userData)) {
      submitData(userData);
      return;
    }
    alert("Invalid User Input");
  };

  return user ? (
    <Navigate to="/" />
  ) : (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="user_name"
                  label="User Name"
                  name="user_name"
                  autoComplete="user_name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CircularProgress
                          color="success"
                          sx={{ display: displayLoading, padding: "7px" }}
                        />
                        <CheckIcon
                          sx={{ color: "green", display: displayCheck }}
                        />
                        <ClearIcon
                          sx={{ display: displayCross, color: "red" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
