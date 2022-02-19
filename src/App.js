// import { useEffect } from 'react';
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login } from "./features/userSlice";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contest from "./pages/Contest";
import ProblemSet from "./pages/ProblemSet";
import SearchUser from "./pages/SearchUser";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useState, useEffect } from "react";
import LoadingPage from "./pages/LoadingPage";
import CodeEditor from "./pages/CodeEditor";
import axios from "axios";

const serverUrl = "http://localhost:2000/";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [checkToken, setCheckToken] = useState(true);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      console.log("checking token");
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("Token");
          console.log(token);
          const response = await axios.post(serverUrl + "verifyToken", {
            token,
          });
          console.log(response);
          dispatch(
            login({
              user_name: response.data.user_name,
              general_name: response.data.general_name,
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
          <Route path="/problemset" exact element={<ProblemSet />} />
          <Route path="/contest" exact element={<Contest />} />
          <Route path="/searchuser" exact element={<SearchUser />} />
          <Route path="/code-editor" exact element={<CodeEditor />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/" exact element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
