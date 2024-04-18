import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as LinkButton } from "react-router-dom";
import AppBar from "../components/Landing/AppBar";
import Toolbar from "../components/Landing/Toolbar";
import { alpha, styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Popover from "@mui/material/Popover";
import NotificationList from "./NotificationList";
import { socket } from "../api";
import React, { useState, useEffect, Component } from "react";
import * as API from "../api";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60ch", //20
    },
  },
}));

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function MainAppBar() {
  const { user } = useAuth();

  const [searchInput, setSearchInput] = React.useState("");
  const [searchResultImageList, setSearchResultImageList] = React.useState<
    any[]
  >([]);

  /*const handleSearchInput = async () => {
    console.log(searchInput);
    await axios
      .post("http://localhost:8000/search/", {
        searchInput: searchInput,
        user_id: user.user_id,
      })

      .then(function (response) {
        console.log(response.data);
        setSearchResultImageList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };*/

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    let notification_ids: any[] = [];
    notificationsArray[0].not_read_notifications.forEach((elem: any) => {
      notification_ids.push(elem[0].notification_id);
    });
    axios
      .put("http://localhost:8000/notification", {
        notification_ids: notification_ids,
      })
      .then(function () {
        axios
          .get("http://localhost:8000/notification/" + user.user_id)
          .then(function (response) {
            console.log(response.data);
            setNotificationsArray(response.data);
            setNotificationCount(
              response.data[0].not_read_notifications.length
            );
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const navigateTo = useNavigate();

  //socket.io stuff
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  const [notificationsArray, setNotificationsArray] = useState<any>([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/notification/" + user.user_id)
      .then(function (response) {
        console.log(response.data);
        setNotificationsArray(response.data);
        setNotificationCount(response.data[0].not_read_notifications.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("user_id", user.user_id);

    fetch(`${API.API_URL}/api/receive`, {
      method: "POST",
      body: params,
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    /*const params = new URLSearchParams();
    params.append("user_id", user.user_id);

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
      });*/
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(result: any) {
      result = JSON.parse(result);
      //console.log(result);
      axios
        .get("http://localhost:8000/notification/" + user.user_id)
        .then(function (response) {
          console.log(response.data);
          setNotificationsArray(response.data);
          setNotificationCount(response.data[0].not_read_notifications.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("abcdef95", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("abcdef95", onFooEvent);
    };
  }, []);

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link
          variant="h6"
          underline="none"
          color="inherit"
          href="/homepage/"
          sx={{ fontSize: 24 }}
        >
          {"MyPics"}
        </Link>
        <Box sx={{ display: { xs: "none", md: "flex", margin: 10 } }}>
          <Tooltip title="Homepage">
            <IconButton
              size="large"
              aria-label="settings of account"
              color="inherit"
              href="/homepage/"
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add a pic">
            <IconButton
              size="large"
              edge="end"
              aria-label="add a pic"
              aria-haspopup="true"
              color="inherit"
              href="/add-pic/"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Search>
          <Button
            component={LinkButton}
            to="/searchpage"
            state={searchInput}
            variant="contained"
            color="secondary"
            //type="submit"
          >
            Search
          </Button>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={handleClick}
          >
            <Badge badgeContent={notificationCount} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            PaperProps={{
              elevation: 8,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.8,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: 305,
                  width: 15,
                  height: 15,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <NotificationList
              notificationsArray={notificationsArray}
              handleClose={handleClose}
            ></NotificationList>
          </Popover>
          <Tooltip title="Settings">
            <IconButton
              size="large"
              aria-label="settings of account"
              color="inherit"
              onClick={() => {
                navigateTo("/user-settings/", {
                  //COPIARE QUESTA COSA ANCHE SOTTO NELL'ICONA PER ANDARE ALLA PAGINA DELL'UTENTE
                  //IN MODO DA PORTARSI APPRESSO IL NOME DELL'UTENTE DA USARE IN QUELLA PAGINA
                });
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <LinkButton
            to="/user-profile/"
            state={user.user_id}
            style={{ color: "white" }}
          >
            <Tooltip title="Profile">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </LinkButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
