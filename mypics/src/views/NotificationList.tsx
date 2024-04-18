import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";

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

interface NotificationProps {
  notificationsArray: any;
  handleClose: any;
}

export default function NotificationList(props: NotificationProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // ! (riga 114 circa)  ! PORTARCI APPRESSO IL NOME E COGNOME DELL'UTENTE
  // ! INVECE DELL USERID e ANCHE LA FOTO SU CUI E' STATO MESSO IL MI PIACE O E' STATO MESSO IL COMMENTO

  console.log(props.notificationsArray);

  function handleNotificationClick(event: any, notification_type: string) {}

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ maxHeight: "90vh", overflow: "auto" }}
    >
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            //centered
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="Not read" {...a11yProps(0)} />
            <Tab label="Read" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {props.notificationsArray[0]["not_read_notifications"].length ===
          0 ? (
            <Box
              sx={{
                display: "flex",
                ml: 6,
              }}
            >
              <List
                sx={{
                  width: 400,
                  maxWidth: 400,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="center">
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Box
                          sx={{
                            display: "flex",
                            ml: -6,
                          }}
                        >
                          {"No notifications available"}
                        </Box>
                      </React.Fragment>
                    }
                    //secondary={}
                  />
                </ListItem>
              </List>
            </Box>
          ) : (
            <List
              sx={{ width: 400, maxWidth: 400, bgcolor: "background.paper" }}
            >
              {props.notificationsArray[0]["not_read_notifications"].map(
                (notification: any, index: any) => (
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      props.handleClose();
                    }}
                  >
                    <ListItem alignItems="center" divider key={index}>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Link
                              to={
                                notification[0].notification_type === "follow"
                                  ? "/user-profile/"
                                  : "/pic/"
                              }
                              state={
                                notification[0].notification_type === "follow"
                                  ? notification[0].origin_user_id
                                  : {
                                      datetime: notification[0].datetime,
                                      description: notification[0].description,
                                      fb_img_url: notification[0].fb_img_url,
                                      liked: notification[0].liked,
                                      num_likes: notification[0].num_likes,
                                      post_id: notification[0].post_id,
                                      profile_pic: notification[0].profile_pic,
                                      published: notification[0].published,
                                      saved: notification[0].saved,
                                      title: notification[0].title,
                                      user_id: notification[0].user_id,
                                      username: notification[0].username,
                                    }
                              } /* TODO: mettere il controllo come sopra in base al notification type, e se è follow ritornare l'user_id altrimenti tutte le info che vuole la pagina Pic  */
                              style={{
                                color: "black",
                                textDecoration: "none",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  ml: -3,
                                }}
                              >
                                <Avatar
                                  alt={"Profile Pic"}
                                  src={notification[0].origin_profile_pic}
                                />
                                <Box sx={{ ml: 1 }}>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component={"span"}
                                    variant="body1"
                                    color="text.primary"
                                  >
                                    {"User " + notification[0].origin_username}
                                  </Typography>
                                  {notification[0].notification_type ===
                                  "follow"
                                    ? " started following you"
                                    : notification[0].notification_type ===
                                      "like"
                                    ? ' liked your picture "' +
                                      notification[0].title +
                                      '"'
                                    : ' commented on your picture "' +
                                      notification[0].title +
                                      '"'}{" "}
                                </Box>
                              </Box>
                            </Link>
                          </React.Fragment>
                        }
                        //secondary={}
                      />
                    </ListItem>
                  </ListItemButton>
                )
              )}
            </List>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {props.notificationsArray[0]["read_notifications"].length === 0 ? (
            <Box
              sx={{
                display: "flex",
                ml: 6,
              }}
            >
              <List
                sx={{
                  width: 400,
                  maxWidth: 400,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="center">
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Box
                          sx={{
                            display: "flex",
                            ml: -6,
                          }}
                        >
                          {"No notifications available"}
                        </Box>
                      </React.Fragment>
                    }
                    //secondary={}
                  />
                </ListItem>
              </List>
            </Box>
          ) : (
            <List
              sx={{ width: 400, maxWidth: 400, bgcolor: "background.paper" }}
            >
              {props.notificationsArray[0]["read_notifications"].map(
                (notification: any, index: any) => (
                  <ListItemButton
                    key={index}
                    onClick={(event) =>
                      handleNotificationClick(
                        event,
                        notification.notification_type
                      )
                    }
                  >
                    <ListItem alignItems="center" divider key={index}>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Link
                              to={
                                notification[0].notification_type === "follow"
                                  ? "/user-profile/"
                                  : "/pic/"
                              }
                              state={
                                notification[0].notification_type === "follow"
                                  ? notification.origin_user_id
                                  : {
                                      datetime: notification[0].datetime,
                                      description: notification[0].description,
                                      fb_img_url: notification[0].fb_img_url,
                                      liked: notification[0].liked,
                                      num_likes: notification[0].num_likes,
                                      post_id: notification[0].post_id,
                                      profile_pic: notification[0].profile_pic,
                                      published: notification[0].published,
                                      saved: notification[0].saved,
                                      title: notification[0].title,
                                      user_id: notification[0].user_id,
                                      username: notification[0].username,
                                    }
                              }
                              style={{
                                color: "black",
                                textDecoration: "none",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  ml: -3,
                                }}
                              >
                                <Avatar
                                  alt={"Profile Pic"}
                                  src={notification[0].origin_profile_pic}
                                />
                                <Box sx={{ ml: 1 }}>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component={"span"}
                                    variant="body1"
                                    color="text.primary"
                                  >
                                    {"User " + notification[0].origin_username}
                                  </Typography>
                                  {notification[0].notification_type ===
                                  "follow"
                                    ? " started following you"
                                    : notification[0].notification_type ===
                                      "like"
                                    ? ' liked your picture "' +
                                      notification[0].title +
                                      '"'
                                    : ' commented on your picture "' +
                                      notification[0].title +
                                      '"'}{" "}
                                </Box>
                              </Box>
                            </Link>
                          </React.Fragment>
                        }
                        //secondary={}
                      />
                    </ListItem>
                  </ListItemButton>
                )
              )}
            </List>
          )}
        </TabPanel>
      </Box>
    </Box>
  );
}
