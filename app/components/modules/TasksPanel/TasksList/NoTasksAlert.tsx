import ContentPasteOffIcon from "@mui/icons-material/ContentPasteOff";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import AddTasksModal from "../Header/optionsModals/AddTask";

const useStyles = makeStyles({
  root: {
    margin: "auto",
    textAlign: "center",
    paddingTop: 100,
  },
});

export default function NoTaskAlert() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={classes.root}>
      <ContentPasteOffIcon fontSize="large" color="info" />
      <Typography>
        There Is No Tasks.{" "}
        <Button variant="text" onClick={handleClick}>
          Click Here to Add A task
        </Button>
      </Typography>
      <AddTasksModal open={open} handleClose={handleClose} />
    </div>
  );
}
