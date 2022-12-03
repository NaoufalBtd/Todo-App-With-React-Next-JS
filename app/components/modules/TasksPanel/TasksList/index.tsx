import { Typography } from "@mui/material";

import TaskBox from "../../../elements/TaskBox";

import Skeleton from "@/app/components/elements/Skeleton";
import { useListContext } from "@/app/stores/listContext";
import { splitTasksByDate } from "@/app/utils";
import { makeStyles } from "@mui/styles";
import NoTaskAlert from "./NoTasksAlert";

const useStyles = makeStyles((theme) => ({
  divWrapper: {
    marginTop: 20,
  },
  checkboxWrapper: {
    marginLeft: 20,
    padding: 5,
  },
}));

export default function TasksList({ className }: { className?: string }) {
  const classes = useStyles();
  const { tasks } = useListContext();
  const data = tasks ? splitTasksByDate(tasks) : [];
  if (!data.length) {
    return <NoTaskAlert />;
  }
  return (
    <div className={className}>
      {data.map((el) => {
        return (
          <div className={classes.divWrapper} key={Math.random() * 200}>
            <Typography ml={2}>{el.dayName}</Typography>
            {el.tasks ? (
              <>
                {el.tasks.map((elem) => {
                  if (!elem.done) {
                    return (
                      <>
                        <TaskBox
                          className={classes.checkboxWrapper}
                          taskTitle={elem.task}
                          isDone={elem.done}
                          taskId={elem.id}
                          key={elem.id}
                          taskLabel={
                            elem?.listTitle ||
                            (el.dayName === "coming weeks" &&
                              elem.dueDate.split("T")[0])
                          }
                        />
                      </>
                    );
                  }
                })}
                <Typography sx={{ textAlign: "center" }}>
                  {el.tasks.filter((t) => !t.done).length} tasks
                </Typography>
              </>
            ) : (
              <Skeleton />
            )}
          </div>
        );
      })}
    </div>
  );
}
