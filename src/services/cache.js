const { cacheKey } = require("../utils/coordinate");

class ResponseCache {
  constructor(ttlMs, precision) {
    this.ttlMs = ttlMs;
    this.precision = precision;
    this.store = new Map();
  }

  get(lat, lng) {
    const key = cacheKey(lat, lng, this.precision);
    const entry = this.store.get(key);

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return { ...entry.payload, cached: true };
  }

  set(lat, lng, payload) {
    if (payload.status !== "success") {
      return;
    }

    const key = cacheKey(lat, lng, this.precision);
    this.store.set(key, {
      payload,
      expiresAt: Date.now() + this.ttlMs,
    });
  }

  clear() {
    this.store.clear();
  }

  size() {
    return this.store.size;
  }
}

module.exports = { ResponseCache };
