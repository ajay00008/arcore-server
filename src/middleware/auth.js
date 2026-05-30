/**
 * Optional API key authentication.
 * When API_KEY is set, requests must include X-API-Key header.
 */
function apiKeyAuth(req, res, next) {
  const configuredKey = process.env.API_KEY;

  if (!configuredKey || configuredKey === "your-dev-api-key-here") {
    return next();
  }

  const providedKey = req.headers["x-api-key"];

  if (!providedKey || providedKey !== configuredKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

module.exports = { apiKeyAuth };
