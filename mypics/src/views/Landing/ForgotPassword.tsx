import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "../../components/Landing/Typography";
import AppAppBar from "./AppAppBar";
import AppForm from "./AppForm";
import withRoot from "./withRoot";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
import axios from "axios";

function ForgotPassword() {
  async function updatePassword(values: FormData) {
    await axios
      .post("http://localhost:8000/forgotpassword", {
        username: values.get("username"),
        password: values.get("password"),
      })
      .then(function (response) {
        console.log(response);
        //SE INSERISCO UN UTENTE SBAGLIATO response.data MI TORNA UN ARRAY VUOTO, ALTRIMENTI HA TUTTI I DATI
        if (response.data.length === 0) {
          return alert("Invalid username");
        } else {
          return alert("Password reset successfully");
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
    });
    updatePassword(data);
  };

  return (
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Forgot your password?
          </Typography>
          <Typography variant="body2" align="center">
            {
              "Enter your username and new password below in order to reset your password."
            }
          </Typography>
        </React.Fragment>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
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
            id="password"
            label="New password"
            name="password"
            type="password"
            autoComplete="password"
            color="secondary"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
            size="large"
          >
            Reset password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/sign-in/" variant="body2">
                Remember your password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </AppForm>
  );
}

export default withRoot(ForgotPassword);
