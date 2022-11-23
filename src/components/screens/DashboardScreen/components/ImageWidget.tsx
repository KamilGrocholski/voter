import { useState } from "react";
// import { convertToBase64 } from "../../../../utils/convertToBase64.js";
// import { env } from "../../../../env/client.mjs";
import Image from 'next/image'

const ImageWidget: React.FC = () => {
  // const [image, setImage] = useState<string | undefined>(undefined)

  // const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   convertToBase(e, setImage)
  // }

  return (
    <>
      {/* <input 
        hidden={true}
        type='file'
        onChange={handleSetImage}
      />
      <Image 
        src={image?.toString() ?? ''}
        alt='xd'
      /> */}
    </>
  )
}

export default ImageWidget