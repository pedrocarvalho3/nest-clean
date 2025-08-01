import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.ts"],
  plugins: {
    prettier: eslintPluginPrettier,
  },
  extends: [...tseslint.configs.recommended, eslintConfigPrettier],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // "@typescript-eslint/no-explicit-any": "off",
  },
});
