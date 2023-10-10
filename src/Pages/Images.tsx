//Api
import { getImages } from '../api/imagesAPI';

//Tanstack
import { useQuery } from '@tanstack/react-query';

//Loader
import Loader from '../Common/Loader';

type Image = {
  id: number;
  base64: string;
};

export default function Images() {

    const {isLoading, data : images , isError, error} = useQuery({
        queryKey: ['images'],
        queryFn: getImages,
        select: image => image.sort((a: Image, b: Image) => b.id - a.id)
    })

    if (isLoading) return <Loader/>
    else if(isError) return <div>Error: {(error as Error).message}</div>

  return images.map((img : Image) => (
    <div>
      <img src={img.base64} alt="imagensita" />
    </div>
  ))
}