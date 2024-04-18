import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "../../components/Landing/Typography";
import AppAppBar from "./AppAppBar";
import AppForm from "./AppForm";
import withRoot from "./withRoot";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function SignIn() {
  //serve per spostarsi da una pagina all'altra
  const { login } = useAuth();
  console.log("login: " + login);

  async function checkUserAndPass(values: FormData) {
    await axios
      .post("http://localhost:8000/checkuserandpass", {
        username: values.get("username"),
        password: values.get("password"),
      })
      .then(function (response) {
        console.log(response);
        //SE INSERISCO UN UTENTE SBAGLIATO response.data MI TORNA UN ARRAY VUOTO, ALTRIMENTI HA TUTTI I DATI
        if (response.data.length === 0) {
          return alert("Invalid username or password");
        } else {
          /*return navigateTo("/homepage/", {
            //questo campo state serve per prendere un parametro e portarselo appresso nella pagina dove si verrà ridirezionati con navigateto
            //in questo caso mi sono preso l'username per poterlo riusare dentro l'homepage
            state: { username: response.data[0].username, user_id: response.data[0].user_id, profile_pic: response.data[0].profile_pic},
          });*/
          login({
            username: response.data[0].username,
            user_id: response.data[0].user_id,
            profile_pic: response.data[0].profile_pic,
            email: response.data[0].email,
            password: response.data[0].password,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    checkUserAndPass(data);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 5 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              color="secondary"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
              size="large"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </React.Fragment>
      </AppForm>
  );
}

export default withRoot(SignIn);
