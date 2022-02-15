// import { useEffect } from 'react';
import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Contest from "./pages/Contest";
import ProblemSet from "./pages/ProblemSet";
import SearchUser from "./pages/SearchUser";
import HomePage from "./pages/HomePage";

function App() {
  const user = useSelector(selectUser);

  return (
    <Router>
      <div className="App">
        
          <Navbar />
          <Routes>
            <Route path="/problemset" exact element={<ProblemSet />} />
            <Route path="/contest" exact element={<Contest />} />
            <Route path="/searchuser" exact element={<SearchUser />} />
            <Route path="/" exact element={<HomePage />} />
          </Routes>
        </div>
      
    </Router>
  );
}

export default App;
