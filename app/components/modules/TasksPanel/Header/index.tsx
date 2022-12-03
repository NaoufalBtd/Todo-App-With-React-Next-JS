import { Avatar, Typography } from "@mui/material";
import Image from "next/image";

import { useListContext } from "@/app/stores/listContext";
import { makeStyles } from "@mui/styles";

import ListOptions from "./ListOptions";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
  },
  titleArea: {
    display: "flex",
  },
  optionsIcon: {
    justifySelf: "flex-end",
  },
}));

export default function ListHeader({ showOptions }: IProps) {
  const classes = useStyle();
  const { title, icon } = useListContext();
  return (
    <div className={classes.container}>
      <div className={classes.titleArea}>
        <Avatar sx={{ bgcolor: "#90cae7", width: 45, height: 45 }}>
          <Image src={`/${icon}-icon.png`} width={40} height={35} />
        </Avatar>
        <Typography variant="h5" component="h3" sx={{ ml: 3 }}>
          {title}
        </Typography>
      </div>
      {showOptions && <ListOptions />}
    </div>
  );
}

interface IProps {
  showOptions?: boolean;
}
