import { React, useState,useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryIcon from "@mui/icons-material/Inventory";
import ProblemDescription from "./ProblemDescription";
import SubmissionSummary from "./SubmissionSummary";
import "./ProblemComponent.css";

function ProblemComponent(props) {
  const {data,update,toogleLike}=props
 
  const handleChange = (event, newValue) => {
    // setTabIndex(newValue);
    data.tabIndex=newValue
    update()
  };

  return (
    <div className="main-problem-component">
      <TabContext value={data.tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", padding: 0 }}>
          <TabList
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="lab API tabs example"
            variant="fullWidth"
          >
            <Tab
              label={
                <span
                  style={{
                    color: data.tabIndex === "1" ? "#fe5f75" : "",
                    fontSize: "12px",
                  }}
                >
                  <DescriptionIcon sx={{ fontSize: "16px" }} />
                  <span style={{ marginLeft: "5px", paddingTop: "3px" }}>
                    Description
                  </span>
                </span>
              }
              value="1"
            />
            <Tab
              label={
                <span
                  style={{
                    color: data.tabIndex === "2" ? "green" : "",
                    fontSize: "12px",
                  }}
                >
                  <InventoryIcon sx={{ fontSize: "16px" }} />
                  <span style={{ marginLeft: "5px", paddingTop: "3px" }}>
                    Submissions
                  </span>
                </span>
              }
              value="2"
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: "5px" }}>
          <ProblemDescription problem={data.problem} update={update} liked={data.liked} toogleLike={toogleLike} />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <SubmissionSummary submissions={data.submissions}/>
        </TabPanel>
        {/* <TabPanel value="3" sx={{ padding: 0 }}>
          pqr
        </TabPanel> */}
      </TabContext>
    </div>
  );
}

export default ProblemComponent;
