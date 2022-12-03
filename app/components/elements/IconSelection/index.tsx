import { styled } from "@mui/material/styles";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { Button } from "@mui/material";

const IconWrapper = styled(Button)<{
  isSelected: boolean;
}>(({ isSelected }) => ({
  padding: 10,
  "&:hover": {
    backgroundColor: "gray",
  },
  ...(isSelected && { backgroundColor: "gray" }),
}));

export default function IconSelection({
  iconType,
  setSelectedIcon,
  selectedIcon,
}: IProps) {
  const handleCLick = () => {
    setSelectedIcon(iconType);
  };
  return (
    <IconWrapper onClick={handleCLick} isSelected={iconType === selectedIcon}>
      <Image width={40} height={40} src={`/${iconType}-icon.png`} />
    </IconWrapper>
  );
}

interface IProps {
  iconType: string;
  setSelectedIcon: Dispatch<SetStateAction<string>>;
  selectedIcon: string;
}
