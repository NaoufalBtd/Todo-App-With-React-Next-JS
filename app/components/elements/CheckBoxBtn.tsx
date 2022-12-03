import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Checkbox } from "@mui/material";

import { green, grey } from "@mui/material/colors";

interface IProps {
  handleCheck: () => void;
}

export default function CheckBoxBtn({ handleCheck }: IProps) {
  return (
    <Checkbox
      onClick={handleCheck}
      icon={<UncheckedIcon sx={{ color: grey[50], fontSize: 30 }} />}
      checkedIcon={<CheckCircleIcon sx={{ color: green[700], fontSize: 30 }} />}
    />
  );
}
