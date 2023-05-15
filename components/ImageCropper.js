import Cropper from "react-easy-crop";
import { generateImgUrl } from "./utilities/CropImage";
import { useState, useCallback } from "react";
import { Container, Stack, Slider, Typography } from "@mui/material";

export default function ImageCropper(props) {
  // const [crop, setCrop] = useState({ x: 0, y: 0 });

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      console.log(croppedArea, croppedAreaPixels);
      console.log(props.src);
      generateImgUrl(props.src, croppedAreaPixels, props.setImage);
    },
    [props.src]
  );

  const handleZoom = (val) => {
    const e = {
      target: {
        name: "zoom",
        value: val,
      },
    };
    props.handleZoom(e);
  };

  return (
    <>
      <Container className="h-5/6" sx={{ position: "relative" }}>
        <Cropper
          className=""
          image={props.src}
          crop={props.crop}
          zoom={props.controls.zoom}
          rotation={props.controls.rotation}
          aspect={9 / 16}
          cropSize={{ width: 450, height: 711 }}
          onCropChange={props.setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={handleZoom}
        />
      </Container>
    </>
  );
}
