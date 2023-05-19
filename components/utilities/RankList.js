import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { updateContent, getContent } from "../../firebase/firebase.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function RankList(props) {
  const [list, setList] = useState(props.list || []);
  const [newValue, setNewValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const inputType = {
    email_list: "email",
    phone_list: "tel",
  }[props.listType];

  const setCurrentContent = useCallback(
    (content) => {
      try {
        setList(content.contact[props.listType]);
      } catch {
        setList([]);
      }
    },
    [setList]
  );

  const handleChange = useCallback(
    (e) => {
      const target = e.target;
      let value = target.value;
      validateInput(value);
      if (inputType === "tel") {
        if (value.length > newValue.length) {
          value = formatInput(value);
        }
      }
      setNewValue(value);
    },
    [newValue, setNewValue, setIsValid]
  );

  const validateInput = (value) => {
    let inputIsValid = false;
    if (inputType === "email") {
      inputIsValid = /\w+@\w+\.\w+/.test(value);
    }
    if (inputType === "tel") {
      inputIsValid = /^\(\d{3}\)\s\d{3}\-\d{4}$/.test(value);
    }
    if (!value || value === "") {
      inputIsValid = true;
    }
    setIsValid(inputIsValid);
  };

  const formatInput = (value) => {
    let formattedInput = value.replace(/\(|\)|-|\s|\D/g, "").slice(0, 10);
    let zipCode = formattedInput.slice(0, 3);
    let prefix = formattedInput.slice(3, 6);
    let suffix = formattedInput.slice(6, 10);
    if (formattedInput.length > 6) {
      formattedInput = `(${zipCode}) ${prefix}-${suffix}`;
    } else if (formattedInput.length > 3) {
      formattedInput = `(${zipCode}) ${prefix}`;
    } else if (formattedInput.length > 0) {
      formattedInput = `(${zipCode}) `;
    }

    return formattedInput;
  };

  const addEntry = useCallback(() => {
    const order = list ? list.reduce((a, b) => Math.max(a, b.order), 0) + 1 : 1;
    const newEntry = {
      order: order,
      value: newValue,
    };
    const updatedList = list ? [...list, newEntry] : [newEntry];

    if (isValid) {
      updateContent("contact/" + props.listType, "final", updatedList).then(
        () => {
          setNewValue("");
        }
      );
    } else {
      toast.error(
        "Input is not valid. Please ensure that it matches the format of the example."
      );
    }
  }, [list, newValue, isValid]);

  const removeEntry = useCallback(
    (valueToRemove) => {
      const idx = list.findIndex(
        (listObject) => listObject.value === valueToRemove
      );
      let updatedList = JSON.parse(JSON.stringify(list));
      const removedObj = updatedList.splice(idx, 1)[0];
      updatedList.forEach((listObj) => {
        if (listObj.order > removedObj.order) {
          listObj.order -= 1;
        }
      });

      updateContent("contact/" + props.listType, "final", updatedList);
    },
    [list]
  );

  useEffect(() => {
    getContent(setCurrentContent);
  }, [setCurrentContent]);

  const moveUp = (order) => {
    if (order > 1) {
      let currentIdx = list.findIndex((a) => a.order === order);
      let destinationIdx = list.findIndex((b) => b.order === order - 1);
      let updatedList = JSON.parse(JSON.stringify(list));
      updatedList[currentIdx]["order"] = order - 1;
      updatedList[destinationIdx]["order"] = order;
      updateContent("contact/" + props.listType, "final", updatedList);
    }
  };

  const moveDown = (order) => {
    if (order < list.reduce((a, b) => Math.max(a, b.order), 1)) {
      let currentIdx = list.findIndex((a) => a.order === order);
      let destinationIdx = list.findIndex((b) => b.order === order + 1);

      let updatedList = JSON.parse(JSON.stringify(list));
      updatedList[currentIdx]["order"] = order + 1;
      updatedList[destinationIdx]["order"] = order;
      updateContent("contact/" + props.listType, "final", updatedList);
    }
  };

  return (
    <List
      dense={true}
      className="h-[270px]"
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        overflow: "auto",
      }}
    >
      <ListItem
        key={list ? list.reduce((a, b) => Math.max(a, b.order), 0) + 1 : 1}
        dense={true}
        disableGutters={true}
      >
        <TextField
          size="small"
          value={newValue}
          onChange={handleChange}
          type={inputType}
          error={!isValid}
          helperText={
            inputType === "email"
              ? "E.g. example@domain.com"
              : "E.g. (xxx) xxx-xxxx"
          }
        />
        <IconButton
          disabled={newValue.length < 1}
          disableFocusRipple={true}
          disableRipple={true}
          onClick={addEntry}
          className=" absolute top-0 right-6 pr-4 pt-2"
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </ListItem>
      {list &&
        list.length > 0 &&
        list
          .sort((a, b) => a.order > b.order)
          .map((entry) => (
            <ListItem
              key={entry.order}
              disableGutters
              secondaryAction={
                <Stack direction="row">
                  <IconButton onClick={() => moveDown(entry.order)}>
                    <ExpandMoreIcon />
                  </IconButton>
                  <IconButton onClick={() => moveUp(entry.order)}>
                    <ExpandLessIcon />
                  </IconButton>
                  <IconButton onClick={() => removeEntry(entry.value)}>
                    <RemoveIcon />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemText primary={entry.value} />
            </ListItem>
          ))}
    </List>
  );
}
