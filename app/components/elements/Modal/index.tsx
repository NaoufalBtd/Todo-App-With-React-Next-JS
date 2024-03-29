import { Box, Modal, Typography } from "@mui/material";
import { ReactNode } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 600, md: "50%", sm: "80%", xs: "90%" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({
  open,
  handleClose,
  children,
  title,
}: IProps) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {title && (
          <Typography component="h4" align="center" sx={{ pb: 4 }}>
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Modal>
  );
}

interface IProps {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  title?: string;
}
