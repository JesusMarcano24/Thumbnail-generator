import { styled } from "@mui/material/styles";

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
  borderRadius: '50%',
  border: 1,
  height: '48px',
  width: '48px',
});