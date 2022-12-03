import { useState, MouseEvent } from "react";

import { IconButton, Menu, MenuItem, Divider } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AddTaskModal from "./optionsModals/AddTask";
import ModifyListNameModal from "./optionsModals/ModifyListName";
import DeleteListModal from "./optionsModals/deleteList";

export default function ListOptions() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [modifyListNameOpen, setModifyListNameOpen] = useState(false);
  const [deleteListOpen, setDeleteListOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAddTaskOpen(false);
    setModifyListNameOpen(false);
    setDeleteListOpen(false);
  };

  return (
    <>
      <IconButton id="list-options" onClick={handleClick}>
        <MoreVertIcon color="secondary" sx={{ justifySelf: "flex-end" }} />
      </IconButton>
      <Menu
        id="list-options"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={() => setAddTaskOpen(true)}>
          <AddIcon fontSize="small" sx={{ pr: 0.5 }} />
          Add Task
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setModifyListNameOpen(true)}>
          <EditIcon fontSize="small" sx={{ pr: 0.5 }} />
          Change List Name
        </MenuItem>
        <MenuItem onClick={() => setDeleteListOpen(true)}>
          <DeleteIcon fontSize="small" sx={{ pr: 0.5 }} />
          Delete List
        </MenuItem>
      </Menu>
      <AddTaskModal open={addTaskOpen} handleClose={handleClose} />
      <ModifyListNameModal
        open={modifyListNameOpen}
        handleClose={handleClose}
      />
      <DeleteListModal open={deleteListOpen} handleClose={handleClose} />
    </>
  );
}
