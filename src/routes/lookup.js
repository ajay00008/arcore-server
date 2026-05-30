const express = require("express");
const { haversine } = require("../utils/haversine");
const { normalizeLatLng } = require("../utils/coordinate");
const { ZONES, FALLBACK_PAYLOAD } = require("../data/zones");
const { lookupValidation, handleValidationErrors } = require("../middleware/validate");
const { apiKeyAuth } = require("../middleware/auth");
const { logger } = require("../utils/logger");

function createLookupRouter(responseCache) {
  const router = express.Router();
  const radiusMeters = parseFloat(process.env.RADIUS_METERS || "12");

  router.post(
    "/lookup",
    apiKeyAuth,
    lookupValidation,
    handleValidationErrors,
    (req, res) => {
      try {
        const lat = parseFloat(req.body.lat);
        const lng = parseFloat(req.body.lng);
        const precision = parseInt(process.env.COORD_PRECISION || "5", 10);

        const normalized = normalizeLatLng(lat, lng, precision);

        const cached = responseCache.get(normalized.lat, normalized.lng);
        if (cached) {
          logger.info("lookup_cache_hit", {
            lat: normalized.lat,
            lng: normalized.lng,
            structural_class_code: cached.structural_class_code,
          });
          return res.json(cached);
        }

        const match = ZONES.find(
          (zone) =>
            haversine(normalized.lat, normalized.lng, zone.lat, zone.lng) <=
            radiusMeters
        );

        const payload = match
          ? { ...match.payload, zone_name: match.name }
          : { ...FALLBACK_PAYLOAD };

        if (match) {
          responseCache.set(normalized.lat, normalized.lng, payload);
        }

        logger.info("lookup_result", {
          lat: normalized.lat,
          lng: normalized.lng,
          raw_lat: lat,
          raw_lng: lng,
          zone_id: match?.id ?? null,
          structural_class_code: payload.structural_class_code,
          status: payload.status,
          cached: false,
        });

        return res.json(payload);
      } catch (error) {
        logger.error("lookup_error", { error: error.message, stack: error.stack });
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  return router;
}

module.exports = { createLookupRouter };
