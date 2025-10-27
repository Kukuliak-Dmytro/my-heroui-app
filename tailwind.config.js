import { heroui } from "@heroui/theme";

// if I remember correctly, tailwind config is legacy starting with TW v4
// the new approach is to define the variables in the theme object, CSS file
//but I'll keep the legacy approach since that's what the docs say

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["var(--font-comfortaa)", "sans-serif"],
        quicksand: ["var(--font-quicksand)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#fafaf9", // stone-50
            foreground: "#292524", // stone-800
            default: {
              50: "#f8f9fa",
              100: "#e9ecef",
              200: "#dee2e6",
              300: "#ced4da",
              400: "#adb5bd",
              500: "#6c757d",
              600: "#495057",
              700: "#343a40",
              800: "#212529",
              900: "#1a1d20",
              foreground: "#ffffff",
              DEFAULT: "#6c757d",
            },
            primary: {
              50: "#fffbeb",
              100: "#fef3c7",
              200: "#fde68a",
              300: "#fcd34d",
              400: "#fbbf24",
              500: "#f59e0b",
              600: "#d97706",
              700: "#b45309",
              800: "#92400e",
              900: "#78350f",
              950: "#451a03",
              foreground: "#451a03",
              DEFAULT: "#f59e0b",
            },
            secondary: {
              50: "#f0fdfa",
              100: "#ccfbf1",
              200: "#99f6e4",
              300: "#5eead4",
              400: "#2dd4bf",
              500: "#14b8a6",
              600: "#0d766e",
              700: "#0f766e",
              800: "#115e59",
              900: "#134e4a",
              950: "#042f2e",
              foreground: "#ffffff",
              DEFAULT: "#0d766e",
            },
            danger: {
              50: "#fff1f2",
              100: "#ffe4e6",
              200: "#fecdd3",
              300: "#fda4af",
              400: "#fb7185",
              500: "#f43f5e",
              600: "#e11d48",
              700: "#be123c",
              800: "#9f1239",
              900: "#881337",
              950: "#4c0519",
              foreground: "#ffffff",
              DEFAULT: "#9f1239",
            },
          },
        },
        dark: {
          colors: {
            background: "#1c1917", // stone-900
            foreground: "#d6d3d1", // stone-300
            default: {
              50: "#1a1d20",
              100: "#212529",
              200: "#343a40",
              300: "#495057",
              400: "#6c757d",
              500: "#adb5bd",
              600: "#ced4da",
              700: "#dee2e6",
              800: "#e9ecef",
              900: "#f8f9fa",
              foreground: "#000000",
              DEFAULT: "#adb5bd",
            },
            primary: {
              50: "#fffbeb",
              100: "#fef3c7",
              200: "#fde68a",
              300: "#fcd34d",
              400: "#fbbf24",
              500: "#f59e0b",
              600: "#d97706",
              700: "#b45309",
              800: "#92400e",
              900: "#78350f",
              950: "#451a03",
              foreground: "#451a03",
              DEFAULT: "#f59e0b",
            },
            secondary: {
              50: "#f0fdfa",
              100: "#ccfbf1",
              200: "#99f6e4",
              300: "#5eead4",
              400: "#2dd4bf",
              500: "#14b8a6",
              600: "#0d766e",
              700: "#0f766e",
              800: "#115e59",
              900: "#134e4a",
              950: "#042f2e",
              foreground: "#ffffff",
              DEFAULT: "#0d766e",
            },
            danger: {
              50: "#fff1f2",
              100: "#ffe4e6",
              200: "#fecdd3",
              300: "#fda4af",
              400: "#fb7185",
              500: "#f43f5e",
              600: "#e11d48",
              700: "#be123c",
              800: "#9f1239",
              900: "#881337",
              950: "#4c0519",
              foreground: "#ffffff",
              DEFAULT: "#be123c",
            },
          },
        },
      },
    }),
  ],
};

export default config;
