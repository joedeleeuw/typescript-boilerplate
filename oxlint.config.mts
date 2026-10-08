import { createConfig } from "@joedeleeuw/typescript-tooling/oxlint";
import { createGovernanceOxlintConfig } from "@joedeleeuw/antidrift/oxlint-config";
import { defineConfig } from "oxlint";

const baseline = createConfig({
  repoRoot: import.meta.dirname,
  typeAware: true,
  maxLines: 1000,
});
const governance = createGovernanceOxlintConfig({
  repoRoot: import.meta.dirname,
});
const jsPlugins = new Map(
  [...(baseline.jsPlugins ?? []), ...(governance.jsPlugins ?? [])].map(
    (plugin) =>
      [typeof plugin === "string" ? plugin : plugin.name, plugin] as const
  )
);

export default defineConfig({
  ...baseline,
  ...governance,
  categories: {
    ...baseline.categories,
    ...governance.categories,
    correctness: "error",
  },
  env: { node: true },
  ignorePatterns: [
    ...(baseline.ignorePatterns ?? []),
    ...(governance.ignorePatterns ?? []),
  ],
  jsPlugins: [...jsPlugins.values()],
  options: { ...governance.options, ...baseline.options },
  plugins: [
    ...new Set([
      ...(baseline.plugins ?? []),
      ...(governance.plugins ?? []),
      "import",
      "react",
      "unicorn",
    ] as const),
  ],
  rules: {
    ...baseline.rules,
    ...governance.rules,
    "no-debugger": "error",
    "no-console": "error",
    "prefer-const": "error",
    "import/no-cycle": ["error", { ignoreExternal: true }],
    "import/no-duplicates": "error",
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "error",
    "react/jsx-key": "error",
    "react/button-has-type": "error",
    "unicorn/prefer-node-protocol": "error",
  },
  overrides: [
    ...(baseline.overrides ?? []),
    ...(governance.overrides ?? []),
    {
      files: ["apps/web/src/**/*.{ts,tsx}"],
      env: { browser: true, node: false },
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["@typescript-boilerplate/domain/*"],
                message: "Import domain through its public package entrypoint.",
              },
            ],
          },
        ],
      },
    },
  ],
});
