import axios from "axios";
import { useRef } from "react";

import { FormControlLabel, FormGroup, Typography } from "@mui/material";

import CheckBoxBtn from "../CheckBoxBtn";

import { useListContext } from "@/app/stores/listContext";
import { CalendarToday } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#8124475c",
      borderRadius: 5,
      "& .task-label": {
        visibility: "visible",
      },
    },
  },
  label: {
    color: "red",
    paddingLeft: 10,
    display: "flex",
    alignContent: "center",
  },
}));

export default function TaskBox({
  className,
  taskTitle: taskTitle = "",
  taskLabel,
  isDone,
  taskId,
}: IProps) {
  const classes = useStyles();
  const { setTasks } = useListContext();
  const checkBoxWrapper = useRef<HTMLDivElement | null>(null);
  const onCheckTask = async () => {
    await axios.post("/api/complete-task", {
      taskId,
    });
    checkBoxWrapper.current && checkBoxWrapper.current.remove();
    setTasks &&
      setTasks((state) =>
        state.map((task) => {
          if (task.id === taskId) {
            task.done = true;
          }
          return task;
        })
      );
  };

  return (
    <div className={`${classes.root} ${className}`} ref={checkBoxWrapper}>
      <FormGroup sx={{ width: "fit-content" }}>
        <FormControlLabel
          control={<CheckBoxBtn handleCheck={onCheckTask} />}
          label={taskTitle}
        />
      </FormGroup>
      {Boolean(taskLabel) && (
        <Typography
          component="span"
          color="#e22f73"
          sx={{
            display: "flex",
            alignItems: "center",
            visibility: "hidden",
            ml: 2,
          }}
          className="task-label">
          {" "}
          <CalendarToday fontSize="small" sx={{ marginRight: 1 }} /> {taskLabel}
        </Typography>
      )}
    </div>
  );
}

interface IProps {
  className: string;
  isDone: boolean;
  taskTitle: string;
  taskLabel?: string | false;
  taskId: number;
}
