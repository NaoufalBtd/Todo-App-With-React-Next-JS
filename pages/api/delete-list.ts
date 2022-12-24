import { handleError, handleResponse } from "@/app/utils/api";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    handleError(res, { msg: "Invalid Request" }, 404);
    return;
  }
  const { listId } = req.body;

  try {
    await prisma.list.delete({
      where: {
        id: listId,
      },
    });
    handleResponse(res, { deleted: true });
  } catch (error) {
    console.error(error);
    handleError(res, { msg: "Internal Error", data: error });
  }
}
