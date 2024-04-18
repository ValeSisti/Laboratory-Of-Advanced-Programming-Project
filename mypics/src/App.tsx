import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import AddPic from "./views/AddPic/AddPic";
import Homepage from "./views/Homepage/Homepage";
import AppAppBar from "./views/Landing/AppAppBar";
import ForgotPassword from "./views/Landing/ForgotPassword";
import Home from "./views/Landing/Home";
import SignIn from "./views/Landing/SignIn";
import SignUp from "./views/Landing/SignUp";
import MainAppBar from "./views/MainAppBar";
import Pic from "./views/Pic";
import SearchPage from "./views/Search/SearchPage";
import UserProfile from "./views/User profile/UserProfile";
import UserSettings from "./views/UserSettings/UserSettings";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./views/Landing/theme";

function App() {
  const { user } = useAuth();
  console.log(user);
  if (user == null) {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <AppAppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up/" element={<SignUp />} />
            <Route path="/sign-in/" element={<SignIn />} />
            <Route path="/forgot-password/" element={<ForgotPassword />} />
          </Routes>
        </React.Fragment>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <MainAppBar />

          <Routes>
            <Route
              path="/homepage/"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-profile/"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-settings/"
              element={
                <ProtectedRoute>
                  <UserSettings />
                </ProtectedRoute>
              }
            />
            <Route path="/pic/" element={<Pic />} />
            <Route path="/add-pic/" element={<AddPic />} />
            <Route
              path="/searchpage/"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
