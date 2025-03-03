const URL = require("../models/Url");
const shortCodeGenerator = require("../utils/shortCodeGenerator");
const server_uri = process.env.SERVER_URI;

const shortenUrl = async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl)
      return res.status(400).json({ error: "Original URL is required" });

    let shortCode;
    do {
      shortCode = shortCodeGenerator();
    } while (await URL.exists({ shortCode }));
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const url = new URL({ shortCode, originalUrl, expiresAt });
    await url.save();

    res.status(201).json({ shortUrl: server_uri + `/${shortCode}` });
  } catch (error) {
    next(error);
  }
};

const redirectUrl = async (req, res, next) => {
  try {
    const shortCode = req.params.shortCode;
    const url = await URL.findOne({ shortCode });

    if (!url) return res.status(404).json({ error: "URL not found" });

    if (url.expiresAt < Date.now())
      return res.status(410).json({ error: "URL has expired" });

    url.accessCount++;
    await url.save();

    let redirectUrl = url.originalUrl;
    if (
      !redirectUrl.startsWith("http://") &&
      !redirectUrl.startsWith("https://")
    ) {
      redirectUrl = "https://" + redirectUrl;
    }
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

const getUrlStats = async (req, res, next) => {
  try {
    const shortCode = req.params.shortCode;
    const url = await URL.findOne({ shortCode });
    if (!url) return res.status(404).json({ error: "URL not found" });

    res.status(200).json({ accessCount: url.accessCount });
  } catch (error) {
    next(error);
  }
};

module.exports = { shortenUrl, redirectUrl, getUrlStats };
