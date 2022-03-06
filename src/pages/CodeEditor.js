import React, { useState, useEffect } from "react";
import axios from "axios";
import "./codeEditor.css";
import Container from "@mui/material/Container";
// import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AceEditor from "react-ace";
import TextField from "@mui/material/TextField";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/ext-language_tools";
// import "brace/ext/language_tools";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";

const languages = ["javascript", "java", "c_cpp", "python"];

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
const fonts = [8, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));

/*eslint-disable no-alert, no-console */
function CodeEditor() {
  // function onChange(newValue) {
  //   // console.log("change", newValue);
  // }
  const [values, setValues] = useState({
    language: localStorage.getItem("language"),
    theme: localStorage.getItem("theme"),
    fontSize: localStorage.getItem("fontSize"),
    src_code: localStorage.getItem("src_code"),
    input: localStorage.getItem("input"),
    running: false,
  });
  const [output, setOutput] = useState("");

  // useEffect(() => {
  //   setValues({...values,src_code:src_code})
  // }, [values.src_code]);

  const handleChange = (prop) => (event) => {
    console.log(event);
    setValues({ ...values, [prop]: event.target.value });
    localStorage.setItem(prop, event.target.value);
    console.log(localStorage.getItem(prop));
  };
  const onChange = (newValue) => {
    console.log(newValue);
    setValues({ ...values, src_code: newValue });
    localStorage.setItem("src_code", newValue);
    console.log(localStorage.getItem("src_code"));
  };

  const getLangCode = () => {
    const x = values.language;
    if (x === "c_cpp") return { lang: "cpp17", version: "0" };
    if (x === "java") return { lang: "java", version: "4" };
    if (x === "python") return { lang: "python3", version: "0" };
    return { lang: "nodejs", version: "4" };
  };

  const serverUrl = "http://localhost:2000/";

  const runCode = async () => {
    setValues({ ...values, running: true });
    try {
      const { lang, version } = getLangCode();
      const payload = {
        language: lang,
        version,
        src_code: values.src_code,
        input: values.input,
      };
      console.log(payload);
      const response = await axios.post(serverUrl + "compile", payload);
      if (response) setValues({ ...values, running: false });
      console.log(response);
      setOutput(response.data.output);
    } catch (error) {
      console.log(error);
      setValues({ ...values, running: false });
      alert("Something Went Wrong");
    }
  };

  return (
    <div className="code-editor-body">
      <Container fixed sx={{ background: "#f5f5f5", minWidth: "800px" }}>
        <div className="items">
          <div className="dropdown-items">
            <div className="language-selector">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.language}
                  label="Language"
                  onChange={handleChange("language")}
                >
                  {languages.map((language) => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="theme-selector">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Theme</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.theme}
                  label="Theme"
                  onChange={handleChange("theme")}
                >
                  {themes.map((theme) => (
                    <MenuItem key={theme} value={theme}>
                      {theme}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="font-selector">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">FontSize</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.fontSize}
                  label="FontSize"
                  onChange={handleChange("fontSize")}
                >
                  {fonts.map((font) => (
                    <MenuItem key={font} value={font}>
                      {font}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <AceEditor
            value={values.src_code}
            className="editor"
            height="600px"
            width="725px"
            mode={values.language}
            theme={values.theme}
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            fontSize={values.fontSize}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
          <div className="btn-container">
            <Button
              disabled={values.running}
              variant="contained"
              color="success"
              onClick={runCode}
              endIcon={
                values.running ? (
                  <CircularProgress color="inherit" size={25} />
                ) : (
                  <CodeRoundedIcon />
                )
              }
            >
              {values.running ? "Running" : "Run"}
            </Button>
          </div>
          <div className="input-container">
            <TextField
              value={values.input}
              fullWidth
              id="outlined-multiline-static"
              label="Input"
              multiline
              rows={4}
              placeholder="Input Here"
              onChange={handleChange("input")}
            />
          </div>
          <div className="output-container">
            <TextField
              disabled
              fullWidth
              id="outlined-multiline-static"
              label="Output"
              multiline
              rows={4}
              placeholder="Output Here"
              value={output}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CodeEditor;
