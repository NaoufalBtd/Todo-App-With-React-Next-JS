import { handleError, handleResponse } from "@/app/utils/api";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.send("Invalid request");
    return;
  }
  const { ownerId } = req.body;

  try {
    const data = await prisma.user.findUnique({
      where: {
        id: ownerId,
      },
      select: {
        lists: {
          select: {
            title: true,
            tasks: {
              where: {
                dueDate: {
                  gte: moment(moment().subtract(1, "days")).toISOString(),
                  lte: moment(moment().add(7, "days")).toISOString(),
                },
              },
            },
          },
        },
      },
    });
    const tasks = data?.lists.reduce((acc: any, list) => {
      const mappedTasks = list.tasks.map((task) => ({
        ...task,
        listTitle: list.title,
      }));
      acc.push(...mappedTasks);
      return acc;
    }, []);
    handleResponse(res, tasks);
  } catch (error) {
    handleError(res, {
      msg: "Internal Error: Error happening while fetching list data",
      data: error,
    });
  }
}
