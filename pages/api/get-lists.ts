import { handleError, handleResponse } from "@/app/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    handleError(res, { msg: "Invalid Request" }, 404);
    return;
  }

  try {
    const lists = await prisma.list.findMany({
      select: {
        id: true,
        title: true,
      },
    });
    handleResponse(res, { lists });
  } catch (error) {
    handleError(res, {
      msg: "Internal Error: Error happening while fetching list data",
      data: error,
    });
  }
}
