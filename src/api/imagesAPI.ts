import axios from "axios";

const imagesApi = axios.create({
  baseURL: "http://localhost:3000/images",
});

export const getImages = async () => {
  const res = await imagesApi.get("/");
  return res.data;
};

export const postImage = (image: string) =>
  imagesApi.post("/", { base64: image });
