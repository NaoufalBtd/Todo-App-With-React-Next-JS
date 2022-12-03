import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { handleResponse } from "@/app/utils/api";
import { handleError } from "@/app/utils/api";

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
    console.log(error);
    handleError(res, "Internal Error: Failed to change list name");
  }
}
