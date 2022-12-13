import { signOut, useSession } from "next-auth/react";
import { MouseEvent, useState } from "react";

import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { stringAvatar } from "@/app/utils";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: 10,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#726b6b78",
    },
  },
});

export default function UserArea() {
  const { data: session } = useSession();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const fullName = session?.user?.name;
  return (
    <>
      <Button className={classes.container} onClick={handleClick}>
        {fullName && <Avatar {...stringAvatar(fullName)} />}
        <Typography sx={{ ml: 1 }}>{fullName}</Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <MenuItem disabled={true} onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem disabled={true} onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem
          onClick={() => signOut({ callbackUrl: process.env.SITE_URL })}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
