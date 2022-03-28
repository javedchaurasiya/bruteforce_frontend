// import { useEffect } from 'react';
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login } from "./features/userSlice";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  withRouter,
} from "react-router-dom";
import Contest from "./pages/Contest";
import ProblemSet from "./pages/ProblemSet";
import Problem from "./pages/Problem";
import AddProblem from "./pages/AddProblem";
import SearchUser from "./pages/SearchUser";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useState, useEffect } from "react";
import LoadingPage from "./pages/LoadingPage";
import CodeEditor from "./pages/CodeEditor";
import Profile from "./pages/Profile";
import SubmissionDetails from "./pages/SubmissionDetails.js";
import MySubmissions from "./pages/MySubmissions.js";
import axios from "axios";

const serverUrl = "http://localhost:2000/";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [checkToken, setCheckToken] = useState(true);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      // console.log("checking token");
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("Token");
          // console.log(token);
          const response = await axios.post(serverUrl + "verifyToken", {
            token,
          });
          // console.log(response);
          dispatch(
            login({
              user_name: response.data.user_name,
              general_name: response.data.general_name,
              imageURL: response.data.imageURL,
            })
          );
          setCheckToken(false);
        } catch (error) {
          console.log(error);
          setCheckToken(false);
        }
      };
      fetchData();
    }, 1500);
    return () => clearTimeout(timeoutID);
  }, []);

  return checkToken ? (
    <LoadingPage />
  ) : (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/problem/:id" element={<Problem />} />
          <Route exact path="/submissions/:id" element={<SubmissionDetails />} />
          <Route exact path="/addProblem" element={<AddProblem />} />
          <Route exact path="/mySubmissions" element={<MySubmissions />} />
          <Route exact path="/problemset" element={<ProblemSet />} />
          <Route exact path="/contest" element={<Contest />} />
          <Route exact path="/searchuser" element={<SearchUser />} />
          <Route exact path="/code-editor" element={<CodeEditor />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/" element={<HomePage />} />
          <Route path="/:id" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
