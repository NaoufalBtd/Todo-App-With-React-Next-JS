import { useListContext } from "@/app/stores/listContext";
import axios from "axios";
import moment from "moment";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import Modal from "@/app/components/elements/Modal";
import ActionButtons from "@/app/components/elements/Modal/ActionButtons";
import { fetcher } from "@/app/utils/api";
import { useState } from "react";
import useSWR from "swr";

export default function AddTasksModal({
  open,
  handleClose,
  showListsMenu,
}: IProps) {
  const { listId, setTasks, title } = useListContext();
  const [isEmptyInput, setIsEmptyInput] = useState(false);
  const [selectedList, setSelectedList] = useState("");
  const { data, error } = useSWR(
    `${process.env.SITE_URL}api/get-lists`,
    fetcher
  );
  let task = "";
  let dueDate = moment().format("YYYY-MM-DD");

  const saveTask = async () => {
    if (!task) return setIsEmptyInput(true);
    try {
      const savedTask = await axios.post(
        "/api/create-task",
        {
          task,
          dueDate: moment(dueDate).endOf("d").toISOString(),
          listId: listId || selectedList,
        },
        { withCredentials: true }
      );

      const listTitle =
        data?.payload.lists.filter((list) => list.id === selectedList)[0]
          .title || title;
      setTasks &&
        setTasks((state: any) => {
          return [
            ...state,
            {
              ...savedTask.data.payload,
              listTitle,
            },
          ];
        });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const closeModal = () => {
    task = "";
    dueDate = moment().format("YYYY-MM-DD");
    handleClose();
  };

  return (
    <Modal open={open} handleClose={handleClose} title="Add a new task">
      {!listId ? (
        <FormControl fullWidth>
          <InputLabel id="list-select-label">Select Task's List</InputLabel>
          <Select
            labelId="list-select-label"
            id="list-select"
            value={selectedList}
            label="Select Task's List"
            onChange={(e: SelectChangeEvent) =>
              setSelectedList(e.target.value)
            }>
            {data?.payload.lists.map((list) => (
              <MenuItem value={list.id}>{list.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}
      <TextField
        variant="outlined"
        label="Task"
        multiline={true}
        rows={3}
        fullWidth
        error={isEmptyInput}
        helperText={isEmptyInput && "Task is required "}
        margin="normal"
        onChange={(e) => {
          const inputVal = e.target.value;
          setIsEmptyInput(!inputVal);
          task = e.target.value;
        }}
      />
      <TextField
        id="date"
        label="Due Date"
        type="date"
        color="info"
        fullWidth
        margin="normal"
        onChange={(e) => {
          dueDate = e.target.value;
        }}
        defaultValue={dueDate}
        inputProps={{
          min: moment().format("YYYY-MM-DD"),
        }}
      />
      <ActionButtons
        handleClick={saveTask}
        handleClose={closeModal}
        disabled={!listId && !selectedList}
      />
    </Modal>
  );
}

interface IProps {
  open: boolean;
  handleClose: () => void;
  showListsMenu?: boolean;
}
