# A/B Testing Setup for Recipe List Variants

## Overview

This project now supports two recipe list variants for A/B testing:

1. **Paginated Variant** (default) - Traditional pagination with page numbers
2. **Infinite Scroll Variant** - Continuous scrolling with automatic loading

## Current Implementation

### Variant Toggle

The variant is controlled by the `RECIPE_LIST_VARIANT` environment variable in `/src/modules/recipes/recipes-page/recipes-page.component.tsx`:

```typescript
const RECIPE_LIST_VARIANT = process.env.RECIPE_LIST_VARIANT || "paginated";
```

### Testing Variants

#### Test Paginated Variant (Default)

```bash
# No environment variable needed - defaults to paginated
npm run dev
```

#### Test Infinite Scroll Variant

```bash
# Set environment variable
export RECIPE_LIST_VARIANT=infinite
npm run dev
```

Or create `.env.local`:

```
RECIPE_LIST_VARIANT=infinite
```

## Architecture

### Paginated Variant

- **Widget**: `RecipeListPaginated` in `/src/widgets/recipes/recipe-list-paginated/`
- **Store**: Uses `usePaginationStore` for page/skip state
- **Query**: Standard `useQuery` with pagination parameters
- **Prefetch**: `queryClient.prefetchQuery()` for first page

### Infinite Scroll Variant

- **Widget**: `RecipeListInfinite` in `/src/widgets/recipes/recipe-list-infinite/`
- **Store**: Uses `useInfiniteScrollStore` for loading states
- **Query**: `useInfiniteQuery` with automatic page loading
- **Prefetch**: `queryClient.prefetchInfiniteQuery()` for first page
- **Features**:
  - Intersection Observer for automatic loading
  - "Load More" button fallback
  - Reset on search query changes

## Next Steps for GrowthBook Integration

1. **Install GrowthBook SDK**:

   ```bash
   npm install @growthbook/growthbook
   ```

2. **Replace Environment Variable**:

   ```typescript
   // Replace this line in recipes-page.component.tsx
   const RECIPE_LIST_VARIANT = process.env.RECIPE_LIST_VARIANT || "paginated";

   // With GrowthBook feature flag evaluation
   const { value: recipeListVariant } = useFeature("recipe-list-variant");
   ```

3. **Configure Experiment**:
   - Create experiment in GrowthBook dashboard
   - Set up user targeting rules
   - Define success metrics (engagement, scroll depth, etc.)

## Files Modified/Created

### New Files

- `/src/features/infinite-scroll/` - Infinite scroll store and provider
- `/src/widgets/recipes/recipe-list-paginated/` - Renamed paginated widget
- `/src/widgets/recipes/recipe-list-infinite/` - New infinite scroll widget

### Modified Files

- `/src/entities/api/recipes/recipe.query.ts` - Added infinite query options
- `/src/widgets/recipes/index.ts` - Updated exports
- `/src/modules/recipes/recipes-page/recipes-page.component.tsx` - Added variant toggle

## Testing Checklist

- [ ] Paginated variant loads correctly
- [ ] Infinite scroll variant loads correctly
- [ ] Search functionality works in both variants
- [ ] Pagination resets on search (paginated)
- [ ] Infinite scroll resets on search (infinite)
- [ ] Loading states display properly
- [ ] Error handling works in both variants
- [ ] Build succeeds with both variants
