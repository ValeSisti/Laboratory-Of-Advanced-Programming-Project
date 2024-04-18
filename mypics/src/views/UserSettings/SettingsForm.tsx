import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const MyPaper = styled(Paper)({
  borderRadius: 20,
  //borderColor: "#000",
  padding: 20,
});

export default function AppForm(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children } = props;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundImage: "url(/static/onepirate/appCurvyLines.png)",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mt: 7, mb: 12 }}>
          <MyPaper
            sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 } }}
            elevation={10}
          >
            {children}
          </MyPaper>
        </Box>
      </Container>
    </Box>
  );
}
