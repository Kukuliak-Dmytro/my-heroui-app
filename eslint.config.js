// @ts-check

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        ignores: [
            ".idea/",
            ".vscode/",
            "node_modules/",
            ".astro/",
            ".next/",
            "dist/",
            "dev-dist/",
            "public/",
            "**/*.d.ts",
            ".cache/",
            ".DS_Store",
            "package.json",
            "package-lock.json",
            "tsconfig.json",
            "next-env.d.ts",
            "next.config.js",
            "postcss.config.js",
            "tailwind.config.js",
        ],
    },
);
