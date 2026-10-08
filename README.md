# TypeScript boilerplate

A small pnpm monorepo with a runnable React app and one platform-independent
TypeScript package. Shared tooling and Antidrift are installed independently;
neither package is copied into this repository.

## Start

Use Node 24 and the pnpm version pinned by [the root manifest](package.json).

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm dev
```

Open the local URL printed by Vite. Enter a name: the web app derives its greeting
from the domain package's public entrypoint. There is no backend, authentication,
network request, or persisted state.

For production output:

```sh
pnpm build
pnpm --filter @typescript-boilerplate/web preview
```

The web bundle is emitted to `apps/web/dist`; the domain package emits JavaScript
and declarations to `packages/domain/dist`. Preview is for local verification,
not a production server.

## Layout and ownership

- [Web app](apps/web/src/App.tsx): React owns the input draft; the greeting is
  derived during render, not copied into state.
- [Domain entrypoint](packages/domain/src/index.ts): owns greeting behavior. It
  imports no browser, React, app, or Node APIs.
- [Domain manifest](packages/domain/package.json): exposes only `.` through built
  JavaScript and declarations. Add new exports deliberately; do not deep-import
  another package's source.
- [TypeScript base](tsconfig.base.json): extends the shared strict defaults.
  Each workspace owns its environment, inputs, outputs, and project references.
  There are no source-path aliases.

`apps/web` depends on `@typescript-boilerplate/domain` through `workspace:*`.
Build the domain package before starting Vite; the root `dev` command does this.
After changing domain source while Vite is running, rebuild it in another terminal:

```sh
pnpm --filter @typescript-boilerplate/domain build
```

## Checks

```sh
pnpm format:check
pnpm build
pnpm typecheck
pnpm lint
pnpm lint:boundaries
```

`pnpm check` runs these checks together. CI installs the frozen lockfile and runs
that same command. There are no empty test scripts or pretend passing test gates.
Verify the actual browser interaction when changing the app.

- [Prettier config](prettier.config.mjs) consumes the tooling preset, including
  `trailingComma: "es5"`.
- [ESLint config](eslint.config.mjs) composes generic typed tooling first and
  Antidrift governance second.
- [Oxlint config](oxlint.config.mts) preserves both presets' rules, JavaScript
  plugins, ignores, and overrides. The root Oxlint CLI owns the lint engine;
  Antidrift's CLI has its own pinned engine and is not used here. Native
  correctness, React hooks, and import checks are explicit additions, not a
  blanket adoption of every available rule.
- [Boundary config](.dependency-cruiser.cjs) uses the shared cycle/private-test
  baseline, then adds this repository's app-to-domain direction and public-entry
  constraints. Antidrift also rejects relative imports across package boundaries
  and undeclared package imports.

TypeScript 6 is intentional: the installed parser and Antidrift depend on the
classic TypeScript compiler API. Upgrade the compiler, parser, and lint engines
as a compatible set, not by substituting an unrelated compiler alias.

## Making this your repository

Rename the workspace packages and update their dependency/import names together.
Keep shared tooling and Antidrift pinned to the immutable Git revisions recorded
in the manifest and lockfile; update them deliberately after checking each
external package's consumer acceptance. Antidrift's Git dependency selects only
its package subdirectory, not the surrounding research monorepo.

[AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md) are short, repository-owned
instructions. Edit them directly as the architecture changes. There are no
policy registries, generated agent-document blocks, installed hooks, research
corpora, or product publishing workflows to synchronize.
