import React from "react";
import { Link } from "react-router-dom";

function UserWidget() {
  const defAvatarImage =
    "https://media-exp1.licdn.com/dms/image/C5603AQG1B8pmz0jpvg/profile-displayphoto-shrink_400_400/0/1637489130518?e=1650499200&v=beta&t=ZIbuzQ7DX7cqJ8cXs8OzTm1NGKLpL6qinBtZiiZk9SM";

  return (
    <>
      <div className="user_container">
        <div className="dropdown me-3" id="user-widget">
          {/* <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          
        </button> */}
          <img
            className="rounded-circle"
            src={defAvatarImage}
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
              <Link className="dropdown-item" to="/">
                UserName
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/">
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
        </div>
        <Link id="logout-btn" to="/">
          <button type="button" class="btn btn-outline-danger btn-sm mx-2">
            Logout
          </button>
        </Link>
      </div>
    </>
  );
}

export default UserWidget;
