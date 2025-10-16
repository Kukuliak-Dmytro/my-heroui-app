import { dedupe } from "flags/next";
import type { Identify } from "flags";
import { type Attributes } from "@flags-sdk/growthbook";

/**
 * Generate a random ID for each request
 * This ensures each request gets a different user ID for A/B testing
 */
function generateRandomId(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

const identify = dedupe((async () => {
  // Generate a new random ID for each request
  // This means each page load/request will get a different user ID
  const userId = generateRandomId();

  return {
    id: userId,
    // Add any other attributes you want to track
    sessionId: userId, // Same as id for session-based tracking
    // Add timestamp to make it even more unique
    timestamp: Date.now(),
  };
}) satisfies Identify<Attributes>);

export { identify };
