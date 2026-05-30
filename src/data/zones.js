/**
 * Phase 1 hardcoded test zones — Fairfax County, VA.
 * Phase 2 replaces this array with a database query using the same interface.
 */
const ZONES = [
  {
    id: "zone-1",
    name: "Zone 1",
    lat: 38.760662,
    lng: -77.144333,
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
    name: "Zone 2",
    lat: 38.763207,
    lng: -77.139872,
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
    name: "Zone 3",
    lat: 38.768236,
    lng: -77.138877,
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
