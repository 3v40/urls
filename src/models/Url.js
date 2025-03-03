const mongoose = require("mongoose");

const shortUrlSchema = mongoose.Schema({
  shortCode: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  accessCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
