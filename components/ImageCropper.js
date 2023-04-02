import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";
import { Container, Stack, Slider, Typography } from "@mui/material";

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
    <>
      <Container className="h-5/6" sx={{ position: "relative" }}>
        <Cropper
          className=""
          image={props.src}
          crop={crop}
          zoom={zoom}
          aspect={9 / 16}
          cropSize={{ width: 450, height: 711 }}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <div className="h-full flex flex-row items-center">
          <Typography
            className="-rotate-90"
            variant="subtitle1"
            sx={{ color: "white" }}
          >
            Zoom
          </Typography>
          <Slider
            className="h-1/3 mt-2 mb-2"
            orientation="vertical"
            color="tertiary"
            defaultValue={zoom}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={handleSlide}
            min={1}
            max={3}
            step={0.1}
          />
        </div>
      </Container>
    </>
  );
}
