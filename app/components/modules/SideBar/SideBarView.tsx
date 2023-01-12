import Link from "next/link";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";

import GrainIcon from "@mui/icons-material/Grain";

import ListNav from "./ListsNav";
import UserArea from "./UserArea";

import useMobileDetection from "@/app/hooks/mobileDetection";
import { useDrawerContext } from "@/app/stores/drawerContext";
import Image from "next/image";

const DrawerHeader = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  display: "flex",
  alignItems: "center",
  ...theme.mixins.toolbar,
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-between",
  },
}));

export default function SideBarView() {
  const { open, handleDrawerClose, drawerWidth } = useDrawerContext();
  const { isMobile } = useMobileDetection();
  return (
    <Drawer
      sx={{
        display: isMobile && !open ? "none" : "block",
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      PaperProps={{ sx: { bgcolor: "transparent", color: "white" } }}
      variant="persistent"
      anchor="left"
      open={open}>
      <DrawerHeader>
        <Image width="40" height="40" src="/logo.svg" />
        <IconButton
          sx={{ display: { md: "none" } }}
          onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Link href="/" passHref>
        <ListItem button>
          <ListItemIcon>
            <GrainIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={"Overview"} />
        </ListItem>
      </Link>
      <Divider />
      <ListNav />
      <Divider />
      <List>
        <UserArea />
      </List>
    </Drawer>
  );
}

interface ILists {
  title: string;
  slug: string;
}
