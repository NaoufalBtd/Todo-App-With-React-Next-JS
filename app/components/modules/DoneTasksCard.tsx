import Skeleton from "@/app/components/elements/Skeleton";
import { fetcher } from "@/app/utils/api";
import useSWR from "swr";
import Card from "../elements/Card";
import CircularProgressbar from "../elements/CirclurProgressBar";

export default function DoneTasksCard({ tasks }: { tasks: any }) {
  const { data, error } = useSWR<{
    payload: {
      doneTasksNumber: number;
      tasksNumber: number;
    };
  }>(`${process.env.SITE_URL}api/get-tasks-number`, fetcher);
  if (error || !data) return <Skeleton />;

  const { doneTasksNumber, tasksNumber } = data?.payload || {
    doneTasksNumber: 0,
    tasksNumber: 0,
  };

  const doneTasksPct =
    tasksNumber !== 0 ? Math.round((doneTasksNumber / tasksNumber) * 100) : 0;

  return (
    <Card primaryText="Completed Tasks" secondaryText={doneTasksNumber}>
      <CircularProgressbar value={doneTasksPct} />
    </Card>
  );
}
