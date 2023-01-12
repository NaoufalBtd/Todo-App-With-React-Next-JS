import Modal from "@/app/components/elements/Modal";
import { IList, useDrawerContext } from "@/app/stores/drawerContext";
import {
  Alert,
  Button,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import IconSelection from "../../elements/IconSelection";

export default function AddListModal({
  open,
  handleClose,
  setTaskCats,
  setAreCatsLoading,
}: IProps) {
  const { setLists } = useDrawerContext();
  const [selectedIcon, setSelectedIcon] = useState("");
  const [title, setTitle] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  let description = "";

  const handleSave = async () => {
    if (!selectedIcon) return setAlertOpen(true);
    setAreCatsLoading(true);

    const response = await axios.post<{ payload: IList; isError: boolean }>(
      "/api/create-list",
      {
        title,
        description,
        icon: selectedIcon,
      },
      { withCredentials: true }
    );
    if (response.data.isError || !setLists) {
      console.error("Failed To add a List!");
    } else {
      setTaskCats((state) => [...state, response.data.payload]);
      setAreCatsLoading(!response.data);
    }

    handleClose();
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const handleCancel = () => {
    setTitle("");
    description = "";
    handleClose();
  };

  return (
    <Modal title="Add New Tasks List" open={open} handleClose={handleClose}>
      <TextField
        variant="outlined"
        label="List Name"
        fullWidth
        margin="normal"
        onChange={(e) => {
          const titleVal = e.target.value;
          setTitle(titleVal);
          setIsInputEmpty(!titleVal);
        }}
      />
      <TextField
        variant="outlined"
        label="description"
        multiline
        rows={2}
        fullWidth
        margin="normal"
        onChange={(e) => {
          description = e.target.value;
        }}
      />
      <br />
      <Typography>Choose Icon: </Typography>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}>
        {listIcons.map((icon) => (
          <IconSelection
            key={icon.label}
            selectedIcon={selectedIcon}
            iconType={icon.label}
            setSelectedIcon={setSelectedIcon}
          />
        ))}
      </Paper>
      <br />
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isInputEmpty}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </Stack>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}>
        <Alert
          severity="error"
          onClose={handleAlertClose}
          sx={{ width: "100%" }}>
          No Icon is Selected
        </Alert>
      </Snackbar>
    </Modal>
  );
}

const listIcons = [
  {
    label: "travel",
  },
  {
    label: "idea",
  },
  {
    label: "job",
  },
  {
    label: "event",
  },
  {
    label: "todo",
  },
  {
    label: "study",
  },
];

interface IProps {
  open: boolean;
  handleClose: () => void;
  setTaskCats: Dispatch<SetStateAction<IList[]>>;
  setAreCatsLoading: Dispatch<SetStateAction<boolean>>;
}
