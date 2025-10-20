import { GrowthBook } from "@growthbook/growthbook";
import { cookies } from "next/headers";
import { GB_UUID_COOKIE } from "@/middleware";

export async function getServerGrowthBook() {
  // Create and initialize a GrowthBook instance
  const gb = new GrowthBook({
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,
  });

  await gb.init({ timeout: 1000 });

  // Set targeting attributes for the user
  const cookieStore = await cookies();
  const userId = cookieStore.get(GB_UUID_COOKIE)?.value;

  await gb.setAttributes({
    id: userId || "",
  });

  return gb;
}
