import { Button, Stack } from "@mui/material";

export default function ActionButtons({
  handleClick,
  handleClose,
  disabled,
}: IProps) {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <Button variant="contained" onClick={handleClick} disabled={disabled}>
        Save
      </Button>
      <Button variant="outlined" onClick={handleClose}>
        Cancel
      </Button>
    </Stack>
  );
}

interface IProps {
  handleClick: () => void;
  handleClose: () => void;
  disabled?: boolean;
}
