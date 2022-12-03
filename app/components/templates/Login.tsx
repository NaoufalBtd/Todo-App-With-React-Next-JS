import { useState } from "react";
import {
  Avatar,
  CssBaseline,
  Paper,
  Box,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Snackbar,
  Alert,
} from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import LoginInputs from "../modules/LoginInputs";
import SignUpInputs from "../modules/SignUpInputs";
import Image from "next/image";

export default function LoginTemplate() {
  const [open, setOpen] = useState(false);
  //todo: find a better name for navigationVal
  const [navigationVal, setNavigationVal] = useState(0);
  const [alertMsg, setAlertMsg] = useState("");

  const handleAlertClose = () => {
    setOpen(false);
  };
  const handleSignUp = () => {
    setNavigationVal(0);
    setAlertMsg("Sign up successfully");
    setOpen(true);
  };
  const handleError = (err: { msg: string; data?: any }) => {
    setAlertMsg(err.msg);
    setOpen(true);
  };
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/app.webp)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Image width="40" height="40" src="/logo.svg" />

            <BottomNavigation
              sx={{ borderRadius: 8, mt: 3 }}
              showLabels
              value={navigationVal}
              onChange={(event, newValue) => {
                setNavigationVal(newValue);
              }}>
              <BottomNavigationAction label="Sign in" icon={<LoginIcon />} />
              <BottomNavigationAction
                label="Sign Up"
                icon={<PersonAddAltIcon />}
              />
            </BottomNavigation>
            {navigationVal ? (
              <SignUpInputs onSignUp={handleSignUp} onError={handleError} />
            ) : (
              <LoginInputs onError={handleError} />
            )}
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleAlertClose}>
        <Alert
          severity="success"
          onClose={handleAlertClose}
          sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
