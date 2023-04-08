import { useState, useCallback, useEffect } from "react";
import { useTheme } from "styled-components";
import {
  Stack,
  Button,
  Typography,
  Container,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Paper,
  Slider,
  Divider,
} from "@mui/material";
import { uploadFile, getFile, getContent } from "../firebase/firebase.js";
import ImageCropper from "../components/ImageCropper";
import SaveIcon from "@mui/icons-material/Save";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ClearIcon from "@mui/icons-material/Clear";

export default function PhotoEditor(props) {
  const theme = useTheme();
  const [image, setImage] = useState({
    fileName: null,
    url: "",
    newFile: null,
  });
  const [isNewFile, setIsNewFile] = useState(false);
  const [controls, setControls] = useState({
    zoom: 1,
    rotation: 0,
  });

  useEffect(() => {
    if (!image.fileName) {
      getContent(setFileName);
    }
    if (image.fileName) {
      getFile(image.fileName).then((imageURL) => {
        setImage({
          url: imageURL,
          newFile: null,
        });
      });
    }
  }, [image, setImage]);

  const setFileName = useCallback(
    (content) => {
      let fileName = content.images[props.reference].file_name;
      const updatedImage = { ...image };
      updatedImage["fileName"] = fileName;
      setImage(updatedImage);
    },
    [props.reference, image, setImage]
  );

  const handleFileUpload = useCallback(() => {
    const path = "/curriculum_vitae.pdf";
    uploadFile(path, image.newFile);
    setIsNewFile(false);
  }, [image, uploadFile, setIsNewFile]);

  const handleFileSelection = useCallback(
    (e) => {
      let selectedFile = {};
      const target = e.target;
      const files = target.files;
      const [file] = files;
      if (file) {
        selectedFile = {
          url: URL.createObjectURL(file),
          newFile: file,
        };
      }
      setPdf(selectedFile);
      setIsNewFile(true);
    },
    [image, setImage]
  );

  const handleSlide = useCallback(
    (e) => {
      const target = e.target;
      const name = target.name;
      const value = target.value;
      const newControls = { ...controls };
      newControls[name] = value;
      setControls(newControls);
    },
    [controls, setControls]
  );

  const actions = [
    {
      icon: <FileUploadIcon color="tertiary" fontSize="small" />,
      name: "Upload",
    },
    { icon: <ClearIcon color="tertiary" fontSize="small" />, name: "Discard" },
    { icon: <SaveIcon color="tertiary" fontSize="small" />, name: "Save" },
  ];

  return (
    <Container maxWidth={false} className="h-screen">
      <div className="flex flex-col md:flex-row h-full">
        <Stack spacing={0} className="h-full md:w-1/4 items-center">
          <Typography variant="h3">Photo Editor</Typography>
          <Typography variant="h5" className="mb-8">
            {props.title}
          </Typography>

          <Stack className="hidden" direction="row" spacing={1}>
            <Button component="label" variant="outlined">
              Upload
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileSelection}
              />
            </Button>
            <Button
              name={props.reference}
              onClick={handleFileUpload}
              variant="outlined"
            >
              Publish
            </Button>
          </Stack>
          <Paper sx={{ width: 320, maxWidth: "100%" }}>
            <MenuList
              sx={{ backgroundColor: "primary.main", color: "tertiary.main" }}
            >
              {actions.map((action) => (
                <MenuItem key={action.name}>
                  <ListItemIcon>{action.icon}</ListItemIcon>
                  <ListItemText>{action.name}</ListItemText>
                </MenuItem>
              ))}
              <Divider />
              <MenuItem key="zoom-slider" className="flex flex-col items-start">
                <Typography id="zoom-label" gutterBottom={true}>
                  Zoom
                </Typography>
                <Slider
                  name="zoom"
                  className=""
                  color="tertiary"
                  defaultValue={0}
                  value={controls.zoom}
                  onChange={handleSlide}
                  aria-labelledby="zoom-label"
                  valueLabelDisplay="auto"
                  valueLabelFormat={(val) => Math.round(val * 100) + "%"}
                  min={1}
                  max={3}
                  step={0.1}
                />
              </MenuItem>
              <MenuItem
                key="rotation-slider"
                className="flex flex-col items-start"
              >
                <Typography id="rotation-label" gutterBottom={true}>
                  Rotation
                </Typography>
                <Slider
                  name="rotation"
                  className=""
                  color="tertiary"
                  defaultValue={0}
                  onChange={handleSlide}
                  aria-labelledby="rotation-label"
                  valueLabelDisplay="auto"
                  min={-90}
                  max={90}
                  step={1}
                />
              </MenuItem>
            </MenuList>
          </Paper>
        </Stack>
        <div className="flex flex-row justify-center items-center space-y-28 md:space-y-12 w-full h-full">
          <ImageCropper
            src={image.url}
            controls={controls}
            handleZoom={handleSlide}
          />
        </div>
      </div>
    </Container>
  );
}
