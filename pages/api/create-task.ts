import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

import { handleError, handleResponse } from "@/app/utils/api";
import { APIError } from "@/errors/apiError";
import { getSession } from "next-auth/react";

type res = {
  error?: any;
  data?: {
    task: string;
    dueDate: string;
    listId: number;
    done?: boolean;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<res | string>
) {
  if (req.method !== "POST") {
    handleError(res, { msg: "Invalid request" }, 404);
    return;
  }

  const session = await getSession({ req });

  const { task, dueDate, listId } = req.body;

  try {
    if (!session?.user?.id) throw new APIError("Session is not available");
    const newTask = await prisma.task.create({
      data: {
        task,
        dueDate,
        listId,
        done: false,
        userId: parseInt(session?.user?.id),
      },
    });
    handleResponse(res, newTask);
  } catch (error) {
    console.error(error);
    handleError(res, { data: error, msg: "Internal Error" });
  }
}
