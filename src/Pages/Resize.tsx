import React, { ReactNode, useState } from "react";
import { Container, Row, Col } from "reactstrap";

//React Image File Resizer
import Resizer from "react-image-file-resizer";

//MUI
import { ToggleButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

//Tanstack
import { useMutation, useQueryClient } from "@tanstack/react-query";

//Post Image
import { postImage } from "../api/imagesAPI";

//Backdrop
import BackdropComponent from "../Components/Backdrop";

export default function Resize() {

  //QueryClient
  const queryClient = useQueryClient();

  //States
  const [width, setWidth] = useState<number>(20);
  const [name, setName] = useState<string>("");
  const [newName, setnewName] = useState<string>("My-resized-image");
  const [select, setSelect] = useState<File | null>(null);
  const [format, setFormat] = useState<string | ReactNode>("");
  const [newFormat, setNewFormat] = useState<string | unknown>("");
  const [open, setOpen] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  //Function to resize the image
  const fileChangedHandler = () => {
    if (select) {
      try {
        if (typeof newFormat === "string") {
          Resizer.imageFileResizer(
            select,
            width,
            1000,
            newFormat,
            100,
            0,
            (uri) => {
              if (typeof uri === "string") {
                setPreviewImage(uri);
              } else {
                console.error("Invalid image type:", uri);
              }
            },
            "base64",
            20,
            20
          );
        } else {
          console.error("Invalid format type:", newFormat);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addImageMutation = useMutation({
    mutationFn: postImage,
    onSuccess: () => {
      console.log("Image Added!");
      queryClient.invalidateQueries();
    },
  });

  //Convert the file to base64 and making the post to the API
  const showPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setSelect(selectedFile);
    if (selectedFile) {
      const { name } = selectedFile;
      const nameParsed = name.split(".").shift() || "";
      setName(nameParsed);

      const format = name.split(".").pop() || "";
      setFormat(format);

      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target && typeof e.target.result === "string") {
          const base64String = e.target.result;
          setOpen(false);
          setMainImage(base64String);
          setPreviewImage(base64String);
          addImageMutation.mutate(base64String);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Download the resized image
  const downloadImage = () => {
    if (previewImage) {
      const a = document.createElement("a");
      a.href = previewImage;
      a.download = `${newName}.${newFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <>
      <BackdropComponent handleFunction={showPreview} Openstate={open}/>
      <Container className="py-5">
        <Row className="d-flex align-items-center">
          <Col xs="12" lg="3" className="d-flex">
            <div>
              <Typography variant="h4" sx={{ mb: 2, mt: 5 }}>
                Resizing options:
              </Typography>
              <Typography sx={{ mb: 4, mt: 3 }}>
                Keep in mind that we can only resize images to a smaller size
                than the original, otherwise the image would lose quality
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <div className="d-flex align-items-center justify-content-between">
                  <Typography
                    sx={{
                      mt: 3,
                      mb: 2,
                      mr: 5,
                    }}
                  >
                    Width: (min:20px)
                  </Typography>
                  <TextField
                    error={width < 20}
                    sx={{
                      width: 100,
                    }}
                    value={width ? width : 0}
                    id="outlined-basic"
                    label="Width"
                    variant="outlined"
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <Typography sx={{ mt: 4, mb: 2, mr: 5 }}>
                    Choose a name:
                  </Typography>
                  <TextField
                    sx={{ width: 100 }}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    onChange={(e) => setnewName(e.target.value)}
                  />
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <Typography sx={{ mt: 3, mb: 2 }}>
                    Choose a format:
                  </Typography>
                  <FormControl sx={{ width: 100 }}>
                    <InputLabel id="format-select">Format</InputLabel>
                    <Select
                      labelId="format-select"
                      id="format-select"
                      label="Format"
                      onChange={(e) => setNewFormat(e.target.value)}
                    >
                      <MenuItem value="png">PNG</MenuItem>
                      <MenuItem value="jpg">JPG</MenuItem>
                      <MenuItem value="jpeg">JPEG</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Box>
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                {width >= 20 ? (
                  <ToggleButton
                    sx={{ width: 100 }}
                    value="meassures"
                    onClick={fileChangedHandler}
                  >
                    Resize
                  </ToggleButton>
                ) : (
                  <ToggleButton
                    fullWidth
                    value="resize"
                    sx={{ width: 100, opacity: 0, pointerEvents: "none" }}
                    onClick={fileChangedHandler}
                  >
                    Resize
                  </ToggleButton>
                )}

                {!!previewImage && (
                  <Box sx={{ position: "relative", my: 3 }}>
                    <Button
                      color={width > 19 ? "primary" : "error"}
                      sx={{
                        maxWidth: 180,
                        height: 48,
                        pointerEvents: width > 19 ? "all" : "none",
                      }}
                      variant="outlined"
                      onClick={() => {
                        downloadImage();
                      }}
                    >
                      Download Image
                    </Button>
                  </Box>
                )}
              </div>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => setOpen(true)}
              >
                Choose another image
              </Button>
            </div>
          </Col>

          <Col xs="12" lg="6" className="d-flex justify-content-center">
            {previewImage && (
              <div>
                <img className="w-100" src={mainImage} alt="Main image" />

                <ToggleButton
                  value="meassures"
                  fullWidth
                  className="d-flex justify-content-evenly"
                >
                  <div>Name: {name}</div>
                  <div>Format: {format}</div>
                </ToggleButton>
              </div>
            )}
          </Col>
          <Col xs="12" lg="3" className="mx-auto h-100 mt-5">
            {!!previewImage && (
              <>
                <label className="d-flex flex-column align-items-center">
                  <ToggleButton value="Preview" fullWidth>
                    Preview
                  </ToggleButton>
                  <img
                    className="w-100"
                    src={previewImage}
                    alt="Preview image"
                  />
                </label>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
