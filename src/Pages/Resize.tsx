import React, { useState } from "react";
import Resizer from "react-image-file-resizer";

function Resize() {
  const [width, setWidth] = useState<number>(0);
  const [select, setSelect] = useState([]);

  //Preview
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  console.log(select)

  const fileChangedHandler = () => {
    if (select) {
      try {
        Resizer.imageFileResizer(
          select,
          width,
          1000,
          "PNG",
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

  return (
    <div className="App">
      <input type="file" onChange={showPreview} />
      <button onClick={fileChangedHandler}>Resize</button>
      <span>Width:</span>
      <input type="number" onChange={e => setWidth(parseInt(e.target.value))}/>

      {previewImage && (
          <img src={previewImage} alt="Preview" />
      )}
    </div>
  );
}

export default Resize;