import { handleError, handleResponse } from "@/app/utils/api";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import moment from "moment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.send("Invalid request");
    return;
  }

  let { fromDate } = req.query;
  fromDate = typeof fromDate === "string" ? fromDate : undefined;
  try {
    const session = await getSession({ req });
    if (!session?.user?.id) throw new Error("Cannot find user id");

    if (fromDate && !moment(fromDate).isValid())
      throw new Error("The start date is not a valid date");

    const userId = parseInt(session.user.id);

    const tasks = await prisma.task.findMany({
      where: {
        userId,
        dueDate: { gte: moment(fromDate).startOf("d").toISOString() },
      },
    });
    handleResponse(res, { tasks });
  } catch (error) {
    handleError(res, {
      msg: "Internal Error: Error happening while fetching Tasks data",
      data: error,
    });
  }
}
