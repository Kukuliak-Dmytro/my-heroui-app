import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Internationalized navigation utilities.
 *
 * These are lightweight wrappers around Next.js navigation APIs that
 * consider the routing configuration for internationalization. They provide
 * locale-aware navigation components and hooks.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
