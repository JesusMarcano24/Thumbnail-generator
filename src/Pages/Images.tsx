import * as React from 'react';

//Api
import { getImages } from '../api/imagesAPI';

//Tanstack
import { useQuery } from '@tanstack/react-query';

type Image = {
  id: number;
  base64: string;
};

export default function Images() {

    const {isLoading, data : images , isError, error} = useQuery({
        queryKey: ['images'],
        queryFn: getImages
    })

    if (isLoading) return <div>Loading...</div>
    else if(isError) return <div>Error: {(error as Error).message}</div>

  return images.map((img : Image) => (
    <div>
      <img src={img.base64} alt="imagensita" />
    </div>
  ))
}