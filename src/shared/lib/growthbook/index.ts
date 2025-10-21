/**
 * GrowthBook library re-exports.
 *
 * This file re-exports all GrowthBook-related utilities and configurations
 * for convenient importing throughout the application.
 */
export { configureServerSideGrowthBook } from "./growthbook-server";
export { getServerGrowthBook } from "./get-growthbook-instance";
export { GB_UUID_COOKIE } from "@/middleware";
