// Lighthouse CI config for Thai Royale Spa (Quezon City, PH).
// Single-page site — homepage covers the full conversion path.
// Same assertion budget as the rest of the hospitality book.

module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm start",
      startServerReadyPattern: "Ready",
      startServerReadyTimeout: 30000,
      url: ["http://localhost:3000/"],
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        skipAudits: ["uses-http2"],
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
