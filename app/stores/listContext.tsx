import { ReactNode } from "react";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  Dispatch,
  useMemo,
  SetStateAction,
} from "react";

const ListContext = createContext<IList>({ title: "" });

export function ListProvider({
  children,
  listTitle,
  listTasks,
  listIcon,
  listId,
}: IProps) {
  const [title, setTitle] = useState(listTitle);
  const [tasks, setTasks] = useState(listTasks);
  const [icon, setIcon] = useState(listIcon);
  useEffect(() => {
    setTitle(listTitle);
    setTasks(listTasks);
    setIcon(listIcon);
  }, [listTitle, listTasks]);

  return (
    <ListContext.Provider value={{ title, tasks, setTasks, setTitle, listId, icon, setIcon }}>
      {children}
    </ListContext.Provider>
  );
}

export const useListContext = () => useContext(ListContext);

interface IList {
  title?: string;
  tasks?: [ITask];
  listId?: number;
  icon?: string;
  setTitle?: Dispatch<SetStateAction<string>>;
  setTasks?: Dispatch<any>;
  setIcon?: Dispatch<SetStateAction<string>>;
}
interface IProps {
  children: ReactNode;
  listTitle: string;
  listTasks: any;
  listId: number;
  listIcon: string;
}

export interface ITask {
  task: string;
  id: number;
  dueDate: string;
  done: boolean;
  listTitle?: string;
}
