const {
  createConfig,
} = require("@joedeleeuw/typescript-tooling/dependency-cruiser");

const baseline = createConfig();

module.exports = {
  ...baseline,
  options: {
    ...baseline.options,
    exclude: { path: ["_generated", "/\\.next/", "/out/"] },
    doNotFollow: { path: ["node_modules", "/dist/"] },
  },
  forbidden: [
    ...baseline.forbidden,
    {
      name: "imports-resolve",
      severity: "error",
      from: {},
      to: { couldNotResolve: true },
    },
    {
      name: "packages-do-not-import-apps",
      severity: "error",
      from: { path: "^packages/" },
      to: { path: "^apps/" },
    },
    {
      name: "domain-is-platform-independent",
      severity: "error",
      from: { path: "^packages/domain/" },
      to: { pathNot: "^packages/domain/" },
    },
    {
      name: "web-uses-domain-public-entrypoint",
      severity: "error",
      from: { path: "^apps/web/" },
      to: {
        path: "^packages/domain/",
        pathNot: "/(?:src|dist)/index\\.(?:ts|js|d\\.ts)$",
      },
    },
  ],
};
