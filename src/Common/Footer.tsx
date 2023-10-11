import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <>
      <Box sx={{ p: 6 }} component="footer" id="Footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Made with ❤ by Jesus Marcano.
        </Typography>
      </Box>
    </>
  );
}
