import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import ImageList from "./StandardImageList";
import MainAppBar from "../MainAppBar";
import theme from "../Landing/theme";
import React, { useState, useEffect, Component } from "react";
import SimpleDialog from "./SimpleDialog";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import * as API from "../../api";

export default function UserProfile() {
  const { user } = useAuth();

  const location = useLocation();

  const [imageListType, setImageListType] = useState("profile");
  const [followageInfo, setFollowageInfo] = useState<{ [key: string]: any }>(
    {}
  );
  const [numFollowers, setNumFollowers] = useState("");
  const [numFollowing, setNumFollowing] = useState("");

  const [selectedBtn, setSelectedBtn] = React.useState(1);

  const [followBtn, setFollowBtn] = React.useState(false); //False --> Follow, True --> Unfollow

  const showSavedImageList = () => {
    setImageListType("saved");
    setSelectedBtn(2);
  };

  const showProfileImageList = () => {
    setImageListType("profile");
    setSelectedBtn(1);
  };

  //console.log(API);
  /*useEffect(() => {
    const params = new URLSearchParams();
    params.append("user_id", user.user_id);
    API.subscribe(({ result }) => {
      console.log(result);

      fetch(`${API.API_URL}/api/receive`, {
        method: "POST",
        body: params,
      })
        .then((res) => {
          res.json().then((data) => {
            console.log(data);
          });
          //console.log(res.json());
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [API.socket]);*/

  /*const API_URL = "http://localhost:5555";
  const name = "notifications_" + user.user_id;
  const socket = clientSocket(`${API_URL}/${name}`);

  //const subscribe = (newCallback: (arg0: any) => void) => {
  socket.on("/calc", (result) => {
    console.log(result);
    //result = JSON.parse(result);
    //newCallback(result);
  });
  //};*/
  /* useEffect(() => {
    const params = new URLSearchParams();
    params.append("followed_user_id", userData.user_id);
    params.append("following_user_id", user.user_id);
    console.log(Object.keys(userData).length !== 0);
    if (Object.keys(userData).length !== 0) {
      fetch(`${API.API_URL}/api/calc/sum`, {
        method: "POST",
        body: params,
      }).then((res) => {

        res.json().then((valentano) => {
          console.log(valentano);
        });
      });
    }
  }, [followBtn]);*/

  const handleFollowBtn = () => {
    axios.post("http://localhost:8000/follows", {
      user_id1: user.user_id,
      user_id2: userData.user_id,
    });

    const params = new URLSearchParams();
    params.append("destination_user_id", userData.user_id);
    params.append("origin_user_id", user.user_id);
    params.append("notification_type", "follow");
    params.append("username", user.username);
    params.append("profile_pic", user.profile_pic);
    params.append("post_id", "");
    params.append("post_title", "");

    if (Object.keys(userData).length !== 0 && followBtn === false) {
      axios
        .post("http://localhost:8000/follow_notification", {
          destination_user_id: userData.user_id,
          origin_user_id: user.user_id,
          notification_type: "follow",
          username: user.username,
          profile_pic: user.profile_pic,
          post_id: "",
          post_title: "",
        })
        .then(function (response) {
          console.log(response.data);
          fetch(`${API.API_URL}/api/calc/sum`, {
            method: "POST",
            body: params,
          }).then((res) => {
            res.json().then((valentano) => {
              console.log(valentano);
            });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    setFollowBtn(!followBtn);
  };

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [selectedTitle, setSelectedTitle] = React.useState("");
  const [userData, setUserData] = React.useState<{ [key: string]: any }>({});

  const handleClickOpenFollowers = () => {
    setOpen(true);
    setSelectedValue(followageInfo["followers_info"][0]["followers"]);
    setSelectedTitle("People following you:");
    console.log(followageInfo["followers_info"][0]["followers"]);
  };

  const handleClickOpenFollowing = () => {
    setOpen(true);
    setSelectedValue(followageInfo["following_info"][0]["following"]);
    setSelectedTitle("People you follow:");
    console.log(followageInfo["following_info"][0]["following"]);
  };

  const handleClose = (value: any[]) => {
    setOpen(false);
    //setSelectedValue(value);
  };

  useEffect(() => {
    if (location.state != user.user_id) {
      axios
        .get("http://localhost:8000/user/" + location.state)
        .then((response) => {
          //console.log("_________RESPONSE____________");
          setUserData(response.data[0]);
          //getFollowerInfo();
        });
    } else {
      setUserData({
        user_id: user.user_id,
        username: user.username,
        profile_pic: user.profile_pic,
      });
      //getFollowerInfo();
    }
    console.log(userData);
  }, [location.state]);

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      axios
        .get("http://localhost:8000/followageinfo/" + userData.user_id)
        .then((response) => {
          //console.log("_________RESPONSE____________");
          //console.log(response.data[0]);
          setFollowageInfo(response.data[0]);
          setNumFollowers(
            response.data[0]["followers_info"][0]["num_followers"] == 1
              ? response.data[0]["followers_info"][0]["num_followers"] +
                  "  Follower"
              : response.data[0]["followers_info"][0]["num_followers"] +
                  "  Followers"
          );
          setNumFollowing(
            response.data[0]["following_info"][0]["num_following"] +
              "  Following"
          );
          response.data[0]["followers_info"][0]["followers"].forEach(
            (follower: { user_id: any }) => {
              if (follower.user_id == user.user_id) {
                setFollowBtn(true);
              }
            }
          );
        });
    }
  }, [userData, followBtn]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 8 }}></Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Avatar
            alt="Remy Sharp"
            src={userData.profile_pic}
            sx={{ width: 128, height: 128 }}
          />
        </Box>{" "}
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          sx={{ mb: 2, mt: { sx: 1, sm: 2 } }}
        >
          {userData.username}
        </Typography>
        <Container
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            width: 1 / 5,
          }}
        >
          <Box
            sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}
          >
            <Button color="inherit" onClick={handleClickOpenFollowers}>
              {numFollowers}
            </Button>
            <Divider orientation="vertical" flexItem />
            <Button color="inherit" onClick={handleClickOpenFollowing}>
              {numFollowing}
            </Button>
          </Box>
        </Container>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            mt: 5,
            mb: 5,
          }}
        >
          {" "}
          {userData.user_id == user.user_id ? (
            <ButtonGroup
              color="secondary"
              aria-label="medium secondary button group"
              size="large"
            >
              <Button
                variant={selectedBtn === 1 ? "contained" : "outlined"}
                onClick={showProfileImageList}
              >
                Your Pics
              </Button>
              <Button
                variant={selectedBtn === 2 ? "contained" : "outlined"}
                onClick={showSavedImageList}
              >
                Saved
              </Button>
            </ButtonGroup>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleFollowBtn}
            >
              {" "}
              {followBtn ? "Unfollow" : "Follow"}
            </Button>
          )}
        </Box>
        <Box sx={{ mr: 3, ml: 3 }}>
          <ImageList
            list_type={imageListType}
            user_id={userData.user_id}
          ></ImageList>
        </Box>
        <Box>
          <br />
          <SimpleDialog
            title={selectedTitle}
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </Box>
      </main>
    </ThemeProvider>
  );
}
