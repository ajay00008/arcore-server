/**
 * Phase 1 test zones — Mohali Sector 70 area (local field testing).
 * Original client zones (Fairfax VA) are in zones.fairfax.js for production delivery.
 * Phase 2 replaces this array with a database query using the same interface.
 */
const ZONES = [
  {
    id: "zone-1",
    name: "Zone 1 — Sector 70 Center",
    lat: 30.69822,
    lng: 76.71476,
    parcelType: "commercial",
    payload: {
      status: "success",
      structural_class_code: "8888",
      parcel_type: "commercial",
      zone_id: "zone-1",
    },
  },
  {
    id: "zone-2",
    name: "Zone 2 — Sector 69 Side",
    lat: 30.7025,
    lng: 76.7152,
    parcelType: "residential",
    payload: {
      status: "success",
      structural_class_code: "1111",
      parcel_type: "residential",
      zone_id: "zone-2",
    },
  },
  {
    id: "zone-3",
    name: "Zone 3 — Sector 71 Side",
    lat: 30.6978,
    lng: 76.7201,
    parcelType: "residential",
    payload: {
      status: "success",
      structural_class_code: "9999",
      parcel_type: "residential",
      zone_id: "zone-3",
    },
  },
];

const FALLBACK_PAYLOAD = {
  status: "not_found",
  structural_class_code: "0000",
  parcel_type: null,
  zone_id: null,
};

module.exports = { ZONES, FALLBACK_PAYLOAD };
