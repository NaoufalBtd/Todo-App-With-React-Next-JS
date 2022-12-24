import { handleError, handleResponse } from "@/app/utils/api";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.send("Invalid request");
    return;
  }

  const { listId, listTitle } = req.body;

  try {
    const modifiedList = await prisma.list.update({
      where: {
        id: listId,
      },
      data: {
        title: listTitle,
      },
    });
    handleResponse(res, modifiedList);
  } catch (error) {
    console.error(error);
    handleError(res, { msg: "Internal Error: Failed to change list name" });
  }
}
