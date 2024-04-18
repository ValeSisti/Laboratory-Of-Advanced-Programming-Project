import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import theme from "../Landing/theme";
import React, { useCallback, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import SettingsForm from "./SettingsForm";
import { useAuth } from "../../hooks/useAuth";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as API from "../../api";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import { ProfilePicDropzone } from "./ProfilePicDropzone";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function UserSettings() {
  const { user, setUser } = useAuth();

  //questo serve per usare gli hooks e tornare alla pagina iniziale dopo l'eliminazione dell'account
  const { logout } = useAuth();

  const [openUsername, setOpenUsername] = React.useState(false);
  const [usernameText, setUsernameText] = React.useState("");

  const handleClickUsername = () => {
    setOpenUsername(true);
  };

  const handleSaveUsername = () => {
    console.log("called handleClick");
    axios
      .post("http://localhost:8000/updateusername", {
        user_id: user.user_id,
        username: usernameText,
      })
      .then(function () {
        setUser({
          username: usernameText,
          user_id: user.user_id,
          profile_pic: user.profile_pic,
          email: user.email,
          password: user.password,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    setUsernameText("");
    setOpenUsername(false);
  };

  const handleCloseUsername = () => {
    setUsernameText("");
    setOpenUsername(false);
  };

  const [openEmail, setOpenEmail] = React.useState(false);
  const [emailText, setEmailText] = React.useState("");

  const handleClickEmail = () => {
    setOpenEmail(true);
  };

  const handleSaveEmail = () => {
    axios
      .post("http://localhost:8000/updateemail", {
        user_id: user.user_id,
        email: emailText,
      })
      .then(function () {
        setUser({
          username: user.username,
          user_id: user.user_id,
          profile_pic: user.profile_pic,
          email: emailText,
          password: user.password,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    setEmailText("");
    setOpenEmail(false);
  };

  const handleCloseEmail = () => {
    setEmailText("");
    setOpenEmail(false);
  };

  const [openPassword, setOpenPassword] = React.useState(false);
  const [passwordText, setPasswordText] = React.useState("");
  const [oldPasswordText, setOldPasswordText] = React.useState("");
  const [confirmPasswordText, setConfirmPasswordText] = React.useState("");
  const [showAlertOldPassword, setShowAlertOldPassword] = React.useState(false);
  const [showAlertConfirmPassword, setShowAlertConfirmPassword] =
    React.useState(false);

  const handleClickPassword = () => {
    setOpenPassword(true);
  };

  const handleSavePassword = () => {
    if (oldPasswordText == user.password) {
      if (confirmPasswordText == passwordText) {
        axios
          .post("http://localhost:8000/updatepassword", {
            user_id: user.user_id,
            password: passwordText,
          })
          .then(function () {
            setUser({
              username: user.username,
              user_id: user.user_id,
              profile_pic: user.profile_pic,
              email: user.email,
              password: passwordText,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
        setPasswordText("");
        setConfirmPasswordText("");
        setOldPasswordText("");
        setShowPassword1(false);
        setShowPassword2(false);
        setShowPassword3(false);
        setOpenPassword(false);
      } else {
        setShowAlertConfirmPassword(true);
      }
    } else {
      setShowAlertOldPassword(true);
    }
  };

  const handleClosePassword = () => {
    setPasswordText("");
    setConfirmPasswordText("");
    setOldPasswordText("");
    setShowPassword1(false);
    setShowPassword2(false);
    setShowPassword3(false);
    setOpenPassword(false);
  };

  const [openPic, setOpenPic] = React.useState(false);
  const [fbImgUrl, setFbImgUrl] = useState("");

  const handleClickPic = () => {
    setOpenPic(true);
  };

  const handleSavePic = () => {
    console.log("called handleClick");

    var formData = new FormData();
    formData.append("image", acceptedFiles[0]);

    axios
      .post("http://localhost:8000/uploadpic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (response) {
        console.log(response.data);
        //console.log(response.data.fb_img_url);
        console.log("TYPE" + response.data.type);
        setFbImgUrl(response.data);
        //console.log("FBIMGURL: " + fbImgUrl);

        axios
          .post("http://localhost:8000/updateprofilepic", {
            user_id: user.user_id,
            profile_pic: response.data,
          })
          .then(function (response) {
            setUser({
              username: user.username,
              user_id: user.user_id,
              profile_pic: response.data[0].profile_pic,
              email: user.email,
              password: user.password,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
    setAcceptedFiles([]);
    setSelectedImages([]);
    setOpenPic(false);
  };

  const handleClosePic = () => {
    setAcceptedFiles([]);
    setSelectedImages([]);
    setOpenPic(false);
  };

  const [showPassword1, setShowPassword1] = useState(false);
  const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);
  const handleMouseDownPassword1 = () => setShowPassword1(!showPassword1);

  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);
  const handleMouseDownPassword2 = () => setShowPassword2(!showPassword2);

  const [showPassword3, setShowPassword3] = useState(false);
  const handleClickShowPassword3 = () => setShowPassword3(!showPassword3);
  const handleMouseDownPassword3 = () => setShowPassword3(!showPassword3);

  //funzione per cancellare l'account tramite una delete con axios e poi ridirezionare l'utente alla pagina iniziale
  async function deleteUser() {
    await axios
      .delete("http://localhost:8000/user/" + user.user_id)
      .then(function (response) {
        console.log(response);
        logout();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //funzione per fare semplicemente il logout e tornare alla pagina iniziale
  function logoutUser() {
    fetch(`${API.API_URL}/api/stop_handler`, {
      method: "GET",
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    logout();
  }

  const [selectedImages, setSelectedImages] = useState([]);
  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    // ! link che fa vedere come si fa a passare parametri dal figlio al padre, magari torna utile: https://bobbyhadz.com/blog/react-pass-data-from-child-to-parent
    setAcceptedFiles(acceptedFiles);
    console.log(acceptedFiles);
    setSelectedImages(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 8 }}></Box>
        <SettingsForm>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              mb: 10,
            }}
          >
            <Fab
              size="small"
              color="secondary"
              sx={{ position: "relative", bottom: 3, left: 130 }}
              onClick={handleClickPic}
            >
              <CreateIcon fontSize="small" />
            </Fab>
            <Avatar
              alt={user.username}
              src={user.profile_pic}
              sx={{ width: 128, height: 128 }}
            />
            <Dialog open={openPic} onClose={handleClosePic}>
              <DialogTitle color="secondary">Change Profile Pic</DialogTitle>
              <DialogContent sx={{ minWidth: 500 }}>
                <ProfilePicDropzone
                  onDrop={onDrop}
                  selectedImages={selectedImages}
                ></ProfilePicDropzone>
              </DialogContent>
              <DialogActions>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleClosePic}
                >
                  Cancel
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleSavePic}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={9}>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h5"
                  fontSize="10pt"
                  sx={{ mb: 0.5 }}
                  color="#9e9e9e"
                >
                  Username
                </Typography>
                <Typography variant="h5" fontSize="15pt" sx={{ mb: 0.5 }}>
                  {user.username}
                </Typography>
                <Divider light sx={{ mb: 1.5 }} />
              </Container>
            </Grid>
            <Grid item xs={2}>
              <Button
                color="secondary"
                variant="contained"
                component="a"
                sx={{ minWidth: 70, ml: 1 }}
                onClick={handleClickUsername}
              >
                Edit
              </Button>
              <Dialog open={openUsername} onClose={handleCloseUsername}>
                <DialogTitle color="secondary">Change Username</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="New username"
                    type="username"
                    fullWidth
                    variant="standard"
                    onChange={(newValue) =>
                      setUsernameText(newValue.target.value)
                    }
                    value={usernameText}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={handleCloseUsername}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleSaveUsername}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={9}>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h5"
                  fontSize="10pt"
                  sx={{ mb: 0.5, mt: 1 }}
                  color="#9e9e9e"
                >
                  Email
                </Typography>
                <Typography variant="h5" fontSize="15pt" sx={{ mb: 0.5 }}>
                  {user.email}
                </Typography>
                <Divider light sx={{ mb: 1.5 }} />
              </Container>
            </Grid>
            <Grid item xs={2}>
              <Button
                color="secondary"
                variant="contained"
                sx={{ minWidth: 70, ml: 1 }}
                onClick={handleClickEmail}
              >
                Edit
              </Button>
              <Dialog open={openEmail} onClose={handleCloseEmail}>
                <DialogTitle color="secondary">Change Email</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="New email"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(newValue) => setEmailText(newValue.target.value)}
                    value={emailText}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={handleCloseEmail}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleSaveEmail}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={9}>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h5"
                  fontSize="10pt"
                  sx={{ mb: 0.5, mt: 1 }}
                  color="#9e9e9e"
                >
                  Password
                </Typography>
                <Typography
                  variant="h5"
                  fontSize="15pt"
                  sx={{ mb: 0.5 }} //TODO: la password è da nascondere
                >
                  ********
                </Typography>
                <Divider light />
              </Container>
            </Grid>
            <Grid item xs={2}>
              <Button
                color="secondary"
                variant="contained"
                component="a"
                //href="//"
                sx={{ minWidth: 70, ml: 1 }}
                onClick={handleClickPassword}
              >
                Edit
              </Button>
              <Dialog open={openPassword} onClose={handleClosePassword}>
                <DialogTitle color="secondary">Change Password</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="old-password"
                    label="Old password"
                    type={showPassword1 ? "text" : "password"}
                    fullWidth
                    variant="standard"
                    onChange={(newValue) =>
                      setOldPasswordText(newValue.target.value)
                    }
                    value={oldPasswordText}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword1}
                            onMouseDown={handleMouseDownPassword1}
                          >
                            {showPassword1 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="New password"
                    type={showPassword2 ? "text" : "password"}
                    fullWidth
                    variant="standard"
                    onChange={(newValue) =>
                      setPasswordText(newValue.target.value)
                    }
                    value={passwordText}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword2}
                          >
                            {showPassword2 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="confirm-password"
                    label="Confirm password"
                    type={showPassword3 ? "text" : "password"}
                    fullWidth
                    variant="standard"
                    onChange={(newValue) =>
                      setConfirmPasswordText(newValue.target.value)
                    }
                    value={confirmPasswordText}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword3}
                            onMouseDown={handleMouseDownPassword3}
                          >
                            {showPassword3 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={handleClosePassword}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleSavePassword}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
          <Box sx={{ pt: 4, pb: 4 }}></Box>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "92%",
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              component="a"
              onClick={logoutUser}
              sx={{ minWidth: 100 }}
            >
              Logout
            </Button>
            <Button
              color="secondary"
              variant="contained"
              component="a"
              //href="//"
              onClick={deleteUser}
              sx={{ minWidth: 180 }}
            >
              Delete account
            </Button>
          </Container>
        </SettingsForm>
        <Snackbar
          open={showAlertOldPassword}
          autoHideDuration={3000}
          onClose={() => setShowAlertOldPassword(false)}
        >
          <Alert severity="error" color="error">
            Old password is not correct!
          </Alert>
        </Snackbar>
        <Snackbar
          open={showAlertConfirmPassword}
          autoHideDuration={3000}
          onClose={() => setShowAlertConfirmPassword(false)}
        >
          <Alert severity="error" color="error">
            Inserted passwords do not match!
          </Alert>
        </Snackbar>
      </main>
    </ThemeProvider>
  );
}
