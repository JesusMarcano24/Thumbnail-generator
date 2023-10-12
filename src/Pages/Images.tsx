//Api
import { getImages } from "../api/imagesAPI";

import { Container } from "reactstrap";

//Tanstack
import { useQuery } from "@tanstack/react-query";

//Loader
import Loader from "../Common/Loader";

//NotFound
import NotFound from "../Common/NotFound";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

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

  return (
    <Container className="pb-5">
      <h1 className="text-center py-5">History Of Images:</h1>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {images.map((img: Image) => (
          <Card
            key={img.id}
            sx={{ maxWidth: 600, transition: "transform 0.2s" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={img.base64}
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
        ))}
      </div>
    </Container>
  );
}
