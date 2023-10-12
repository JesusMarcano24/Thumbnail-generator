import { useState, useRef } from "react";
import { Container, Row, Col } from "reactstrap";

//Tanstack
import { useMutation, useQueryClient } from "@tanstack/react-query";

//MUI
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

//Post Image
import { postImage } from "../api/imagesAPI";

//React Crop
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";

//Canvas and debounce
import { canvasPreview } from "../Utils/canvasPreview";
import { useDebounceEffect } from "../Utils/useDebounceEffect";

//Backdrop
import BackdropComponent from "../Components/Backdrop";

export default function CropImage() {
  //States
  const [imgSrc, setImgSrc] = useState("");
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState<number>(1);
  const [rotate, setRotate] = useState<number>();
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const [name, setName] = useState<string>("My-cropped-image");
  const [width, setWidth] = useState<undefined | number>(0);
  const [height, setHeight] = useState<undefined | number>(0);
  const [format, setFormat] = useState<string | unknown>("PNG");
  const [open, setOpen] = useState(true);

  //Refs
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement | null>(null);

  //Center the aspect of the Crop
  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }

  //OnImageLoad
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      console.log(width);
      setCrop(centerAspectCrop(width, height, aspect));

      setWidth(imgRef.current?.naturalWidth);
      setHeight(imgRef.current?.naturalHeight);

      console.log(width);
    }
  }

  //Download the image
  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );

    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    const customFileName = `${name}.${format}`;

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);

    // adding custom name and download
    hiddenAnchorRef.current!.href = blobUrlRef.current;
    hiddenAnchorRef.current!.download = customFileName;
    hiddenAnchorRef.current!.click();
  }

  //Debounce Effect
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  //Change the aspect
  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(16 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 16 / 9);
        setCrop(newCrop);
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  //QueryClient
  const queryClient = useQueryClient();
  const addImageMutation = useMutation({
    mutationFn: postImage,
    onSuccess: () => {
      console.log("Image Added!");
      queryClient.invalidateQueries();
    },
  });

  //Convert the file to base64 and making the post to the API
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setCrop(undefined); // Makes crop preview update between images.
      console.log("Selected file:", selectedFile.name);
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target && typeof e.target.result === "string") {
          const base64String = e.target.result;
          setOpen(false);
          setImgSrc(reader.result?.toString() || "");
          addImageMutation.mutate(base64String);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      <BackdropComponent handleFunction={handleFileUpload} Openstate={open}/>
      <Container className="py-5">
        <Row className="d-flex align-items-center">
          <Col xs="12" lg="3" className="d-flex">
            <div>
              <Typography variant="h4" sx={{ mb: 2, mt: 3 }}>
                Cropping options:
              </Typography>
              <Typography sx={{ mb: 4, mt: 3 }}>
                Here you can change the scale, name, format and rotation, you
                can also change the toggle aspect.
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <div className="d-flex align-items-center justify-content-between">
                  <Typography sx={{ mt: 3, mb: 2 }}>Scale:</Typography>
                  <TextField
                    sx={{ width: 100 }}
                    id="scale-input"
                    type="number"
                    value={scale}
                    disabled={!imgSrc}
                    onChange={(e) => setScale(Number(e.target.value))}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <Typography sx={{ mt: 4, mb: 2 }}>Rotate:</Typography>
                  <TextField
                    sx={{ width: 100 }}
                    id="rotate-input"
                    type="number"
                    value={rotate}
                    disabled={!imgSrc}
                    onChange={(e) =>
                      setRotate(
                        Math.min(180, Math.max(-180, Number(e.target.value)))
                      )
                    }
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <Typography sx={{ mt: 4, mb: 2 }}>Choose a name:</Typography>
                  <TextField
                    sx={{ width: 150 }}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </Box>

              <Box sx={{ minWidth: 150, pt: 1 }}>
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
                      onChange={(e) => setFormat(e.target.value)}
                    >
                      <MenuItem value="png">PNG</MenuItem>
                      <MenuItem value="jpg">JPG</MenuItem>
                      <MenuItem value="jpeg">JPEG</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Box>

              {!!completedCrop && (
                <>
                  <Box sx={{ position: "relative", mt: 3, mb: 3 }}>
                    <Button onClick={onDownloadCropClick} variant="outlined">
                      Download Image
                    </Button>
                    <a download ref={hiddenAnchorRef} className="d-none" />
                  </Box>
                </>
              )}

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
            {!!imgSrc && (
              <div>
                <div>
                  <ToggleButton
                    fullWidth
                    value="check"
                    onClick={handleToggleAspectClick}
                  >
                    Toggle aspect: {aspect ? "off" : "on"}
                  </ToggleButton>
                </div>
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(e) => setCompletedCrop(e)}
                  aspect={aspect}
                  minWidth={50}
                  minHeight={50}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    style={{
                      transform: `scale(${scale}) rotate(${rotate}deg)`,
                    }}
                    className="w-100"
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
                <ToggleButton
                  value="meassures"
                  fullWidth
                  className="d-flex justify-content-evenly"
                >
                  <div>width: {width} px</div>
                  <div>height: {height} px</div>
                </ToggleButton>
              </div>
            )}
          </Col>
          <Col xs="12" lg="3" className="mx-auto h-100 pt-5">
            {!!completedCrop && (
              <>
                <label className="d-flex flex-column align-items-center">
                  <ToggleButton value="Preview" fullWidth>
                    Preview
                  </ToggleButton>
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      border: "1px solid black",
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
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
