import { React, useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import LoadingProfile from "../components/LoadingProfile";
import NotFound from "../components/NotFound";
import { Link } from "react-router-dom";

const serverURL = "http://localhost:2000/";

function HomePage() {
  const [Status, setStatus] = useState({
    loading: true,
    found: false,
  });
  const [Data, setData] = useState(null);

  useEffect(() => {
    const getHomePageData = async () => {
      try {
        const response = await axios.get(serverURL + "homePage");
        console.log(response.data);
        setData({ ...response.data.result });
        Status.found = true;
      } catch (error) {
        alert("Something went wrong");
        console.log(error);
      }
      Status.loading = false;
      setStatus({ ...Status });
    };
    getHomePageData();
  }, []);

  const date = new Date();

  function convertDay(x) {
    if (x === 1) return "Monday";
    else if (x === 2) return "Tuesday";
    else if (x === 3) return "Wednesday";
    else if (x === 4) return "Thursday";
    else if (x === 5) return "Friday";
    else if (x === 6) return "Saturday";
    return "Sunday";
  }

  // const generateUserList = () => {
  //   const users = [
  //     { name: "Ritik" },
  //     { name: "Ritu Raj" },
  //     { name: "TOurist" },
  //     { name: "Shobhit" },
  //     { name: "Rishab Kedia" },
  //     { name: "ERrichto" },
  //     { name: "gareboooo" },
  //     { name: "Lucy" },
  //     { name: "Pro gamer 247" },
  //     { name: "dnce" },
  //   ];
  //   // for(var i=1;i<=10;i++){
  //   //   users.push({'name': `test${i}`});
  //   // }
  //   return users;
  // };

  const renderUsersList = (users) =>
    users.map((user) => (
      <li key={user.user_name}>
        <div className="user-container"><Link to={`/${user.user_name}`}>{user.name}</Link></div>
      </li>
    ));

  const renderContent = () => (
    <div className="content-container">
      Bruteforce is a multipurpose coding platform designed for enthusiastic
      learners looking for a coding platform to learn and improve their coding
      skills while solving coding questions related to{" "}
      <span style={{ color: "blue" }}>Data structures</span> and{" "}
      <span style={{ color: "blue" }}>Algorithms</span>. Coders can use it to
      check the working of their code and test it's output or they can simply
      solve the coding problems from our own Problem set.
      <br /> <br />
      <h2>Features</h2>
      <ul>
        <li>Pre written coding questions</li>
        <li>Online IDE</li>
        <li>User profile to track Progress</li>
        <li>Heatmap of Sumbissions</li>
        <li>Like system for feedback and engagement</li>
        <li>Beginner friendly UI</li>
        <li>Search users feature</li>
      </ul>
      And the list goes on!!!!
      <br /> <br />
      Users interested in <span style={{ color: "blue" }}>
        contributing
      </span>{" "}
      can do so by providing questions with their test cases and output included
      and mailing those questions (in proper format) to one of our admins. If
      all things are well and the question isn't already in our list, we will
      add it to the question bank and give contribution points to the user.
      <br />
      <br />
      If you are new to programming we suggest you first start with learning
      more about what programming is, followed by learning Data-structures and
      Algorithms and then move on to solving problems. Here's a video to get
      started with programming,
      <br />
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/zOjov-2OZ0E"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <br />
      <br />
      Happy coding !!!
    </div>
  );

  return Status.loading ? (
    <LoadingProfile />
  ) : !Status.found ? (
    <NotFound />
  ) : (
    <div className="homepage-container">
      <div className="left-container">
        <div className="title">
          <span id="brute">Brute</span> <span id="force">Force</span>
        </div>
        <div className="Tcontent">{renderContent()}</div>
      </div>
      <div className="right-container">
        <div className="qotd">
          <div className="head">Question Of The Day!</div>
          <div className="question-name">
            <a id="q" href="http://localhost:3000/problem/1647784471881">
              Hidden Numbers
            </a>
          </div>
          <div className="date-container">
            {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}
            <br />
            {convertDay(date.getDay())}
          </div>
        </div>
        <div className="most-submissions">
          <div className="head">Most Submissions</div>
          <ol className="List-container">
            {renderUsersList(Data.most_subs)}
          </ol>
        </div>
        <div className="most-contributions">
          <div className="head">Top Contributor</div>
          <ol className="List-container">
            {renderUsersList(Data.most_contri)}
          </ol>
        </div>
        <div className="admins">
          <div className="head">Admins</div>
          <ol className="List-container">
            <li><Link to="/ritu1">Ritu Raj shandilya</Link></li>
            <li><Link to="/rit">Ritik Dhasmana</Link></li>
            <li>Shobhit Belwal</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
