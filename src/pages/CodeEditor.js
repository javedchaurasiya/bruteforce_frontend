import React, { useState } from "react";
import "./codeEditor.css";
import Container from "@mui/material/Container";
// import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
const languages = [
  "javascript",
  "java",
  "c_cpp",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css",
];

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
const fonts = [14, 16, 18, 20, 22, 24, 26, 28, 30];

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
    language: "c_cpp",
    theme: "xcode",
    fontSize: 14,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className="code-editor-body">
      <Container fixed sx={{ background: "#f5f5f5" }}>
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
                    <MenuItem value={language}>{language}</MenuItem>
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
                    <MenuItem value={theme}>{theme}</MenuItem>
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
                  onChange={handleChange('fontSize')}
                >
                  {fonts.map((font)=><MenuItem value={font}>{font}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
          </div>
          <AceEditor
            className="editor"
            height="600px"
            width="725px"
            mode={values.language}
            theme={values.theme}
            // onChange={onChange}
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
        </div>
      </Container>
    </div>
  );
}

export default CodeEditor;
