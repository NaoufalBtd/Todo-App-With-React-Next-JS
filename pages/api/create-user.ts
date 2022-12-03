import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

import { handleError, handleResponse } from "@/app/utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    handleError(res, { msg: "Invalid request" });
    return;
  }
  const { email, fullName, password } = req.body;

  const saltRounds = 3;
  const hashedPass = await bcrypt.hash(password, saltRounds);

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPass,
      },
    });
    handleResponse(res, { id: newUser.id, fullName: newUser.fullName });
  } catch (error) {
    console.log(error);
    handleError(res, { data: error, msg: "Internal Error" });
  }
}
