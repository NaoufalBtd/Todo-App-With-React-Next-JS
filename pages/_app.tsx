import { NextPageContext } from "next";
import { getSession, SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Session } from "next-auth";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null | undefined }>) {
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
  try {
    const session = await getSession(ctx);
    return {
      props: {
        session,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        session: null,
      },
    };
  }
}
