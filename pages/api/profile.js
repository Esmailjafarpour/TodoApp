import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { getSession } from "next-auth/react";
import { verifyPassword } from "@/utils/auth";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB!" });
  }

  const session = await getSession({ req });

  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "Your are not logged in!" });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    res.status(404).json({ status: "failed", message: "user doesn't exist!" });
  }

  if (req.method === "POST") {
    const { name, lastName, password } = req.body;
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      res
        .status(422)
        .json({ status: "failed", message: "password is incorrect!" });
    }

    user.name = name;
    user.lastName = lastName;
    user.save();

    res
      .status(200)
      .json({
        status: "success",
        data: { name, lastName, email: session.user.email },
      });
  } else if (req.method === "GET") {
    res
      .status(200)
      .json({
        status: "success",
        data: { name: user.name, lastName: user.lastName, email: user.email },
      });
  }
}

export default handler;
