import ky from "ky";
import * as Sentry from "@sentry/nextjs";

//since we don't have auth, we can have one client being used both on the server and the client
//this will allow us to prefetch data on the server and use the same client on the client

export const http = ky.create({
  prefixUrl: "https://dummyjson.com/recipes",
  timeout: 10000,
  retry: 2,
  hooks: {
    beforeError: [
      (error) => {
        // Capture HTTP errors with Sentry
        Sentry.captureException(error, {
          tags: {
            component: "http-client",
            url: error.request?.url,
            method: error.request?.method,
          },
          extra: {
            response: error.response?.status,
            responseText: error.response?.statusText,
          },
        });

        // Log error for debugging
        console.error("HTTP Error:", {
          url: error.request?.url,
          method: error.request?.method,
          status: error.response?.status,
          message: error.message,
        });

        return error;
      },
    ],
  },
});
