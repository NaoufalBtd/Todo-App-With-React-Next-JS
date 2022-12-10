import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

import { useDrawerContext } from "@/app/stores/drawerContext";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100vw - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Bar() {
  const { open, handleDrawerOpen, drawerWidth } = useDrawerContext();
  return (
    <AppBar
      position="fixed"
      open={open}
      drawerWidth={drawerWidth || "100%"}
      sx={{
        top: "auto",
        bottom: 0,
        display: { sm: open ? "none" : "block", md: "none" },
      }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth: number | "100%";
}

interface IProps {
  isOpen?: boolean;
  handleDrawerOpen: () => void;
}
