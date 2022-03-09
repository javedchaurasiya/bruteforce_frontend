// import React from "react";
// import { useDispatch } from "react-redux";
// import { login } from "./features/userSlice";
// import { selectUser } from "./features/userSlice";
// import { useSelector } from "react-redux";

// // const user = useSelector(selectUser);
//   // const dispatch = useDispatch();
//   // const fun = () => {
//   //   console.log("clicked");
//   //   dispatch(
//   //     login({
//   //       name: "ritu raj",
//   //       roll: "1901162",
//   //     })
//   //   );
//   //   console.log(user.name+"  done");
//   // };

// function Login() {

//   return (
//     <div>
//       Login Page
//     </div>
//   );
// }

// export default Login;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { Navigate } from "react-router-dom";

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

const serverUrl = "http://localhost:2000/";

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
      const user_name = data.get("user_name");
      const password = data.get("password");
      console.log("making request");

      const response = await axios.post(serverUrl + "login", {
        user_name,
        password,
      });
      const result = response.data;
      console.log(result);
      if (result.error) {
        alert("Invalid UserName or Password");
        return;
      }
      localStorage.setItem("Token", result.token);
      dispatch(
        login({
          user_name: result.user_name,
          general_name: result.general_name,
          imageURL: result.imageURL,
        })
      );

      // console.log(User)
    } catch (error) {
      alert("Invalid UserName or Password");
      console.log(error);
    }
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user_name"
              label="User Name"
              name="user_name"
              autoComplete="user_name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
