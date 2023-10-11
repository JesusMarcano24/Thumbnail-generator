import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { blueGrey, green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Container, Row, Col } from "reactstrap";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Backdrop from "@mui/material/Backdrop";

function Resize() {
  const [width, setWidth] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [select, setSelect] = useState<File | null>(null);
  const [format, setFormat] = useState<string | unknown>("");

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const [open, setOpen] = React.useState(true);

  //Preview
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const fileChangedHandler = () => {
  if (select) {
    try {
      if (typeof format === "string") {
        Resizer.imageFileResizer(
          select, width, 1000, format, 100, 0,
          (uri) => {
            if (typeof uri === "string") {
              console.log(uri);
              setPreviewImage(uri);
            } else {
              console.error("Invalid image type:", uri);
            }
          },
          "base64", 20, 20
        );
      } else {
        console.error("Invalid format type:", format);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

    //Convert the file to base64 and making the post to the API
    const showPreview = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files && event.target.files[0];
      setSelect(selectedFile)
      if (selectedFile) {
        console.log('Archivo seleccionado:', selectedFile.name);
        const reader = new FileReader();
        reader.onload = function (e) {
          if (e.target && typeof e.target.result === 'string') {
            const base64String = e.target.result
            setOpen(false)
            setPreviewImage(base64String);
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
        a.download = `${name}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    };

  return (
    <>
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
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
            '&:hover': {
              backgroundColor: blueGrey[400],
            }
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
            onChange={showPreview}
            className="vh-100 vw-100 position-absolute"
            accept=".jpeg, .png, .jpg"
          />
        </Button>
      </Backdrop>
      <Container className="vh-100">
        <Row className="d-flex align-items-center h-100">
          <Col xs="12" lg="4" className="d-flex">
            <div>
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <Typography sx={{ mt: 3, mb:2 }}>Width:</Typography>
                <TextField id="outlined-basic" label="Width" variant="outlined" onChange={e => setWidth(parseInt(e.target.value))}/>
                <Typography sx={{ mt: 3, mb:2 }}>Choose a name for your new image:</Typography>
                <TextField id="outlined-basic" label="Name" variant="outlined" onChange={e => setName(e.target.value)}/>
              </Box>
              
              <Box sx={{ minWidth: 150, pt: 1 }}>
                <Typography sx={{ mt: 3, mb:2 }}>Choose your preferred format:</Typography>
                <FormControl fullWidth>
                  <InputLabel id="format-select">Format</InputLabel>
                  <Select
                    labelId="format-select"
                    id="format-select"
                    label="Format"
                    onChange={e => setFormat(e.target.value)}
                  >
                    <MenuItem value="png">PNG</MenuItem>
                    <MenuItem value="jpg">JPG</MenuItem>
                    <MenuItem value="jpeg">JPEG</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button sx={{ mt: 3, mb:2 }} onClick={fileChangedHandler}>Resize</Button>

              {!!previewImage && ( 
                  <Box sx={{  position: 'relative' }}>
                    <Button
                        variant="contained"
                        sx={buttonSx}
                        disabled={loading}
                        onClick={() => {
                          handleButtonClick();
                          downloadImage();
                        }}
                        >
                        Download Image
                      </Button>
                      {loading && (
                        <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                        />
                        )}
                  </Box>
              )}
            </div>
          </Col>

          <Col xs="12" lg="8" className="d-flex justify-content-center">
            {previewImage && (
                <img className="mw-100" src={previewImage} alt="Preview" />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Resize;