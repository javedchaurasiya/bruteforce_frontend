import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import "./userSearch.css";

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

function UserSearch({
  name = "Def name",
  imageURL = "",
  questions = 100,
  userName = "",
}) {
  const x = name;
  console.log(x);
  return (
    <Link to={"/" + userName}>
      <div className="search-item">
        <div className="avatar-container">
          <Avatar src={imageURL} {...stringAvatar(name)} />
        </div>
        <div className="details-container">
          <div className="name-field">
            {name}
          </div>
          <div className="solved">{questions} questions solved</div>
        </div>
      </div>
    </Link>
  );
}

export default UserSearch;
