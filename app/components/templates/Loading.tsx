import { CircularProgress, Theme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "#0b0f39",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default function LoadingTemplate() {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  );
}
