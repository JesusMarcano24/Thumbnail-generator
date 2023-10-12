import { styled } from "@mui/material/styles";
import backgroundSVG from "../Config/parabolic-pentagon.svg";

//Button
export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

//Avatar
export const Avatar = styled("img")({
  borderRadius: "50%",
  border: 1,
  height: "48px",
  width: "48px",

  "@media (max-width: 600px)": {
    height: "35px",
    width: "35px",
  },
});

//Svg Background
export const SVGImg = styled("div")({
  backgroundImage: `url(${backgroundSVG})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  minHeight: "100vh",
});
