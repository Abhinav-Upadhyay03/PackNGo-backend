import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { Driver } from "../models/driver.models.js";
import bcrypt from "bcrypt";
const JWT_SECRET = "6a3b2c4d5e6f7g8h9i0j1k2l3m4n5o6p";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }) || await Driver.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({success:true,user,  token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
