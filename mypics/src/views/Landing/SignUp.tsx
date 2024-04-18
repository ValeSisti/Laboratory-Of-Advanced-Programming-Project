import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "../../components/Landing/Typography";
import AppAppBar from "./AppAppBar";
import AppForm from "./AppForm";
import withRoot from "./withRoot";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";

function SignUp() {
  const navigate = useNavigate();
  /*const [sent, setSent] = React.useState(false);

  const validate = (values: { [index: string]: string }) => {
    const errors = required(["username", "email", "password"], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };*/
  async function createUser(values: FormData) {
    await axios
      .post("http://localhost:8000/user", {
        username: values.get("username"),
        email: values.get("email"),
        password: values.get("password"),
        profile_pic:
          "https://www.kindpng.com/picc/m/171-1712282_profile-icon-png-profile-icon-vector-png-transparent.png",
      })
      .then(function (response) {
        console.log(response);
        //faccio uscire l'alert e poi torno alla pagina di sign in
        alert("You are successfully registered!")
        navigate("/sign-in/")
      })
      .catch(function (error) {
        alert("Registration error, please try again.")
        console.log(error);
      });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    });
    createUser(data)
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (

      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
        </React.Fragment>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                color="secondary"
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="large"
            color="secondary"
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </AppForm>
  );
}

export default withRoot(SignUp);
