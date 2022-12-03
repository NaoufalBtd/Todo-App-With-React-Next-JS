import { Box, Grid, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function Card({ primaryText, secondaryText, children }: IProps) {
  return (
    <Paper
      sx={{ display: "flex", justifyContent: "space-between", height: 200 }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Box sx={{ width: "60%" }}>{children}</Box>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}>
            <Typography sx={{ fontSize: "1rem" }} component="h3">
              {primaryText}
            </Typography>
            <Typography
              sx={{ fontSize: "3rem", fontWeight: 500 }}
              component="span">
              {secondaryText}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

interface IProps {
  primaryText: string;
  secondaryText: number;
  children?: ReactNode;
}
