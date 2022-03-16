import { React, useState } from "react";
import AceEditor from "react-ace";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/ext-language_tools";
import "./IDEComponent.css";
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
function IDEComponent(props) {
  const { values, update,submitCode } = props;
  return (
    <div className="main-ide-component">
      <div className="items-ide">
        <div className="dropdown-items">
          <div className="language-selector">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.language}
                label="Language"
                onChange={(e)=>{
                  values.language=e.target.value
                  update()
                }}
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
                onChange={(e)=>{
                  values.theme=e.target.value
                  update()
                }}
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
                onChange={(e)=>{
                  values.fontSize=e.target.value
                  update()
                }}
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
      </div>
      <AceEditor
        value={values.src_code}
        className="editor"
        height="535px"
        width="765px"
        mode={values.language}
        theme={values.theme}
        onChange={(newValue)=>{
          values.src_code=newValue
          update()
        }}
        name="UNIQUE_ID_OF_DIV_1"
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
      <div className="submit-btn-container">
        <Button
          disabled={values.running}
          variant="contained"
          color="success"
          onClick={submitCode}
          endIcon={
            values.running ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              <CodeRoundedIcon />
            )
          }
        >
          {values.running ? "Running" : "Submit Code"}
        </Button>
      </div>
    </div>
  );
}

export default IDEComponent;
