import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import Loader from "../Common/Loader";

function Resize() {
  const [width, setWidth] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [select, setSelect] = useState<File | null>(null);
  const [format, setFormat] = useState<string>("");

  console.log(format)

  //Preview
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
    <div className="App">
      <Loader/>
      <input type="file" accept=".jpeg, .png, .jpg" onChange={showPreview} />
      <button onClick={fileChangedHandler}>Resize</button>
      <div>Width:</div>
      <input type="number" onChange={e => setWidth(parseInt(e.target.value))}/>
      <div>Choose a name for your new image</div>
      <input type="text" onChange={e => setName(e.target.value)}/>

      <div>
        <label htmlFor="format-select">Choose your format:</label>
        <select id="format-select" onChange={e => setFormat(e.target.value)}>
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="jpeg">JPEG</option>
        </select>
      </div>

      <br />

      {previewImage && (
          <img src={previewImage} alt="Preview" />
      )}

    <button onClick={downloadImage}>Download</button>
    </div>
  );
}

export default Resize;