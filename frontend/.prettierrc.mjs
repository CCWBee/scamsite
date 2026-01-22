/**
 * Prettier Configuration for ScamAware Jersey Frontend
 *
 * This configuration enforces consistent code formatting across the project.
 * Prettier is run automatically on staged files via lint-staged during pre-commit.
 *
 * @see https://prettier.io/docs/en/options.html
 */
const prettierConfig = {
  // Add semicolons at the end of statements
  // Prevents ASI (Automatic Semicolon Insertion) issues
  semi: true,

  // Use single quotes instead of double quotes for strings
  // Exception: JSX attributes use double quotes (see jsxSingleQuote)
  singleQuote: true,

  // Number of spaces per indentation level
  // 2 spaces is the common standard for JavaScript/TypeScript projects
  tabWidth: 2,

  // Use spaces for indentation instead of tabs
  // Ensures consistent appearance across different editors
  useTabs: false,

  // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  // Makes git diffs cleaner when adding new items to lists
  trailingComma: 'es5',

  // Maximum line length before wrapping
  // 100 characters balances readability with modern wide screens
  printWidth: 100,

  // Add spaces between brackets in object literals: { foo: bar }
  // Improves readability of object definitions
  bracketSpacing: true,

  // Always include parentheses around arrow function parameters
  // Consistent style: (x) => x * 2 instead of x => x * 2
  arrowParens: 'always',

  // Use Unix-style line endings (LF) for cross-platform consistency
  // Prevents issues when collaborating across Windows/Mac/Linux
  endOfLine: 'lf',

  // Use double quotes in JSX attributes (HTML convention)
  // Follows the HTML attribute style: <div className="foo">
  jsxSingleQuote: false,

  // Put the closing bracket of multi-line JSX elements on a new line
  // Improves readability of component props
  bracketSameLine: false,

  // Only quote object properties when necessary
  // Cleaner objects: { foo: 1 } instead of { 'foo': 1 }
  quoteProps: 'as-needed',

  // Preserve original wrapping in markdown prose
  // Allows manual control of line breaks in documentation
  proseWrap: 'preserve',

  // Respect CSS display property semantics for whitespace in HTML
  // Prevents unexpected whitespace changes in rendered HTML
  htmlWhitespaceSensitivity: 'css',

  // Auto-format code blocks in markdown files
  // Keeps embedded code snippets formatted consistently
  embeddedLanguageFormatting: 'auto',

  // Allow multiple attributes per line in JSX/HTML
  // Set to true to enforce one attribute per line for complex components
  singleAttributePerLine: false,
};

export default prettierConfig;
