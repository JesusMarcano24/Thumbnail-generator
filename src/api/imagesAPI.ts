import axios from "axios";

const imagesApi = axios.create({
  baseURL: "https://b16db9c4.thumbnail-generator.pages.dev/images",
});

export const getImages = async () => {
  const res = await imagesApi.get("/");
  return res.data;
};

export const postImage = (image: string) =>
  imagesApi.post("/", { base64: image });
