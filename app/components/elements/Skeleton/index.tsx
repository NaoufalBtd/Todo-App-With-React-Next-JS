import { Box, Skeleton as MuiSkeleton } from "@mui/material";

export default function Skeleton() {
  return (
    <Box>
      <MuiSkeleton animation="wave" />
      <MuiSkeleton animation="wave" />
      <MuiSkeleton animation="wave" />
    </Box>
  );
}
