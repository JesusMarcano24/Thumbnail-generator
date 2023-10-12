import { Button, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface Props {
  handleFunction: React.ChangeEventHandler<HTMLInputElement>;
  Openstate: boolean;
}

export default function BackdropComponent({
  handleFunction,
  Openstate,
}: Props) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={Openstate}
    >
      <Button
        sx={{
          height: "90%",
          width: "90%",
          border: 2,
          borderColor: "grey",
          borderStyle: "dashed",
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor: blueGrey[300],
          "&:hover": {
            backgroundColor: blueGrey[400],
          },
        }}
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        <Typography variant="h6" color="black" noWrap>
          Select a File or Drag and Drop It
        </Typography>
        <input
          type="file"
          onChange={handleFunction}
          className="vh-100 vw-100 position-absolute"
          accept=".jpeg, .png, .jpg"
        />
      </Button>
    </Backdrop>
  );
}
