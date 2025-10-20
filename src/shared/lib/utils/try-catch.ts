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
 * Wraps a promise in a try-catch block using the Result pattern from Go/Rust.
 *
 * This function provides a functional approach to error handling by returning
 * a tuple instead of throwing exceptions. On success, it returns [data, null].
 * On failure, it automatically reports the error to Sentry and returns [null, error].
 *
 * @template T - The type of data returned on success
 * @template E - The type of error returned on failure (defaults to Error)
 * @param promise - The promise to wrap in error handling
 * @param sentryContext - Optional Sentry context for error reporting
 * @returns A promise that resolves to a Result tuple: [data, null] on success or [null, error] on failure
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
