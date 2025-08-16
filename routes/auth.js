import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { getZodiacSign } from "../utils/zodiacUtils.js";

const router = express.Router();


router.post("/signup", async(req, res) => {
  const { name, email, password, birthdate } = req.body;
  if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "User exists" });
  }

  const zodiac = getZodiacSign(new Date(birthdate));
  const newUser = new User({ name, email, password, birthdate, zodiac });
  await newUser.save();

  res.json({ msg: "Signup success", zodiac });
});


router.post("/login", async(req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) 
    return res.status(401).json({ msg: "Invalid creds" });

  const token = jwt.sign( {id: user._id, email: user.email, zodiac: user.zodiac }, "secret", { expiresIn: "1h" });
  res.json({ token });

});

export default router;
