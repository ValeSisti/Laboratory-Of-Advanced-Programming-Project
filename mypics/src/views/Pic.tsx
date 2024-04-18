import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { styled, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import theme from "./Landing/theme";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import red from "@mui/material/colors/red";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import MainAppBar from "./MainAppBar";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../hooks/useAuth";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import Snackbar from "../components/Landing/Snackbar";
import * as API from "../api";

const MyPaper = styled(Paper)({
  borderRadius: 20,
  //borderColor: "#000",
  padding: 20,
});

function formatDate(date: any) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleTimeString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function parseDate(dateData: any) {
  const day = dateData["_DateTime__date"]["_Date__day"];
  const month = dateData["_DateTime__date"]["_Date__month"];
  const year = dateData["_DateTime__date"]["_Date__year"];
  const hour = dateData["_DateTime__time"]["_Time__hour"];
  const minute = dateData["_DateTime__time"]["_Time__minute"];
  const second = dateData["_DateTime__time"]["_Time__second"];

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var month_index = parseInt(month, 10) - 1;
  const minute_str = minute.toString().padStart(2, "0");
  var date_string =
    day +
    " " +
    months[month_index] +
    " " +
    year +
    ", " +
    hour +
    ":" +
    minute_str;

  return date_string;
}

export default function Pic() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state } = useLocation(); //state contiene i dati riguardanti l'immagine che è stata cliccata dalla pagina precedente
  console.log("🚀 ~ file: Pic.tsx ~ line 34 ~ Pic ~ state", state);
  console.log(state);

  const [itemData, setItemData] = useState<{ [key: string]: any }>({});
  const [comments, setComments] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [liked, setLiked] = useState(state.liked);
  const [saved, setSaved] = useState(state.saved);
  const [published, setPublished] = useState(state.published);
  const [commentText, setCommentText] = useState("");
  const [numLikes, setNumLikes] = useState(state.numLikes);

  const addOrRemoveLike = (
    user_id: string,
    post_id: string,
    post_title: string
  ) => {
    axios
      .post("http://localhost:8000/likes", {
        user_id: user.user_id,
        post_id: state.post_id,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    const params = new URLSearchParams();
    params.append("destination_user_id", user_id);
    params.append("origin_user_id", user.user_id);
    params.append("notification_type", "like");
    params.append("username", user.username);
    params.append("profile_pic", user.profile_pic);
    params.append("post_id", post_id);
    params.append("post_title", post_title);

    console.log({
      destination_user_id: user_id,
      origin_user_id: user.user_id,
      notification_type: "like",
      username: user.username,
      profile_pic: user.profile_pic,
      post_id: post_id,
      post_title: post_title,
    });

    if (!liked && user_id != user.user_id) {
      axios
        .post("http://localhost:8000/notification", {
          destination_user_id: user_id,
          origin_user_id: user.user_id,
          notification_type: "like",
          username: user.username,
          profile_pic: user.profile_pic,
          post_id: post_id,
          post_title: post_title,
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
    } else {
      console.log(
        "sono una persona che non capisce un cazzo ha ragione martina"
      );
    }
    liked ? setLiked(false) : setLiked(true);
    liked ? setNumLikes(numLikes - 1) : setNumLikes(numLikes + 1);
  };

  const addOrRemoveSaved = () => {
    saved ? setSaved(false) : setSaved(true);
    axios
      .post("http://localhost:8000/saved", {
        user_id: user.user_id,
        post_id: state.post_id,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    handleCloseDialog();
    setShowAlert(true);

    axios
      .delete("http://localhost:8000/post/" + state.post_id)
      .then(function (response) {
        navigate(-1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePublish = (
    user_id: string,
    post_id: string,
    post_title: string
  ) => {
    axios
      .post("http://localhost:8000/comment", {
        user_id: user.user_id,
        post_id: state.post_id,
        comment_text: commentText,
      })
      .then(function (response) {
        console.log(response.data);
        console.log(response.data[0]);

        setComments([...comments, response.data[0]]);
        setCommentText("");
      })
      .catch(function (error) {
        console.log(error);
      });

    const params = new URLSearchParams();
    params.append("destination_user_id", user_id);
    params.append("origin_user_id", user.user_id);
    params.append("notification_type", "comment");
    params.append("username", user.username);
    params.append("profile_pic", user.profile_pic);
    params.append("post_id", post_id);
    params.append("post_title", post_title);

    if (user_id != user.user_id) {
      axios
        .post("http://localhost:8000/notification", {
          destination_user_id: user_id,
          origin_user_id: user.user_id,
          notification_type: "comment",
          username: user.username,
          profile_pic: user.profile_pic,
          post_id: post_id,
          post_title: post_title,
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
    } else {
      console.log(
        "sono una persona che non capisce un cazzo ha ragione martina"
      );
    }
  };

  const [showAlertComment, setShowAlertComment] = React.useState(false);
  const handleDeleteComment = (comment_id: String) => {
    axios
      .delete("http://localhost:8000/comment/" + comment_id)
      .then(function (response) {
        console.log(response.data);
        console.log(response.data[0]);
        setShowAlertComment(true);
        setComments(
          comments.filter((item: any) => item.comment_id !== comment_id)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  /*const StyledFavoriteIcon = styled(FavoriteIcon, {
    name: "StyledFavoriteIcon",
  })({
    color: state.published ? "red" : "grey",
    //"&:hover": { color: "blue" },
  });*/

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/postinfo/" + state.post_id + "/" + user.user_id
      )
      .then((response) => {
        setItemData(response.data[0]);
        console.log(response.data[0]);
        console.log(response.data[0].datetime);
        console.log("COMMENTS");
        console.log(response.data[0].comments);
        setComments(response.data[0].comments);
        setNumLikes(response.data[0].num_likes);
        setLiked(response.data[0].liked);
        console.log("-------------------STATE-----------------");
        console.log(state);
        setLoading(false); //stop loading when data is fetched
      });
  }, [state]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        <Box sx={{ ml: 3, mt: 15 }}>
          <IconButton aria-label="back" onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ color: "28282a" }} />
          </IconButton>
        </Box>
        <Container
          sx={{
            display: "flex",
            justifyContent: "Space-between",
            width: 1600,
            //height: 900,
          }}
        >
          <MyPaper sx={{ m: 2 }} elevation={15}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Card
                  elevation={0}
                  sx={{
                    //height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link
                    to="/user-profile/"
                    state={state.user_id}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: red[500], width: 72, height: 72 }}
                          aria-label="recipe"
                          src={state.profile_pic}
                        ></Avatar>
                      }
                      title={state.username}
                      subheader={parseDate(state.datetime)}
                    />
                  </Link>
                  <CardMedia
                    component="img"
                    image={state.fb_img_url}
                    alt="random"
                  />
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    ml: 2,
                    mt: 2,
                  }}
                >
                  <Typography
                    component={"span"}
                    variant="h5"
                    fontSize="20pt"
                    fontWeight="500"
                  >
                    {state.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="h6"
                      //fontSize="11pt"
                      fontWeight="500"
                    >
                      {numLikes}
                    </Typography>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() =>
                        addOrRemoveLike(
                          state.user_id,
                          state.post_id,
                          state.title
                        )
                      }
                    >
                      {liked ? (
                        <FavoriteIcon color="secondary" />
                      ) : (
                        <FavoriteBorderIcon></FavoriteBorderIcon>
                      )}
                    </IconButton>
                    <IconButton
                      aria-label="save image"
                      onClick={addOrRemoveSaved}
                    >
                      {saved ? (
                        <BookmarkIcon color="secondary" />
                      ) : (
                        <BookmarkBorderIcon></BookmarkBorderIcon>
                      )}
                    </IconButton>
                    {published ? (
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    ) : (
                      <Box></Box>
                    )}

                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
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
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{
                        horizontal: "right",
                        vertical: "top",
                      }}
                      anchorOrigin={{
                        horizontal: "right",
                        vertical: "bottom",
                      }}
                    >
                      {" "}
                      <MenuItem onClick={handleClickOpenDialog}>
                        <ListItemIcon>
                          <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        Delete image
                      </MenuItem>
                    </Menu>
                    <Dialog
                      open={openDialog}
                      onClose={handleCloseDialog}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Do you really want to delete your post?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseDialog}>CANCEL</Button>
                        <Button
                          color="secondary"
                          onClick={handleDelete}
                          autoFocus
                        >
                          DELETE
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                </Container>
                <Container sx={{ mt: 3, ml: 2 }}>
                  <Typography component={"span"} align="justify">
                    {state.description}
                  </Typography>
                </Container>
                <Container
                  sx={{ display: "flex", alignItems: "center", mt: 3, ml: 2 }}
                >
                  <Avatar
                    sx={{
                      color: "action.active",
                      mr: 1,
                      fontSize: 40,
                    }}
                    src={user.profile_pic}
                  ></Avatar>
                  <TextField
                    id="outlined-basic"
                    label="Leave a comment"
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    onChange={(newValue) =>
                      setCommentText(newValue.target.value)
                    }
                    value={commentText}
                  />
                  <Box sx={{ ml: 1 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      //size="small"
                      onClick={() =>
                        handlePublish(state.user_id, state.post_id, state.title)
                      }
                    >
                      Publish
                    </Button>
                  </Box>
                </Container>
                <Container
                  sx={{ display: "flex", alignItems: "center", mt: 3, ml: 2 }}
                >
                  <Typography
                    component={"span"}
                    variant="h5"
                    fontSize="16pt"
                    fontWeight="500"
                  >
                    Comments:
                  </Typography>
                </Container>
                <Container
                  sx={{ display: "flex", alignItems: "center", mt: 3, ml: 2 }}
                >
                  {isLoading ? (
                    <div
                      style={{
                        width: "100%",
                        height: "100",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ThreeDots color="#ff3366" height="100" width="100" />
                    </div>
                  ) : (
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: "100%",
                        height: "500px",
                        bgcolor: "background.paper",
                        overflowY: "scroll",
                      }}
                    >
                      {comments ? ( //TODO: non funziona questo check perché quando i commenti non ci sono "comments" non c'è proprio nei dati ritrnati dal backend, capire come fare questo check
                        comments.map(
                          (comment: {
                            comment_id: string;
                            comment_text: string;
                            datetime: any[];
                            user_id: string;
                            username: string;
                            profile_pic: string;
                            published_comment: boolean;
                          }) => (
                            <ListItem
                              key={comment.comment_id}
                              disableGutters
                              sx={{
                                width: "100%",
                                backgroundColor: "#fcf2f5",
                                borderRadius: 4,
                                padding: 1.5,
                                mb: 1,
                              }}
                              alignItems="flex-start"
                            >
                              <ListItemText
                                primary={
                                  <React.Fragment>
                                    <Container
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        ml: -3,
                                        mb: 2,
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Link
                                        to="/user-profile/"
                                        state={comment.user_id}
                                        style={{
                                          color: "black",
                                          textDecoration: "none",
                                        }}
                                      >
                                        <Container
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            ml: -3,
                                          }}
                                        >
                                          <Avatar
                                            sx={{
                                              color: "action.active",
                                              mr: 2,
                                              fontSize: 40,
                                            }}
                                            src={comment.profile_pic}
                                          ></Avatar>
                                          <Typography
                                            sx={{ display: "inline" }}
                                            component={"span"}
                                            variant="body1"
                                          >
                                            {comment.username}
                                          </Typography>
                                        </Container>
                                      </Link>
                                      <Box
                                        sx={{
                                          mr: -5,
                                        }}
                                      >
                                        {comment.published_comment ? (
                                          <IconButton
                                            aria-label="comment"
                                            onClick={() =>
                                              handleDeleteComment(
                                                comment.comment_id
                                              )
                                            }
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                        ) : (
                                          <div></div>
                                        )}
                                      </Box>
                                    </Container>
                                  </React.Fragment>
                                }
                                secondary={
                                  <React.Fragment>
                                    <Box sx={{ mb: 1 }}>
                                      <Typography
                                        sx={{ display: "inline" }}
                                        component={"span"}
                                        variant="body1"
                                        color="text.primary"
                                        align="justify"
                                      >
                                        {comment.comment_text}
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Typography
                                        sx={{ display: "inline" }}
                                        component={"span"}
                                        variant="body2"
                                      >
                                        {parseDate(comment.datetime)}
                                      </Typography>
                                    </Box>
                                  </React.Fragment>
                                }
                                sx={{
                                  width: "100",
                                }}
                              />
                            </ListItem>
                          )
                        )
                      ) : (
                        <Typography component={"span"}>
                          {" "}
                          No comments to show
                        </Typography>
                      )}
                    </List>
                  )}
                </Container>
              </Grid>
            </Grid>
          </MyPaper>
        </Container>

        <Snackbar open={showAlert} autoHideDuration={6000}>
          <Alert severity="success" color="success">
            Post deleted successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={showAlertComment}
          autoHideDuration={3000}
          onClose={() => setShowAlertComment(false)}
        >
          <Alert severity="success" color="success">
            Comment deleted successfully!
          </Alert>
        </Snackbar>
      </main>
    </ThemeProvider>
  );
}
