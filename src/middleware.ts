import createMiddleware from "next-intl/middleware";
import { routing } from "./shared/lib/i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

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

export default function middleware(request: NextRequest) {
  // Handle user ID cookie for A/B testing
  const userId = request.cookies.get("user_id")?.value;

  if (!userId) {
    // Generate new user ID for this session
    const newUserId = generateRandomId();

    // Create response with the intl middleware
    const response = intlMiddleware(request);

    // Set the user ID cookie
    response.cookies.set("user_id", newUserId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  }

  // If user ID exists, just run the intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
