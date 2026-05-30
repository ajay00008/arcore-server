/**
 * Normalizes coordinates to prevent nearly-identical cache keys.
 * Default precision of 5 decimal places ≈ 1.1 m resolution.
 */
function normalizeCoordinate(value, precision = 5) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

function normalizeLatLng(lat, lng, precision = 5) {
  return {
    lat: normalizeCoordinate(lat, precision),
    lng: normalizeCoordinate(lng, precision),
  };
}

function cacheKey(lat, lng, precision = 5) {
  const normalized = normalizeLatLng(lat, lng, precision);
  return `${normalized.lat},${normalized.lng}`;
}

module.exports = { normalizeCoordinate, normalizeLatLng, cacheKey };
