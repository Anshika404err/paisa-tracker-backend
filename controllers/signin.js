// ✅ Fixed signin.js
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signin = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password); // ✅ awaited

    if (!isCorrect) {
      return res.status(400).json({ message: "Password does not match" }); // ✅ return added
    }

    const token = jwt.sign(          // ✅ token generated
      { userId: user._id, username: user.username },
      process.env.JWT
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, token }); // ✅ token sent back
  } catch (err) {
    console.log(err);
    next(err);
  }
};