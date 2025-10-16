import { cookies } from "next/headers";

/**
 * Generate a random ID that works in Edge Runtime
 * Uses crypto.getRandomValues() which is available in Edge Runtime
 */
function generateRandomId(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);

  // Convert to hex string
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

/**
 * Gets or creates a session-based user ID
 * This ensures each session gets a unique ID for A/B testing
 */
export async function getOrCreateSessionUserId(): Promise<string> {
  const cookieStore = await cookies();
  let userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    userId = generateRandomId();
    // Note: In a real implementation, you'd set this cookie in middleware
    // For now, we'll return the generated ID
  }

  return userId;
}

/**
 * Sets the user ID cookie (to be called from middleware)
 */
export async function setUserIdCookie(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set("user_id", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
