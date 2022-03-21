import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, TextField } from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/ext-language_tools";
import axios from "axios";
import LoadingProfile from "../components/LoadingProfile";
import NotFound from "../components/NotFound";
import "./submissionsDetails.css";

const languages = ["javascript", "java", "c_cpp", "python"];

const serverURL = "http://localhost:2000/";

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal",
];

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));

const getColor = (status) => {
  if (status === "accepted") return "#92d7fd";
  else if (status === "compilation error") return "#9e9b0a";
  else return "red";
};

function SubmissionsDetails() {
  const params = useParams();
  //   console.log(params.id);
  const [Status, setStatus] = useState({
    loading: true,
    found: false,
  });
  const [Values, setValues] = useState(null);
  useEffect(() => {
    const getSubDetails = async () => {
      try {
        const response = await axios.post(serverURL + "getSubDetails", {
          submission_id: params.id,
        });
        console.log(response);
        setValues(response.data.result);
        Status.found = true;
        setStatus({ ...Status });
      } catch (error) {
        console.log(error);
        // alert("Something Went Wrong");
      }
      Status.loading = false;
      setStatus({ ...Status });
    };
    getSubDetails();
  }, []);

  return Status.loading ? (
    <LoadingProfile />
  ) : !Status.found ? (
    <NotFound />
  ) : (
    <div className="main-submissions-details">
      <Container fixed sx={{ minWidth: "800px" }}>
        <div
          style={{ borderBottom: "1px solid #eaeaea", paddingBottom: "15px" }}
        >
          <div style={{ fontWeight: "500" }}>
            <Link to={"/problem/" + Values.problem_id}>{Values.title}</Link>
          </div>
          <div style={{ marginTop: "18px", fontSize: "20px" }}>
            Submission Details
          </div>
          <div style={{marginTop:'7px'}}>
            <span style={{ fontSize: "14px" }}>Status: </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: getColor(Values.status),
              }}
            >
              {Values.status}
            </span>
          </div>
        </div>
        <TextField
          sx={{ mt: "20px" }}
          id="outlined-multiline-static"
          label="User Output"
          multiline
          rows={4}
          fullWidth
          disabled
          value={Values.user_output}
        />
        <TextField
          sx={{ mt: "20px" }}
          id="outlined-multiline-static"
          label="Expected Output"
          multiline
          rows={4}
          fullWidth
          disabled
          value={Values.expected_output}
        />
        <div
          style={{
            marginTop: "20px",
            borderTop: "1px solid #eaeaea",
            paddingTop: "15px",
            paddingBottom: "45px",
          }}
        >
          <div>
            <span style={{}}>Submitted Code: </span>
          </div>
          <div style={{ marginTop: "8px" }}>
            <span style={{ fontSize: "14px" }}>
              Language:{" "}
              <span style={{ fontSize: "12px", fontWeight: "500" }}>
                {Values.language}
              </span>
            </span>
          </div>
          <AceEditor
            style={{ border: "1px solid #eaeaea" }}
            value={Values.src_code}
            className="editor"
            height="535px"
            width="100%"
            mode={Values.language}
            theme={"xcode"}
            name="UNIQUE_ID_OF_DIV_2"
            editorProps={{ $blockScrolling: true }}
            fontSize={12}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
              readOnly: true,
            }}
          />
        </div>
      </Container>
    </div>
  );
}

export default SubmissionsDetails;
