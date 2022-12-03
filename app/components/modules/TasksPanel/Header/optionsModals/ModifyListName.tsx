import { useDrawerContext } from "@/app/stores/drawerContext";
import { useListContext } from "@/app/stores/listContext";
import axios from "axios";

import { TextField } from "@mui/material";

import Modal from "@/app/components/elements/Modal";
import ActionButtons from "@/app/components/elements/Modal/ActionButtons";

export default function ModifyListNameModal({ open, handleClose }: IProps) {
  const { listId, setTitle, title } = useListContext();
  const { setLists } = useDrawerContext();
  let listTitle = title || "";

  const closeModal = () => {
    listTitle = "";
    handleClose();
  };
  const saveTask = async () => {
    try {
      await axios.post("/api/modify-list-name", {
        listTitle,
        listId,
      });
      setTitle && setTitle(listTitle);
      setLists &&
        setLists((state) =>
          state.map((el) => {
            if (el.id === listId) {
              el.title = listTitle;
            }
            return el;
          })
        );
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal open={open} handleClose={handleClose} title="Modify List Name">
      <TextField
        variant="outlined"
        label="List Name"
        fullWidth
        defaultValue={listTitle}
        margin="normal"
        onChange={(e) => {
          listTitle = e.target.value;
        }}
      />

      <ActionButtons handleClick={saveTask} handleClose={closeModal} />
    </Modal>
  );
}

interface IProps {
  open: boolean;
  handleClose: () => void;
}
