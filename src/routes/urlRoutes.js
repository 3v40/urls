const express = require("express");
const router = express.Router();
const {
  shortenUrl,
  redirectUrl,
  getUrlStats,
} = require("../controllers/urlController");
const rateLimiter = require("../middlewares/rateLimiter");

router.post("/shorten", rateLimiter, shortenUrl);
router.get("/:shortCode", redirectUrl);
router.get("/stats/:shortCode", getUrlStats);

module.exports = router;
