import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import draftToHtml from "draftjs-to-html";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import parse from "html-react-parser";
import axios from "axios";
import "./AddProblem.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function AddProblem() {
  const serverURL = "http://localhost:2000/";

  const [ProblemDetails, setProblemDetails] = useState({
    title: "",
    description: "",
    level: "easy",
    tags: [],
    example_input: "",
    example_output: "",
    test_input: "",
    test_output: "",
  });

  const handleChange = (prop) => (event) => {
    setProblemDetails({ ...ProblemDetails, [prop]: event.target.value });
    // console.log(ProblemDetails);
  };

  const valid = () => {
    if (ProblemDetails.title === "") return false;
    if (
      ProblemDetails.description === "" ||
      editorState.getCurrentContent().getPlainText() === ""
    )
      return false;
    if (ProblemDetails.example_input === "") return false;
    if (ProblemDetails.example_output === "") return false;
    if (ProblemDetails.test_input === "") return false;
    if (ProblemDetails.test_output === "") return false;
    return 1;
  };

  const submit = async () => {
    try {
      // console.log(ProblemDetails);
      if (!valid()) {
        alert("All fields are required");
        return;
      }
      const response = await axios.post(serverURL + "addProblem", {
        ...ProblemDetails,
      });
      console.log(response.data);
      if (!(response.data && response.data.success)) {
        alert("Something Went Wrong");
        return;
      }
      alert("Added Successfully");
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    }
  };

  const tags = ["DP", "Array", "Maths", "Greedy"];
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // const [html, setHtml] = useState(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  useEffect(() => {
    // console.log(editorState.getCurrentContent().getPlainText());
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setProblemDetails({
      ...ProblemDetails,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  }, [editorState]);
  return (
    <div
      className="main-addProblem"
      style={{ width: "80%", margin: "57px auto", maxWidth: "650px" }}
    >
      <h1>React Editors</h1>
      <h2>Start editing to see some magic happen!</h2>
      <TextField
        id="outlined-basic"
        label="Question Title"
        variant="outlined"
        fullWidth
        sx={{ mb: 5 }}
        onChange={handleChange("title")}
      />
      <div
        style={{
          border: "1px solid black",
          padding: "2px",
          minHeight: "400px",
        }}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </div>
      <div className="show-problem">
        {parse(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
      </div>
      <div className="diff-tag-container">
        <FormControl fullWidth>
          <InputLabel>Level</InputLabel>
          <Select
            value={ProblemDetails.level}
            label="Level"
            onChange={handleChange("level")}
          >
            <MenuItem value={"easy"}>Easy</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ ml: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            multiple
            value={ProblemDetails.tags}
            onChange={(e) => {
              const {
                target: { value },
              } = e;
              setProblemDetails({
                ...ProblemDetails,
                tags: typeof value === "string" ? value.split(",") : value,
              });
            }}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={ProblemDetails.tags.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TextField
        id="outlined-multiline-static"
        label="Example Input"
        multiline
        rows={4}
        fullWidth
        onChange={handleChange("example_input")}
      />
      <TextField
        id="outlined-multiline-static"
        label="Example Output"
        multiline
        rows={4}
        fullWidth
        onChange={handleChange("example_output")}
      />
      <TextField
        id="outlined-multiline-static"
        label="Test Input"
        multiline
        rows={4}
        fullWidth
        onChange={handleChange("test_input")}
      />
      <TextField
        id="outlined-multiline-static"
        label="Test Output"
        multiline
        rows={4}
        fullWidth
        onChange={handleChange("test_output")}
      />
      <div className="add-prob-btn">
        <Button onClick={submit} variant="contained">
          Add Problem
        </Button>
      </div>
    </div>
  );
}

export default AddProblem;
