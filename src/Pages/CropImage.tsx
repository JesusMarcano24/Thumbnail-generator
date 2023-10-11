import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Loader from '../Common/Loader';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useState, useRef } from 'react';

import { postImage } from '../api/imagesAPI';

import Backdrop from "@mui/material/Backdrop";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Container ,Row, Col } from 'reactstrap';

export default function CropImage() {

  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(16 / 9)

  const [name, setName] = useState<string>("");
  const [format, setFormat] = useState<string | unknown>("");

  const [open, setOpen] = useState(true);

    //Center Crop
  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }

  //OnImageLoad
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  //Download the image
  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }
  
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
  
    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
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
      offscreen.height,
    );
  
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    });
  
    const customFileName = `${name}.${format}`;
  
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);
  
    // Configura el atributo "download" con el nombre personalizado
    hiddenAnchorRef.current!.href = blobUrlRef.current;
    hiddenAnchorRef.current!.download = customFileName;
  
    // Hace clic en el enlace para iniciar la descarga
    hiddenAnchorRef.current!.click();
  }

  //Efecto rebote
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
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else {
      setAspect(16 / 9)

      if (imgRef.current) {
        const { width, height } = imgRef.current
        const newCrop = centerAspectCrop(width, height, 16 / 9)
        setCrop(newCrop)
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height))
      }
    }
  }

  //QueryClient
  const queryClient = useQueryClient();

  const addImageMutation = useMutation({
    mutationFn : postImage,
    onSuccess: () => {
      console.log('Image Added!');
      queryClient.invalidateQueries();
    }
  })

  //Convert the file to base64 and making the post to the API
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setCrop(undefined) // Makes crop preview update between images.
      console.log('Archivo seleccionado:', selectedFile.name);
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target && typeof e.target.result === 'string') {
          const base64String = e.target.result
          setOpen(false)
          setImgSrc(reader.result?.toString() || '')
          addImageMutation.mutate(base64String)
        }
      };
      reader.readAsDataURL(selectedFile);
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
            onChange={handleFileUpload}
            className="vh-100 vw-100 position-absolute"
            accept=".jpeg, .png, .jpg"
          />
        </Button>
        </Backdrop>
        <Loader/>
        <Container className="vh-100">
          <Row className="d-flex align-items-center h-100">
            <Col xs="12" lg="4" className="d-flex">
              <div>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Typography sx={{ mt: 3, mb:2 }}>Scale:</Typography>
          <TextField   id="scale-input" type="number" value={scale} disabled={!imgSrc} onChange={(e) => setScale(Number(e.target.value))}/>
          <Typography sx={{ mt: 3, mb:2 }}>Rotate:</Typography>
          <TextField id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }/>
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

        <div>
          <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? 'off' : 'on'}
          </button>
        </div>

        {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <div>
            <button onClick={onDownloadCropClick}>Download Crop</button>
            <a
              href="#hidden"
              ref={hiddenAnchorRef}
              download
              style={{
                position: 'absolute',
                top: '-200vh',
                visibility: 'hidden',
              }}
            >
              Hidden download
            </a>
          </div>
        </>
        )}
              </div>
        </Col>

        <Col xs="12" lg="8" className="d-flex justify-content-center">
          {!!imgSrc && (
            <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            minWidth={50}
            minHeight={50}
            >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
              />
          </ReactCrop>
          )}
          </Col>
          </Row>
        </Container>
    </>
  );
}