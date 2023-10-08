import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postImage } from '../api/imagesAPI';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Crop() {

  const queryClient = useQueryClient();

  const addImageMutation = useMutation({
    mutationFn : postImage,
    onSuccess: () => {
      console.log('Image Added!');
      queryClient.invalidateQueries();
    }
  })


  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      console.log('Archivo seleccionado:', selectedFile.name);
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target && typeof e.target.result === 'string') {
          const base64String = e.target.result
          setPreviewImage(base64String);
          addImageMutation.mutate(base64String)
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload file
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileUpload}
          className="file-upload-input"
          accept="image/*"
        />
      </Button>

      {previewImage && (
        <img src={previewImage} alt="Preview" />
      )}
    </>
  );
}