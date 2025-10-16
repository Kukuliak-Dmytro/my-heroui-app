import { createGrowthbookAdapter } from "@flags-sdk/growthbook";

const myGrowthbookAdapter = createGrowthbookAdapter({
  clientKey: process.env.GROWTHBOOK_CLIENT_KEY!,
  apiHost: process.env.GROWTHBOOK_API_HOST, // optional
  appOrigin: process.env.GROWTHBOOK_APP_ORIGIN, // optional
  trackingCallback: (experiment, result) => {
    console.log("Experiment:", experiment);
    console.log("Result:", result);
  },
  clientOptions: {}, // GrowthBook ClientOptions (optional)
  initOptions: {}, // GrowthBook InitOptions (optional)
  stickyBucketService: undefined, // Optional
});
export default myGrowthbookAdapter;
