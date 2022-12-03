import { handleError, handleResponse } from "@/app/utils/api";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    handleError(res, { msg: "Invalid Request" }, 404);
    return;
  }

  const { dueDate } = req.query;

  try {
    const session = await getSession({ req });
    if (!session?.user?.id) throw new Error();

    const userId = parseInt(session.user.id);
    const tasksNumber = await prisma.task.count({
      where: {
        userId,
      },
    });
    const doneTasksNumber = await prisma.task.count({
      where: {
        userId,
        done: true,
        dueDate: typeof dueDate === "string" ? dueDate : undefined,
      },
    });
    handleResponse(res, { tasksNumber, doneTasksNumber });
  } catch (error) {
    handleError(res, {
      msg: "Internal Error: Error happening while fetching list data",
      data: error,
    });
  }
}
