import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              404 NOT FOUND
            </Typography>
            <Typography
              maxWidth="md"
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              This route does not exist or has not yet been created
            </Typography>

            <Typography
              maxWidth="md"
              align="center"
              color="text.secondary"
              paragraph
            >
              Explore our existing features!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link to="/Crop">
                <Button variant="contained">Crop your image</Button>
              </Link>
              <Link to="/Resize">
                <Button variant="outlined">Resize your image</Button>
              </Link>
            </Stack>
          </Container>
        </Box>
      </main>
    </>
  );
}
