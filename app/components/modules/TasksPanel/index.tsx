import { Divider, Paper } from "@mui/material";
import ListHeader from "./Header";
import TasksList from "./TasksList";

import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import { useDrawerContext } from "@/app/stores/drawerContext";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<IMain>(({ theme, open, drawerWidth }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `0`,
  }),
}));
const useStyles = makeStyles({
  tasksWrapper: {
    paddingBottom: 10,
  },
});

export default function TaskPanel({ showOptions }: IProps) {
  const classes = useStyles();
  const { open, drawerWidth } = useDrawerContext();
  return (
    <Main open={open} drawerWidth={drawerWidth}>
      <Paper
        elevation={1}
        sx={{
          bgcolor: "#050A2F",
          color: "white",
          p: "30px 10px",
          minHeight: "70vh",
          boxShadow: "box-shadow: 1px 2px 5px #585858;",
        }}>
        <ListHeader showOptions={showOptions} />
        <Divider sx={{ borderColor: "rgb(190 184 184 / 38%)" }} />
        <TasksList className={classes.tasksWrapper} />
      </Paper>
    </Main>
  );
}

interface IProps {
  showOptions?: boolean;
  showTaskLabel?: boolean;
}

interface IMain {
  open?: boolean;
  drawerWidth?: number | "75%";
}
