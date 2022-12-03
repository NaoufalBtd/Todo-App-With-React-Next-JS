import React from "react";
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

export default function ProgressRing({
  outerCircleVal,
  innerCircleVal,
}: IProps) {
  return (
    <CircularProgressbarWithChildren
      value={outerCircleVal}
      strokeWidth={6}
      styles={buildStyles({
        pathColor: "rgb(70 0 255)",
        trailColor: "transparent",
      })}>
      {/*
          Width here needs to be (100 - 2 * strokeWidth)%
          in order to fit exactly inside the outer progressbar.
        */}

      <div style={{ width: "82%" }}>
        <CircularProgressbar
          value={innerCircleVal}
          styles={buildStyles({
            trailColor: "transparent",
            pathColor: "rgb(159 82 173)",
          })}
        />
      </div>
    </CircularProgressbarWithChildren>
  );
}

interface IProps {
  outerCircleVal: number;
  innerCircleVal: number;
}
