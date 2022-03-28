import React from "react";
import { Link } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import "./userContainer.css";

function UserWidget() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signOut = () => {
    console.log("logout clicked");
    localStorage.removeItem("Token");
    console.log(user);
    dispatch(logout());
    console.log(user);
  };
  // const defAvatarImage =
  // "https://media-exp1.licdn.com/dms/image/C5603AQG1B8pmz0jpvg/profile-displayphoto-shrink_400_400/0/1637489130518?e=1650499200&v=beta&t=ZIbuzQ7DX7cqJ8cXs8OzTm1NGKLpL6qinBtZiiZk9SM";

  return (
    <>
      <div className="user_container">
        {/* <div className="dropdown me-3" id="user-widget">
         
          <img
            className="rounded-circle"
            src={user.imageURL}
            alt="me"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            width="40"
            height="40"
          />
          <ul
            className="dropdown-menu dropdown-menu-dark"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <Link className="dropdown-item" to={`/${user.user_name}`}>
                {user.general_name}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/mySubmissions">
                Submissions
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/">
                Progress
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/">
                Sign Out
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/">
                Something else here
              </Link>
            </li>
          </ul>
        </div> */}
        <Link to={`/${user.user_name}`}>
          <Avatar
            alt={user.user_name}
            src={user.imageURL}
            sx={{ width: 40, height: 40 }}
          />
        </Link>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm mx-2"
          onClick={signOut}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default UserWidget;
