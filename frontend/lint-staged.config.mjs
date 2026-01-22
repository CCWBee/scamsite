/**
 * lint-staged Configuration for ScamAware Jersey Frontend
 *
 * lint-staged runs linters and formatters on git staged files only,
 * making pre-commit hooks fast even in large codebases.
 *
 * This configuration is automatically invoked by husky's pre-commit hook.
 *
 * @see https://github.com/lint-staged/lint-staged
 */
const lintStagedConfig = {
  // ==========================================================================
  // TypeScript and TSX Files
  // ==========================================================================
  //
  // For TypeScript files, we run both ESLint and Prettier:
  // 1. ESLint (--fix): Catches bugs, enforces best practices, and auto-fixes issues
  // 2. Prettier (--write): Ensures consistent code formatting
  //
  // Order matters: ESLint first (may change code), then Prettier (final formatting)
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],

  // ==========================================================================
  // JavaScript Files
  // ==========================================================================
  //
  // Same treatment as TypeScript files - lint and format.
  // Includes various JS extensions:
  //   - .js:  Standard JavaScript
  //   - .jsx: React JSX files
  //   - .mjs: ES Modules (like this config file)
  //   - .cjs: CommonJS modules
  '*.{js,jsx,mjs,cjs}': ['eslint --fix', 'prettier --write'],

  // ==========================================================================
  // Data and Configuration Files
  // ==========================================================================
  //
  // JSON, YAML, and other config files are formatted with Prettier only.
  // No linting needed, but consistent formatting improves readability.
  //
  // Includes:
  //   - .json: Package configs, tsconfig, etc.
  //   - .md:   Documentation files
  //   - .css:  Stylesheets (non-Tailwind)
  //   - .scss: Sass stylesheets
  //   - .html: HTML templates
  //   - .yml/.yaml: Docker, GitHub Actions configs
  '*.{json,md,css,scss,html,yml,yaml}': ['prettier --write'],
};

export default lintStagedConfig;
