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
  Alert,
  Collapse,
} from "@mui/material";
import {
  uploadFile,
  updateContent,
  getFile,
  getContent,
} from "../firebase/firebase.js";
import ImageCropper from "../components/ImageCropper";
import SaveIcon from "@mui/icons-material/Save";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ClearIcon from "@mui/icons-material/Clear";

export default function PhotoEditor(props) {
  const theme = useTheme();
  const [alertIsOpen, setAlertIsOpen] = useState(true);
  const [image, setImage] = useState({
    fileName: null,
    url: "",
    newFile: null,
  });
  const [editedImage, setEditedImage] = useState(null);
  const [isNewFile, setIsNewFile] = useState(false);
  const [controls, setControls] = useState({
    zoom: 1,
    rotation: 0,
  });
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!image.fileName) {
      getContent(setFileName);
    }
    if (image.fileName && !image.url) {
      getImage();
    }
  }, [image, setImage]);

  const getImage = useCallback(() => {
    getFile(image.fileName).then((imageURL) => {
      setImage({
        url: imageURL,
        newFile: null,
      });
    });
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
    console.log("upload clicked");
    console.log(editedImage);
    // const path = "/curriculum_vitae.pdf";
    // uploadFile(path, image.newFile);
    // setIsNewFile(false);
    const date = new Date();
    const dateSuffix =
      date.getFullYear().toString() +
      (date.getMonth() < 9
        ? "0" + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString()) +
      date.getDate().toString();
    console.log(dateSuffix);

    const path = image.fileName.replace(".", "_" + dateSuffix + ".");
    uploadFile(path, editedImage.newFile);
    const contentPath = "images/" + props.reference + "/file_name";
    updateContent(contentPath, "final", path);
    setIsNewFile(false);
    setImage(editedImage);
  }, [image, uploadFile, setIsNewFile, editedImage]);

  const handleFileSelection = useCallback(
    (e) => {
      let selectedFile = {};
      const target = e.target;
      const files = target.files;
      const [file] = files;
      if (file) {
        selectedFile = {
          fileName: file.name,
          url: URL.createObjectURL(file),
          newFile: file,
        };
        console.log(file);
      }
      setImage(selectedFile);
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
      input: (
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileSelection}
        />
      ),
    },
    {
      icon: <ClearIcon color="tertiary" fontSize="small" />,
      name: "Discard",
      onClick: getImage,
    },
    {
      icon: <SaveIcon color="tertiary" fontSize="small" />,
      name: "Save",
      onClick: handleFileUpload,
    },
  ];

  return (
    <Container maxWidth={false} className="h-screen">
      <div className="flex flex-col md:flex-row h-full">
        <Stack spacing={0} className="h-full md:w-1/4 items-center">
          <Typography variant="h3">Photo Editor</Typography>
          <Typography variant="h5" className="mb-8">
            {props.title}
          </Typography>
          <Paper sx={{ width: 320, maxWidth: "100%" }}>
            <MenuList
              sx={{ backgroundColor: "primary.main", color: "tertiary.main" }}
            >
              {actions.map((action) => (
                <MenuItem
                  key={action.name}
                  component="label"
                  onClick={action.onClick ? action.onClick : null}
                >
                  {action.input ? action.input : <></>}
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
                  disabled={!isNewFile}
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
                  disabled={!isNewFile}
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
          {(isNewFile && (
            <ImageCropper
              src={image.url}
              controls={controls}
              crop={crop}
              setCrop={setCrop}
              handleZoom={handleSlide}
              setImage={setEditedImage}
            />
          )) || <img width="450px" height="750px" src={image.url} alt=""></img>}
        </div>
      </div>
      <Collapse
        in={alertIsOpen}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <Alert
          severity="info"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setAlertIsOpen(false)}
            >
              Dismiss
            </Button>
          }
        >
          To use the image editor, you must upload a new image. If you would
          like to edit the current published image, you will need to reupload a
          copy.
        </Alert>
      </Collapse>
    </Container>
  );
}
