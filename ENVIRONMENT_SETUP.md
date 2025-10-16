# Environment Setup for GrowthBook A/B Testing

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# GrowthBook Configuration
GROWTHBOOK_CLIENT_KEY=your_client_key_here
GROWTHBOOK_API_HOST=https://cdn.growthbook.io
GROWTHBOOK_APP_ORIGIN=http://localhost:3000
GROWTHBOOK_EDGE_CONNECTION_STRING=your_edge_connection_string_here
GROWTHBOOK_EDGE_CONFIG_ITEM_KEY=your_item_key_here

# Fallback for local testing (optional)
RECIPE_LIST_VARIANT=infinite
```

## How to Get These Values

1. **GROWTHBOOK_CLIENT_KEY**:
   - Go to your GrowthBook dashboard
   - Navigate to Settings > SDKs
   - Create a new SDK connection
   - Copy the Client Key

2. **GROWTHBOOK_EDGE_CONNECTION_STRING**:
   - This is for Vercel Edge Config integration
   - If you're not using Vercel Edge Config, you can omit this
   - Or set it to a dummy value for local testing

3. **GROWTHBOOK_EDGE_CONFIG_ITEM_KEY**:
   - This is the key for your feature flags in Edge Config
   - Usually something like "feature-flags" or "growthbook-flags"

## Testing Steps

1. **Set up environment variables** in `.env.local`
2. **Visit the debug page**: `http://localhost:3000/en/debug-flags`
3. **Check the console logs** for any errors
4. **Verify environment variables** are being loaded
5. **Test the feature flag** by refreshing the page

## Troubleshooting

### If the flag is always false:

1. Check that your GrowthBook experiment is **active**
2. Verify the experiment is **targeting your user** (check user attributes)
3. Make sure the **experiment conditions** are met
4. Check the **experiment traffic allocation** (should be > 0%)

### If you get connection errors:

1. Verify all required environment variables are set
2. Check that your GrowthBook project is active
3. Ensure your client key has the correct permissions

### For local testing without GrowthBook:

1. Set `RECIPE_LIST_VARIANT=infinite` in `.env.local`
2. The app will use this as a fallback when GrowthBook fails
3. This allows you to test the UI without setting up GrowthBook

## Debug Page

Visit `/en/debug-flags` or `/ua/debug-flags` to see:

- Environment variable status
- Feature flag values
- Error messages
- Troubleshooting tips

