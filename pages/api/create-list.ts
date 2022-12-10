import { handleError, handleResponse } from "@/app/utils/api";
import { APIError } from "@/errors/apiError";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    handleError(res, { msg: "Invalid request" }, 404);
    return;
  }
  const session = await getSession({ req });
  const { title, description, icon } = req.body;
  const slug = stringToSlug(title);
  try {
    if (!session?.user?.id) throw new APIError("Session is not available");
    if (!title) throw new Error("The list name isn't defined");
    const newList = await prisma.list.create({
      data: {
        title,
        description,
        ownerId: parseInt(session.user.id),
        icon,
        slug,
      },
    });
    handleResponse(res, newList);
  } catch (error) {
    console.log(error);
    handleError(res, { data: error, msg: "Internal Error" });
  }
}

function stringToSlug(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}
