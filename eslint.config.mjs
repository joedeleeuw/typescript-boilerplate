import { createConfig as createToolingConfig } from "@joedeleeuw/typescript-tooling/eslint";
import { createConfig as createAntidriftConfig } from "@joedeleeuw/antidrift/eslint-config";

export default [
  ...createToolingConfig({ tsconfigRootDir: import.meta.dirname }),
  ...createAntidriftConfig({ tsconfigRootDir: import.meta.dirname }),
];
