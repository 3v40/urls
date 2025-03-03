const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message:
    "Too many URL creations from this IP, please try again after an hour",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
