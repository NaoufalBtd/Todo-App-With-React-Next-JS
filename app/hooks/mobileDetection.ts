import { useState } from "react";
import useWindowDimensions from "./windowDimensions";

export default function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const mobileBreakPoint = 768;
  const { width } = useWindowDimensions();
  if (width > mobileBreakPoint && isMobile === true) {
    setIsMobile(false);
  } else if (width <= mobileBreakPoint && isMobile === false) {
    setIsMobile(true);
  }

  return { isMobile };
}
