require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const { createLookupRouter } = require("./routes/lookup");
const { ResponseCache } = require("./services/cache");
const { logger } = require("./utils/logger");

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

const cacheTtlMs = parseInt(process.env.CACHE_TTL_MS || "300000", 10);
const coordPrecision = parseInt(process.env.COORD_PRECISION || "5", 10);
const responseCache = new ResponseCache(cacheTtlMs, coordPrecision);

app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(morgan("combined"));

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "*")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: allowedOrigins.includes("*") ? true : allowedOrigins,
    methods: ["GET", "POST"],
  })
);

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later" },
  })
);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    cache_entries: responseCache.size(),
    radius_meters: parseFloat(process.env.RADIUS_METERS || "12"),
    cache_ttl_ms: cacheTtlMs,
  });
});

app.use("/api", createLookupRouter(responseCache));

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, _req, res, _next) => {
  logger.error("unhandled_error", { error: err.message, stack: err.stack });
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  logger.info("server_started", {
    port,
    env: process.env.NODE_ENV || "development",
    radius_meters: process.env.RADIUS_METERS || "12",
    cache_ttl_ms: cacheTtlMs,
  });
});

module.exports = app;
