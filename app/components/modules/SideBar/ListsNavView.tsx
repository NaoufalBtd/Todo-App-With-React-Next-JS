import type { IList } from "@/app/stores/drawerContext";
import Image from "next/image";
import Link from "next/link";

import { List, ListItem, ListItemText, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ListItemIcon from "@mui/material/ListItemIcon";

import { grey } from "@mui/material/colors";

import { Dispatch, SetStateAction } from "react";
import AddListModal from "./AddListModal";

export default function ListsNavView({
  lists,
  handleOpen,
  handleClose,
  setAreCatsLoading,
  setTaskCats,
  addListModalOpen,
}: IListsNavView) {
  return (
    <>
      <List sx={{ minHeight: "56vh", overflowY: "auto" }}>
        <ListItem>
          <Typography>Lists</Typography>
        </ListItem>
        {lists?.map((el, index) => (
          <Link href={`/list/${el.slug}`} key={index} passHref>
            <ListItem button>
              <Image src={`/${el.icon}-icon.png`} width={23} height={23} />
              <ListItemText sx={{ ml: 2 }} primary={el.title} />
            </ListItem>
          </Link>
        ))}
        <ListItem button onClick={handleOpen}>
          <ListItemIcon>
            <AddIcon sx={{ color: grey[500] }} />
          </ListItemIcon>
          <ListItemText
            primary="Add List"
            sx={{ color: grey[500] }}></ListItemText>
        </ListItem>
      </List>

      <AddListModal
        open={addListModalOpen}
        handleClose={handleClose}
        setTaskCats={setTaskCats}
        setAreCatsLoading={setAreCatsLoading}
      />
    </>
  );
}

interface IListsNavView {
  lists: IList[] | undefined;
  addListModalOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  setTaskCats: Dispatch<SetStateAction<IList[]>>;
  setAreCatsLoading: Dispatch<SetStateAction<boolean>>;
}
