import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import { ITask } from "@/app/stores/listContext";
import { getLastSevenDaysName, getTasksNumber } from "@/app/utils";
import { fetcher } from "@/app/utils/api";
import type { SxProps } from "@mui/material";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import useSWR from "swr";
import Skelton from "../../elements/Skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ProgressChart({ style }: IProps) {
  const { data, error } = useSWR<{
    payload: {
      tasks: ITask[];
    };
  }>(`api/get-tasks?fromDate=${moment().subtract(7, "d")}`, fetcher);

  if (error) return <p>We Cannot Fetch Data</p>;
  if (!data) return <Skelton />;

  const { tasks } = data.payload;
  const chartData = {
    labels: getLastSevenDaysName(),
    datasets: [
      {
        label: "Completed Tasks",
        data: getTasksNumber(tasks, true),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Total Tasks",
        data: getTasksNumber(tasks),
        backgroundColor: "rgba(102, 99, 132, 0.2)",
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        scales: { y: { stacked: true }, x: { stacked: true } },
        maintainAspectRatio: false,
      }}
    />
  );
}

interface IProps {
  style?: SxProps;
}
