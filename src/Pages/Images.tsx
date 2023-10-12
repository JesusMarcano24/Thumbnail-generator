//Api
import { getImages } from "../api/imagesAPI";

//Tanstack
import { useQuery } from "@tanstack/react-query";

//Loader
import Loader from "../Common/Loader";

//NotFound
import NotFound from "../Common/NotFound";

type Image = {
  id: number;
  base64: string;
};

export default function Images() {
  const {
    isLoading,
    data: images,
    isError,
  } = useQuery({
    queryKey: ["images"],
    queryFn: getImages,
    select: (image) => image.sort((a: Image, b: Image) => b.id - a.id),
  });

  if (isLoading) return <Loader />;
  else if (isError) return <NotFound />;

  return images.map((img: Image) => (
    <div>
      <img src={img.base64} alt="Image" />
    </div>
  ));
}
