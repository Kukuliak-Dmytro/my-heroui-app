# Environment Setup for GrowthBook A/B Testing

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# GrowthBook Configuration (NEXT_PUBLIC_ prefix required for client-side access)
NEXT_PUBLIC_GROWTHBOOK_API_HOST=https://cdn.growthbook.io
NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY=your_client_key_here
NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY=your_decryption_key_here

# Optional: For local testing without GrowthBook
RECIPE_LIST_VARIANT=paginated
```

## How to Get These Values

1. **NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY**:
   - Go to your GrowthBook dashboard
   - Navigate to Settings > SDKs
   - Create a new SDK connection
   - Copy the Client Key

2. **NEXT_PUBLIC_GROWTHBOOK_API_HOST**:
   - Usually `https://cdn.growthbook.io` (default)
   - Or your custom GrowthBook instance URL

3. **NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY** (optional):
   - Only needed if you're using encrypted feature flags
   - Get from GrowthBook dashboard under Settings > Encryption

## Testing Steps

1. **Set up environment variables** in `.env.local`
2. **Start the development server**: `npm run dev`
3. **Visit the recipes page**: `http://localhost:3000/en/recipes`
4. **Check the console logs** for any errors
5. **Verify environment variables** are being loaded
6. **Test the feature flag** by refreshing the page

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
4. Make sure all variables have `NEXT_PUBLIC_` prefix

### For local testing without GrowthBook:

1. Set `RECIPE_LIST_VARIANT=paginated` in `.env.local`
2. The app will use this as a fallback when GrowthBook fails
3. This allows you to test the UI without setting up GrowthBook

## Architecture

The new implementation uses:

- **Server-side evaluation**: Feature flags are evaluated on the server for better performance
- **Next.js fetch cache**: 60-second cache with `["growthbook"]` tags for revalidation
- **Persistent user IDs**: UUID stored in cookies for consistent experiment assignment
- **Experiment tracking**: Automatic tracking of experiment views for analytics

