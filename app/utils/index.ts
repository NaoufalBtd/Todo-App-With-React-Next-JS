import moment from "moment";
import type { ITask } from "../stores/listContext";

export function getTasksProgress(tasks: ITask[], days: number) {
  const totalTasks = tasks.filter((task) =>
    moment(task.dueDate).isBetween(
      moment().subtract(days, "d"),
      moment().toISOString()
    )
  ).length;
  const doneTasks = tasks.filter((task) => {
    if (
      moment(task.dueDate).isBetween(
        moment().subtract(30, "d"),
        moment().toISOString()
      ) &&
      task.done === true
    ) {
      return true;
    }
    return false;
  }).length;
  const doneTasksPct = (doneTasks / totalTasks) * 100;

  return { totalTasks, doneTasks, doneTasksPct };
}

export function getTasksTotal(tasks: ITask[], isDone: boolean) {
  return tasks.filter((task) => {
    if (
      moment(task.dueDate).isBetween(
        moment().subtract(30, "d"),
        moment().toISOString()
      ) &&
      task.done === isDone
    ) {
      return true;
    }
    return false;
  }).length;
}

export const getTasksNumber = (tasks: ITask[], isDone?: boolean) => {
  const tasksNumber: number[] = [];
  // get an array of the number of tasks for each day in the  last 7 days
  for (let i = 6; i >= 0; i--) {
    let count = 0;

    tasks.forEach((task) => {
      if (
        moment(task.dueDate).isSame(
          moment().subtract(i, "day").toISOString(),
          "day"
        ) &&
        (isDone === undefined || task.done === isDone)
      ) {
        count++;
      }
    });
    tasksNumber.push(count);
  }
  return tasksNumber;
};

const addTask = (tasksByLabels: IResult[], task: ITask, dayName: string) => {
  if (tasksByLabels.every((el) => el.dayName !== dayName)) {
    tasksByLabels.push({ dayName, tasks: [task] });
  } else {
    tasksByLabels.forEach((el) => {
      if (el.dayName === dayName) {
        el.tasks.push(task);
      }
    });
  }
};
function sortTasks(tasks: IResult[]) {
  const sorter = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
    "coming weeks": 8,
  };
  tasks.sort(function sortByDay(a, b) {
    let day1 = a.dayName.toLowerCase();
    let day2 = b.dayName.toLowerCase();
    return sorter[day1] - sorter[day2];
  });
}
export const splitTasksByDate = (tasks: [ITask]) => {
  let splittedTasks: IResult[] = [];
  tasks
    .filter((task) => !task.done)
    .forEach((task) => {
      if (moment().isSame(task.dueDate)) {
        addTask(splittedTasks, task, "today");
      } else if (moment().isSame(moment(task.dueDate).add(1, "d"))) {
        addTask(splittedTasks, task, "tomorrow");
      } else if (
        moment(task.dueDate).isBetween(
          moment().toISOString(),
          moment().add(7, "d")
        )
      ) {
        const dayName = new Date(task.dueDate).toLocaleString("en-us", {
          weekday: "long",
        });
        addTask(splittedTasks, task, dayName);
      } else if (moment(task.dueDate).isAfter(moment().toISOString(), "d")) {
        addTask(splittedTasks, task, "coming weeks"); //! change the label name
      }
    });
  sortTasks(splittedTasks);
  return splittedTasks;
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export const getLastSevenDaysName = () => {
  var numdays = 7; // Change it to the number of days you need
  var d = new Date();
  var n = d.getDay();
  var weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var myArray = new Array(numdays);
  for (let i = 0; i < numdays; i++) {
    myArray[i] = weekday[(n - i + numdays) % 7];
  }
  return myArray.reverse();
};

export const getWelcomeMessage = (userName: string): string => {
  const hour = new Date().getHours();
  if (hour < 11) {
    return `Good Morning, ${userName}`;
  } else if (hour < 16) {
    return `Good Afternoon, ${userName}`;
  } else if (hour <= 23) {
    return `Good Evening, ${userName}`;
  } else {
    return `Welcome Back, ${userName}`;
  }
};

interface IResult {
  dayName: string;
  tasks: ITask[];
}
