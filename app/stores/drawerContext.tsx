import { Dispatch, ReactNode } from "react";
import { useState, createContext, useContext } from "react";
import useMobileDetection from "../hooks/mobileDetection";

const DrawerContext = createContext<IDrawer | any>(null);

export function DrawerProvider({ children }: IProps) {
  const [open, setOpen] = useState(true);
  const [lists, setLists] = useState<IList[] | []>([]);
  const [areListsLoading, setAreListsLoading] = useState(false);
  const { isMobile } = useMobileDetection();
  let drawerWidth: number | "100%" = 240;

  //todo: make a single source for breakpoint (ex: isMobile) and make it global
  if (isMobile) drawerWidth = "100%";

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <DrawerContext.Provider
      value={{
        open,
        handleDrawerOpen,
        handleDrawerClose,
        drawerWidth,
        lists,
        setLists,
        areListsLoading,
        setAreListsLoading,
      }}>
      {children}
    </DrawerContext.Provider>
  );
}

export const useDrawerContext = (): IDrawer => useContext(DrawerContext);

interface IDrawer {
  open: boolean;
  handleDrawerOpen?: () => void;
  handleDrawerClose?: () => void;
  drawerWidth?: number | "100%";
  lists?: IList[];
  setLists?: Dispatch<IList[] | ((state: IList[]) => IList[])>;
  areListsLoading: boolean;
  setAreListsLoading: Dispatch<boolean>;
}

export interface IList {
  title: string;
  description: string;
  id: number;
  slug: string;
  icon: string;
}
interface IProps {
  children: ReactNode;
}
