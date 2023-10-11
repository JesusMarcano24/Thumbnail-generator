import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import Loader from "../Common/Loader";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import { Container, Row, Col } from "reactstrap";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Resize() {
  const [width, setWidth] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [select, setSelect] = useState<File | null>(null);
  const [format, setFormat] = useState<string>("");

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

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

  React.useEffect(() => {
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
        Resizer.imageFileResizer(
          select,
          width,
          1000,
          format,
          100,
          0,
          (uri) => {
            if (typeof uri === "string") {
              console.log(uri);
              setPreviewImage(uri);
            } else {
              console.error("Invalid image type:", uri);
            }
          },
          "base64",
          20,
          20
        );
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
      <Loader/>
      <Container className="vh-100">
        <Row className="d-flex align-items-center h-100">
          <Col xs="12" lg="4" className="d-flex">
            <div>
              <div>
                <label htmlFor="archivo">Subir archivo</label>
                <input className="d-none" type="file" id="archivo" accept=".jpeg, .png, .jpg" onChange={showPreview} />
              </div>
              <div>Width:</div>
              <input type="number" onChange={e => setWidth(parseInt(e.target.value))}/>
              <div>Choose a name for your new image</div>
              <input type="text" onChange={e => setName(e.target.value)}/>
              
              <Box sx={{ minWidth: 150, pt: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="format-select">Format</InputLabel>
                  <Select
                    labelId="format-select"
                    id="format-select"
                    label="Age"
                    onChange={e => setFormat(e.target.value)}
                  >
                    <MenuItem value="png">PNG</MenuItem>
                    <MenuItem value="jpg">JPG</MenuItem>
                    <MenuItem value="jpeg">JPEG</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button onClick={fileChangedHandler}>Resize</Button>

              {!!previewImage && ( 
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ m: 1, position: 'relative' }}>
                    <Fab
                      aria-label="save"
                      color="primary"
                      sx={buttonSx}
                      onClick={handleButtonClick}
                      >
                      {success ? <CheckIcon /> : <DownloadIcon />}
                    </Fab>
                    {loading && (
                      <CircularProgress
                      size={68}
                      sx={{
                        color: green[500],
                        position: 'absolute',
                        top: -6,
                        left: -6,
                          zIndex: 1,
                        }}
                        />
                        )}
                  </Box>
                  <Box sx={{ m: 1, position: 'relative' }}>
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