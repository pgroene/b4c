// config.js — local development fallback.
// In production this file is replaced by docker-entrypoint.sh at container start.
// Set VITE_DEMO_PASSWORD in .env for local dev, or leave empty to skip the gate.
window.__DEMO_CONFIG__ = {
  demoPassword: ""
};
