import { useState, useCallback, useEffect } from "react";
import { useTheme } from "styled-components";
import {
  Stack,
  Button,
  Typography,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Divider,
} from "@mui/material";
import { uploadFile, getFile, getContent } from "../firebase/firebase.js";
import ImageCropper from "../components/ImageCropper";

export default function PhotoEditor(props) {
  const theme = useTheme();
  const [image, setImage] = useState({
    fileName: null,
    url: "",
    newFile: null,
  });
  const [isNewFile, setIsNewFile] = useState(false);

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
          <List
            className="max-w-max border-2"
            sx={{ color: "primary.main" }}
            subheader={
              <ListSubheader
                className="text-center"
                component="div"
                id="nested-list-subheader"
              >
                Options
              </ListSubheader>
            }
          >
            <Divider light={false} />
            <ListItemButton>
              <ListItemText primaryTypographyProps={{ variant: "button" }}>
                Upload New Image
              </ListItemText>
            </ListItemButton>
            <Divider light={false} />
            <ListItemButton>
              <ListItemText primaryTypographyProps={{ variant: "button" }}>
                Discard Changes
              </ListItemText>
            </ListItemButton>
            <Divider light={false} />
            <ListItemButton>
              <ListItemText primaryTypographyProps={{ variant: "button" }}>
                Publish Cropped Image
              </ListItemText>
            </ListItemButton>
          </List>
        </Stack>
        <div className="flex flex-col justify-center space-y-28 md:space-y-12 w-full h-full">
          <ImageCropper src={image.url} />
        </div>
      </div>
    </Container>
  );
}
