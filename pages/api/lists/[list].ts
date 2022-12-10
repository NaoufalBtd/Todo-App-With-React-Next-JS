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
  const { list } = req.query;
  const { ownerId } = req.body;

  try {
    if (!list) throw new Error("List is not defined");
    const slug = typeof list === "string" ? list : list[0];
    const data = await prisma.user.findUnique({
      where: {
        id: ownerId,
      },
      select: {
        lists: {
          where: { slug },
          select: {
            tasks: {
              where: {
                done: false,
                dueDate: {
                  gte: moment(moment().subtract(1, "days")).toISOString(),
                },
              },
            },
            title: true,
            id: true,
            icon: true,
          },
        },
      },
    });
    handleResponse(res, data);
  } catch (error) {
    handleError(res, {
      msg: "Internal Error: Error happening while fetching list data",
      data: error,
    });
  }
}
