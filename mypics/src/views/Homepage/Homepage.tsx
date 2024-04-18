import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import React, { createContext, useCallback, useEffect, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import theme from "../Landing/theme";
import MainAppBar from "../MainAppBar";
import MasornyImageList from "./MasornyImageList";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import * as API from "../../api";

export default function Homepage() {
  const [imageListType, setImageListType] = useState("popular");

  //questa cosa serve per portarsi appresso le cose da una pagina all'altra
  const location = useLocation();

  const { user } = useAuth();

  const [selectedBtn, setSelectedBtn] = React.useState(1);

  const showPopularImageList = () => {
    setImageListType("popular");
    setSelectedBtn(1);
  };

  const showFollowedImageList = () => {
    setImageListType("followed");
    setSelectedBtn(2);
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
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            mt: 3,
            mb: 4,
          }}
        >
          <ButtonGroup
            color="secondary"
            aria-label="medium secondary button group"
            size="large"
          >
            <Button
              variant={selectedBtn === 1 ? "contained" : "outlined"}
              onClick={showPopularImageList}
            >
              Popular
            </Button>
            <Button
              variant={selectedBtn === 2 ? "contained" : "outlined"}
              onClick={showFollowedImageList}
            >
              Following
            </Button>
          </ButtonGroup>
        </Box>
        <Box sx={{ mr: 3, ml: 3 }}>
          <MasornyImageList list_type={imageListType}></MasornyImageList>
        </Box>
      </main>
    </ThemeProvider>
  );
}
