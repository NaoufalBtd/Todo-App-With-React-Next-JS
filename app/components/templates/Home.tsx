import { ListProvider } from "@/app/stores/listContext";
import { Divider, Grid, Paper } from "@mui/material";
import DashboardLayout from "../layouts/DashboardLayout";
import List from "../modules/TasksPanel";

import { DrawerProvider } from "../../stores/drawerContext";
import DoneTasksCard from "../modules/DoneTasksCard";
import KarmaLevelCard from "../modules/KarmaLevelCard";
import ProgressChart from "../modules/ProgressChart";

export default function Home({ tasks }) {
  return (
    <ListProvider
      listTitle={"Overview"}
      listTasks={tasks}
      listId={0}
      listIcon={"overview"}>
      <DrawerProvider>
        <DashboardLayout>
          <>
            <List showOptions={false} showTaskLabel={true} />
            <Grid container sx={{ p: 4 }} spacing={3}>
              <Grid item sm={7} xs={12}>
                <Paper
                  elevation={3}
                  sx={{ bgcolor: "#050A2F", height: "100%", minHeight: 300 }}>
                  <ProgressChart />
                </Paper>
              </Grid>
              <Grid item sm={5} xs={12}>
                <KarmaLevelCard />
                <Divider sx={{ mt: 2, mb: 2 }} />
                <DoneTasksCard tasks={tasks} />
              </Grid>
            </Grid>
          </>
        </DashboardLayout>
      </DrawerProvider>
    </ListProvider>
  );
}
