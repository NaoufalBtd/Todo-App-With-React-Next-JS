import { Typography } from "@mui/material";
import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

export default function CircularProgressbar({ value }: IProps) {
  return (
    <CircularProgressbarWithChildren
      value={value}
      styles={buildStyles({
        strokeLinecap: "butt",
        pathColor: `rgba(62, 152, 199, ${value / 100})`,
        textColor: "#f88",
        trailColor: "#d6d6d6",
        backgroundColor: "#3e98c7",
      })}>
      <Typography
        component="span"
        sx={{
          fontSize: "1.4rem",
          fontWeight: 600,
          color: (theme) => theme.palette.text.info,
        }}>{`${value}%`}</Typography>
    </CircularProgressbarWithChildren>
  );
}

interface IProps {
  value: number;
}
