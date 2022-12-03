import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";

import useMobileDetection from "@/app/hooks/mobileDetection";
import { useDrawerContext } from "@/app/stores/drawerContext";
import Bar from "../modules/MobileBar";
import SideBar from "../modules/SideBar";

export default function DashboardLayout({ children }: IProps) {
  const { open, handleDrawerOpen, drawerWidth } = useDrawerContext();
  const { isMobile } = useMobileDetection();
  useEffect(() => {
    //to keep the sidebar open in large screen
    function handleResize() {
      if (window.innerWidth > 900) {
        open || (handleDrawerOpen && handleDrawerOpen());
      }
    }

    window.addEventListener("resize", handleResize);
  });

  return (
    <Box sx={{ display: "flex", bgcolor: "#0b0f39", minHeight: "100vh" }}>
      <SideBar />
      <Box sx={{ width: "100%", display: open && isMobile ? "none" : "block" }}>
        {children}
        <Bar />
      </Box>
    </Box>
  );
}

interface IProps {
  children: ReactNode;
}
