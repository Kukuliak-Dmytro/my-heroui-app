import { GrowthBook } from "@growthbook/growthbook";
import { cookies } from "next/headers";
import { GB_UUID_COOKIE } from "@/middleware";
import { tryCatchWithSentry } from "@/shared/lib/utils/try-catch";

export async function getServerGrowthBook() {
  // Create and initialize a GrowthBook instance
  const gb = new GrowthBook({
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,
  });

  await tryCatchWithSentry(gb.init({ timeout: 1000 }), {
    level: "error",
    tags: { feature: "growthbook", op: "init" },
  });

  // Set targeting attributes for the user
  const [cookieStore] = await tryCatchWithSentry(cookies(), {
    level: "error",
    tags: { feature: "growthbook", op: "cookies" },
  });
  const userId = cookieStore?.get(GB_UUID_COOKIE)?.value;

  await tryCatchWithSentry(
    gb.setAttributes({
      id: userId || "",
    }),
    {
      level: "error",
      tags: { feature: "growthbook", op: "setAttributes" },
      extra: { hasUserId: Boolean(userId) },
    },
  );

  return gb;
}
