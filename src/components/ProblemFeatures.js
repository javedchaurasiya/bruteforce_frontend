import { React, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import "./ProblemFeatures.css";

function ProblemFeatures(props) {
  const { problem } = props;
  var color;
  if (problem.level == "easy") color = "#4fcae8";
  else if (problem.level == "medium") color = "#ffd252";
  else color = "#ff2d55";

  const [liked, setLiked] = useState(false);
  return (
    <div className="problem-features">
      <span style={{ fontSize: "16px", fontWeight: "500" }}>
        {problem.title}
      </span>
      <div>
        <span
          style={{
            fontSize: "13px",
            fontWeight: "500",
            color: color,
            marginLeft: "0px",
          }}
        >
          {problem.level}
        </span>
        <span style={{ fontSize: "13px", marginLeft: "15px" }}>
          <span
            className="prob-icons"
            style={{ color: "red", marginRight: "5px" }}
          >
            {!liked ? (
              <FavoriteBorderIcon sx={{ fontSize: "19px" }} />
            ) : (
              <FavoriteIcon sx={{ fontSize: "19px" }} />
            )}
          </span>
          {problem.likes}
        </span>
        <span style={{ fontSize: "13px", marginLeft: "15px" }}>
          <span
            className="prob-icons"
            style={{ marginRight: "5px" }}
            onClick={() => {
              navigator.clipboard.writeText(
                "http://localhost:3000/problem/" + problem.problem_id
              );
              alert('Copied')
            }}
          >
            <ShareOutlinedIcon sx={{ fontSize: "19px" }} />
          </span>
          Share
        </span>
      </div>
    </div>
  );
}

export default ProblemFeatures;
