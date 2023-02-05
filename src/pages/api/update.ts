import { compare } from "bcrypt";
import { isValid, parseISO } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";

import updateData from "@/lib/updateData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const password = req.body.password;
  const passwordHash = process.env.PASSWORD_HASH!;

  console.log(process.env.PASSWORD_HASH);

  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "Password required" });
  }

  const passwordMatch = await compare(password, passwordHash);
  if (!passwordMatch) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const date = parseISO(req.body.date);
  if (!isValid(date)) {
    return res.status(400).json({ success: false, message: "Invalid date" });
  }

  try {
    await updateData(date);
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof Error) message = error.message;

    return res.status(500).json({ success: false, message });
  }

  return res.status(200).json({ success: true });
}
