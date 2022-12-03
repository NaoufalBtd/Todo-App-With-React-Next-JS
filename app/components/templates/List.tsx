import DashboardLayout from "../layouts/DashboardLayout";
import List from "../modules/TasksPanel";
import { DrawerProvider } from "../../stores/drawerContext";
import { ListProvider } from "@/app/stores/listContext";

export default function ListTemplate({
  listTitle,
  listTasks,
  listId,
  listIcon,
}: IProps) {
  return (
    <ListProvider
      listTitle={listTitle}
      listTasks={listTasks}
      listId={listId}
      listIcon={listIcon}>
      <DrawerProvider>
        <DashboardLayout>
          <List showOptions={true} />
        </DashboardLayout>
      </DrawerProvider>
    </ListProvider>
  );
}

interface IProps {
  listTitle: string;
  listTasks: [];
  listId: number;
  listIcon: string;
}
