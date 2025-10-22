import { Comfortaa, Quicksand, Inter } from "next/font/google";

/**
 * Comfortaa font configuration for the application.
 *
 * This font is used for headings and decorative text throughout
 * the application. It provides a modern, rounded appearance.
 */
export const FONT_COMFORTAA = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

/**
 * Quicksand font configuration for the application.
 *
 * This font is used for body text and UI elements throughout
 * the application. It provides excellent readability and modern styling.
 */
export const FONT_QUICKSAND = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

/**
 * Inter font configuration for specific pages.
 *
 * This font is used for pages that require a more modern, clean typography.
 * It provides excellent readability and is widely used in modern web applications.
 */
export const FONT_INTER = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
