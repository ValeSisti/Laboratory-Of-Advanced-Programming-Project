import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { styled, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MainAppBar from "../MainAppBar";
import theme from "../Landing/theme";
import React, { useState, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { StyledDropzone } from "./Dropzone";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link as LinkButton } from "react-router-dom";
//import { DropzoneArea } from "material-ui-dropzone";

const MyPaper = styled(Paper)({
  borderRadius: 20,
  //borderColor: "#000",
  padding: 20,
});

var firstTime = true;

export default function Homepage() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  var [titleValue, setTitleValue] = useState("");
  var [descriptionValue, setDescriptionValue] = useState("");
  var [fbImgUrl, setFbImgUrl] = useState("");

  const { user } = useAuth();

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

  if (firstTime) {
    firstTime = false;
    axios
      .get("http://localhost:8000/addservice")
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const navigate = useNavigate();

  function handleClick() {
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
        console.log("FBIMGURL: " + fbImgUrl);
        //SALVIAMO IL POST NEL DATABASE DI NEO4J
        savePostInDB(response.data);

        axios
          .post("http://localhost:8000/addindex", {
            img_url: response.data,
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function savePostInDB(fb_img_url: string) {
    console.log("executing savePostInDB");
    if (titleValue != "") {
      console.log("valentano: ", fb_img_url);
      axios
        .post("http://localhost:8000/post", {
          fb_img_url: fb_img_url,
          title: titleValue,
          description: descriptionValue,
          user_id: user.user_id,
        })
        .then(function (response) {
          navigate("/user-profile/", { state : user.user_id })
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("Missing image, title or description");
      console.log("titleValue: " + titleValue);
      console.log("dezcriptionValue: " + descriptionValue);
      console.log("fbImgUrl: " + fbImgUrl);
    }
  }

  

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
            justifyContent: "center",
            width: 1600,
            //height: 900,
          }}
        >
          <MyPaper sx={{ m: 2 }} elevation={15}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <StyledDropzone
                  onDrop={onDrop}
                  selectedImages={selectedImages}
                ></StyledDropzone>
              </Grid>
              <Grid item xs={6}>
                <Container
                  sx={{
                    display: "flex",
                    ml: 2,
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  <Box
                    //sx={{ ml: 2 }}
                    component="form"
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      fullWidth
                      label="Add a title"
                      id="title"
                      color="secondary"
                      onChange={(newValue) =>
                        setTitleValue(newValue.target.value)
                      }
                      variant="standard"
                      inputProps={{ style: { fontSize: 40 } }}
                      InputLabelProps={{ style: { fontSize: 30 } }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "99%",
                      maxWidth: "100%",
                      mt: 3,
                      ml: 2,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Add a description"
                      id="description"
                      color="secondary"
                      onChange={(newValue) =>
                        setDescriptionValue(newValue.target.value)
                      }
                      multiline
                      rows={8}
                    />
                  </Box>
                  <Box sx={{ mt: 3, ml: 2 }}>
                    <Button
                      color="secondary"
                      variant="contained"
                      size="large"
                      component="a"
                      sx={{ minWidth: 200 }}
                      onClick={handleClick}
                    >
                        Save
                    </Button>
                  </Box>
                </Container>
              </Grid>
            </Grid>
          </MyPaper>
        </Container>
      </main>
    </ThemeProvider>
  );
}
/*
<DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              onChange={(files) => console.log("Files:", files)}
            />*/
