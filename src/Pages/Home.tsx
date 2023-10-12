//MUI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// React Router Dom
import { Link } from "react-router-dom";

export default function Home() {

  return (
    <>
      <main id="home">
        <Box
          sx={{
            pb: 6,
            display: "flex",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <Container maxWidth="md">
            <div>
              <div className="d-flex justify-content-center">
                <Typography
                  className="title-loader"
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                ></Typography>
              </div>
              <Typography
                variant="h6"
                align="center"
                color="text.secondary"
                paragraph
              >
                Welcome to I love thumbnail Generator! The fastest way to crop,
                resize and format your images!
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Link to="/Crop">
                  <Button variant="outlined">Crop your image</Button>
                </Link>
                <Link to="/Resize">
                  <Button variant="outlined">Resize your image</Button>
                </Link>
                <Link to="/images">
                  <Button variant="outlined">Uploaded images</Button>
                </Link>
              </Stack>
            </div>
          </Container>
        </Box>
      </main>
    </>
  );
}
