import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./Problem.css";
import ProblemComponent from "../components/ProblemComponent";
import IDEComponent from "../components/IDEComponent";

function Problem() {
  const serverURL = "http://localhost:2000/";
  const params = useParams();
  const user = useSelector(selectUser);
  const [data, setData] = useState({
    values: {
      language: localStorage.getItem("language"),
      theme: localStorage.getItem("theme"),
      fontSize: localStorage.getItem("fontSize"),
      src_code: "",
      input: localStorage.getItem("input"),
      running: false,
    },
    tabIndex: "1",
    problem: {
      problem_id: "12345",
      description: "<p>abcd</p>",
      level: "medium",
      title: "title",
      likes: "69",
    },
    submissions: [
      {
        id: "6473",
        status: "accepted",
        timeline: "timeline",
        language: "cpp",
      },
      {
        id: "6474",
        status: "accepted",
        timeline: "timeline",
        language: "cpp",
      },
    ],
  });
  const [data1, setData1] = useState({
    values: {
      language: localStorage.getItem("language"),
      theme: localStorage.getItem("theme"),
      fontSize: localStorage.getItem("fontSize"),
      src_code: "",
      input: localStorage.getItem("input"),
      running: false,
    },
    tabIndex: "1",
  });
  const update = () => {
    setData({ ...data });
    // console.log(data);
  };

  const submitCode = async () => {
    data.values.running = true;
    update();
    try {
      const response = await axios.post(serverURL + "submitCode", {
        problem: { ...data.problem },
        user_name: user ? user.user_name : "",
        language: data.values.language,
        src_code: data.values.src_code,
      });
      console.log(response.data);
      const result = response.data;
      data.submissions.push(result);
      update();
    } catch (error) {
      console.log(error);
      alert("Something Went wrong");
    }
    data.values.running = false;
    data.tabIndex = "2";
    update();
  };

  useEffect(() => {
    console.log("abcd");
    const getProblem = async () => {
      try {
        const response = await axios.post(serverURL + "getProblem", {
          problem_id: params.id.toString(),
          user_name: user ? user.user_name : "",
        });
        setData({ ...data1, ...response.data });
      } catch (error) {
        console.log(error);
      }
    };
    getProblem();
  }, []);

  return !user ? (
    <Navigate to={"/login"} />
  ) : (
    <div className="main-problem">
      <ProblemComponent data={data} update={update} />
      <IDEComponent
        values={data.values}
        update={update}
        submitCode={submitCode}
      />
    </div>
  );
}

export default Problem;
