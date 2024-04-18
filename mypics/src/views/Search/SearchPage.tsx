import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import React, { createContext, useCallback, useEffect, useState } from "react";
import theme from "../Landing/theme";
import MainAppBar from "../MainAppBar";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import MasornyImageListSearch from "./MasornyImageListSearch";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import ListUsers from "./ListUsers";

export default function SearchPage() {
  const [imageListType, setImageListType] = useState("popular");

  //questa cosa serve per portarsi appresso le cose da una pagina all'altra
  const location = useLocation();
  console.log("LOCATION.STATE");
  console.log(location.state);

  const { user } = useAuth();

  const showSearchedImageList = () => {
    setImageListType("followed");
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={"span"}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 7,
              pb: 3,
            }}
          ></Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                //aria-label="basic tabs example"
                centered
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab label="Posts" {...a11yProps(0)} />
                <Tab label="Users" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Box sx={{ mr: 3, ml: 3 }}>
                <MasornyImageListSearch
                  searchInput={location.state}
                ></MasornyImageListSearch>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ListUsers searchInput={location.state}></ListUsers>
            </TabPanel>
          </Box>
        </main>
    </ThemeProvider>
  );
}
