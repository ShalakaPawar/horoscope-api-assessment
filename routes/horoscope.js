import express from "express";
import { authenticate } from "../handlers/authenticate.js";
import { rateLimit } from "../handlers/ratelimit.js";
import { horoscopeData } from "../utils/horoscopeUtil.js";
import User from "../models/User.js";
import History from "../models/History.js";

const router = express.Router();

router.get("/today", authenticate, rateLimit, async (req, res) => {
  let user;
  let today = new Date().toISOString().slice(0, 10);
  try {
    user = await User.findById(req.user.id);
    if (!user) 
        return res.status(404).json({ message: "User not found" });


    const text = horoscopeData[user.zodiac];
    res.json({ zodiac: user.zodiac, date: today, text });

    saveHistoryAsync(user._id, text);

  } catch (err) {
    if (!res.headersSent) {
      return res.status(500).json({ message: err.message });
    }
  }
});


router.get("/history", authenticate, async(req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) 
        return res.status(404).json({ message: "User not found" });

    const history = await History.find({ userId: user._id }).sort({ date: -1 });
    res.json({ zodiac: user.zodiac, history });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export const saveHistoryAsync = (userId, text) => {
  (async () => {
    try {
      const today = new Date().toISOString().slice(0, 10);

      const existing = await History.findOne({ userId, date: today });
      if (!existing) {
        await History.create({ userId, date: today, text });
      }

      const total = await History.countDocuments({ userId });
      if (total > 7) {
        const toDelete = await History.find({ userId }).sort({ date: 1 }).limit(total - 7).select("_id");
        await History.deleteMany({ _id: { $in: toDelete.map(h => h._id) } });
      }
    } catch (err) {
      console.error("History save failed:", err.message);
    }
  })();
};

export default router;