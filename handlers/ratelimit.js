const requests = {};

export const rateLimit = (req, res, next) => {
  const user = req.user?.id;
  if (!user) 
    return res.status(401).json({ msg: "Unauthorized" });

  const now = Date.now();
  requests[user] = (requests[user] || []).filter(ts => now - ts < 60000);

  if (requests[user].length >= 5) 
    return res.status(429).json({ msg: "Rate limit exceeded" });

  requests[user].push(now);
  return next();
};
