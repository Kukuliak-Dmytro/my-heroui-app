import { Comfortaa, Quicksand } from "next/font/google";

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
