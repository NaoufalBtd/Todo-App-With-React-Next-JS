import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

import { handleError, handleResponse } from "@/app/utils/api";

type res = {
  error?: any;
  data?: {
    deleted?: boolean;
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

  const { taskId } = req.body;
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { done: true },
    });
    handleResponse(res, { deleted: true });
  } catch (error) {
    handleError(res, { data: { deleted: false }, msg: "Internal Error" });
  }
}
