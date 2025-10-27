import createMiddleware from "next-intl/middleware";
import { routing } from "./shared/lib/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

// Ensure a UUID cookie is always set to enable experimentation
export const GB_UUID_COOKIE = "gb-heroui-userId";

/**
 * Next.js middleware for internationalization and experimentation.
 *
 * This middleware handles internationalization routing and ensures
 * a UUID cookie is set for GrowthBook experimentation. It processes
 * all incoming requests and applies the necessary transformations.
 *
 * @param request - The incoming Next.js request
 * @returns The processed response with internationalization and UUID cookie
 */
export default function middleware(request: NextRequest) {
  // Generate a UUID if it doesn't exist yet
  let uuid = request.cookies.get(GB_UUID_COOKIE)?.value;
  let needsUpdate = false;
  if (!uuid) {
    uuid = crypto.randomUUID();
    needsUpdate = true;

    // Set the cookie on the current request
    request.cookies.set(GB_UUID_COOKIE, uuid);
  }

  // Forward the request to the server
  const response = intlMiddleware(request);

  // Ensure we have a proper NextResponse
  const finalResponse =
    response instanceof NextResponse ? response : new NextResponse();

  // Add the newly created UUID to the response headers to persist in the browser
  if (needsUpdate) {
    finalResponse.cookies.set(GB_UUID_COOKIE, uuid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return finalResponse;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
