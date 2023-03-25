import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";
import { Container, Stack, Slider } from "@mui/material";

export default function ImageCropper(props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  const handleSlide = useCallback(
    (e) => {
      const target = e.target;
      const value = target.value;
      if (value >= 1) {
        setZoom(value);
      }
    },
    [setZoom]
  );

  return (
    <Container sx={{ height: "100vh", position: "relative" }}>
      <Cropper
        className="absolute"
        image={props.src}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <Slider
        className="w-4/5 md:w-2/5 absolute mb-2"
        defaultValue={zoom}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={handleSlide}
      />
    </Container>
  );
}
