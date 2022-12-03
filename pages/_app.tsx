import "../styles/globals.css";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { createTheme, ThemeProvider, ThemeOptions } from "@mui/material/styles";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const theme = createTheme({
    typography: {
      body1: {
        color: "#ffff",
      },
    },
    palette: {
      mode: "dark",
      background: {
        default: "#0b0f39",
        paper: "#212754",
      },
      text: { primary: "#fff", secondary: "#fff", info: "#e22f73" },
    },
  });
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
export async function getInitialProp(ctx: NextPageContext) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
