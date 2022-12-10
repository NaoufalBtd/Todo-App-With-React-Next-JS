import { handleError, handleResponse } from "@/app/utils/api";
import { APIError } from "@/errors/apiError";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    handleError(res, { msg: "Invalid request" });
    return;
  }
  const session = await getSession({ req });
  try {
    if (!session?.user?.id) throw new APIError("Session is not available");
    const data = await prisma.user.findUnique({
      where: {
        id: Number(session.user.id),
      },
      select: {
        lists: {
          select: {
            id: true,
            title: true,
            description: true,
            slug: true,
            icon: true,
          },
        },
      },
    });
    handleResponse<typeof data>(res, data);
  } catch (error) {
    handleError(res, { msg: "Internal Error" });
  }
}
