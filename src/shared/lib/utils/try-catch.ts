//Results pattern from Go/Rust
//some say it's a powerful pattern.
//others point out this pattern should not be used outside the languages that support it
//nevertheless, decided to give it a shot
import * as Sentry from "@sentry/nextjs";
import type { CaptureContext } from "@sentry/core";

type SuccessResult<T> = readonly [T, null];

type ErrorResult<E = Error> = readonly [null, E];

type Result<T, E = Error> = SuccessResult<T> | ErrorResult<E>;
/**
 * Wraps a promise in a try-catch block.
 * On success, it returns [data, null].
 * On failure, it automatically reports the error to Sentry and returns [null, error].
 * On failure, just handle the UI, error handling is under the hood
 */
export const tryCatchWithSentry = async <T, E = Error>(
  promise: Promise<T>,
  sentryContext?: CaptureContext,
): Promise<Result<T, E>> => {
  try {
    const data = await promise;
    return [data, null] as const;
  } catch (error: unknown) {
    // Automatically report the error to Sentry
    console.error(error);
    Sentry.captureException(error, sentryContext);
    return [null, error as E] as const;
  }
};
