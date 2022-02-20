import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Link } from "react-router-dom";
import UserWidget from "./UserWidget";
import { useEffect } from "react";

function Navbar() {
  const user = useSelector(selectUser);

  // useEffect(() => {
  //   console.log(user);
  // })

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            bruteForce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/problemset"
                >
                  Problems
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/contest">
                  Contest
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/code-editor">
                  Online IDE
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/searchuser">
                  Search User
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              {!user ? (
                <>
                  <div className="d-flex flex-row">
                    <Link to="/login">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Login In
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm mx-2"
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <UserWidget />
              )}
              {/* <UserWidget/> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
