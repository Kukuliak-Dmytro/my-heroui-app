# Recipes Architecture Plan

## Overview

Server-side rendered recipes application with feature-based architecture using Next.js, HeroUI, and Zustand. Uses DummyJSON API for recipe data.

## Component Tree Structure

```
src/
├── app/
│   ├── recipes/
│   │   ├── page.tsx                     # Server Component - fetches & filters recipes
│   │   └── [id]/
│   │       └── page.tsx                 # Server Component - fetches single recipe
│   └── ...
├── widgets/
│   ├── recipes/                         # Recipes-specific UI
│   │   ├── recipe-list/
│   │   │   ├── recipe-list.component.tsx
│   │   │   └── index.ts
│   │   ├── recipe-card/
│   │   │   ├── recipe-card.component.tsx
│   │   │   └── index.ts
│   │   ├── filter-panel/
│   │   │   ├── filter-panel.component.tsx  # Client Component for filter UI
│   │   │   └── index.ts
│   │   └── index.ts
│   └── header/                          # Self-sufficient header
│       ├── header.component.tsx
│       └── index.ts
├── features/
│   ├── pagination/                      # URL-based pagination
│   │   ├── pagination.component.tsx     # <Pagination<T>>
│   │   └── index.ts
│   ├── search/                          # URL-based search
│   │   ├── search.component.tsx
│   │   └── index.ts
│   └── index.ts
├── entities/
│   └── api/
│       └── recipes/
│           ├── recipes.api.ts           # Server-side filtering with DummyJSON
│           └── index.ts
└── shared/
    ├── ui/                              # Base building blocks
    │   ├── button/
    │   ├── card/
    │   ├── select/
    │   ├── input/
    │   └── ...
    └── store/
        ├── ui.store.ts                  # Global UI state only
        └── index.ts
```

## Data Flow Pattern

### Server-Side Prefetching with TanStack Query

- Server components prefetch data using TanStack Query
- Data is cached and passed to client via HydrationBoundary
- Client components use the same fetch functions as queryFn
- Background refetching every 30 seconds for real-time updates

### Client-Side State Management

- Zustand manages UI state and user preferences
- React Hook Form handles filter forms
- URL parameters control data fetching
- TanStack Query manages data caching and synchronization

## Import Rules

```typescript
// ✅ Allowed imports:
// app/recipes/page.tsx -> entities/api/recipes, widgets/recipes, features/pagination
// widgets/recipes -> shared/ui
// features/pagination -> shared/ui
// entities/api/recipes -> (no other layers)
// shared/store -> (no other layers)
```

## What Zustand Manages

### ✅ Appropriate for Zustand

- **UI state** - View mode (grid/list), sidebar state
- **User preferences** - Recently viewed, favorites
- **Form interactions** - Filter form state (temporary)

### ❌ NOT for Zustand

- **Recipes data** - Server-side fetched from DummyJSON
- **Individual recipe content** - Server-side rendered
- **Pagination state** - URL-based (`?page=1`)
- **Search state** - URL-based (`?search=query`)
- **Filter state** - URL-based (`?cuisine=italian`)
- **Authentication** - Use NextAuth

## File Structure Details

### Pages (Server Components)

- `app/recipes/page.tsx` - Fetches & filters recipes, renders RecipeList + FilterPanel
- `app/recipes/[id]/page.tsx` - Fetches single recipe, renders RecipeCard

### Widgets (Client Components)

- `widgets/recipes/recipe-list.component.tsx` - Renders list of recipes
- `widgets/recipes/recipe-card.component.tsx` - Renders individual recipe card
- `widgets/recipes/filter-panel.component.tsx` - Filter UI (updates URL)
- `widgets/header/header.component.tsx` - Site header

### Features (Reusable Logic)

- `features/pagination/` - URL-based pagination component
- `features/search/` - URL-based search component

### Entities (Data Layer)

- `entities/api/recipes/recipes.api.ts` - DummyJSON API with server-side filtering

### Shared (Infrastructure)

- `shared/ui/` - Base UI components (Button, Card, etc.)
- `shared/store/` - Global UI state

## DummyJSON API Integration

### Available Endpoints

- `GET /recipes` - Get all recipes
- `GET /recipes/search?q={query}` - Search recipes
- `GET /recipes/{id}` - Get single recipe
- `GET /recipes/category/{category}` - Get recipes by category
- `GET /recipes/cuisine/{cuisine}` - Get recipes by cuisine

### Filtering Capabilities

- **Cuisine**: Italian, American, Mexican, Asian, etc.
- **Difficulty**: Easy, Medium, Hard
- **Meal Type**: Breakfast, Lunch, Dinner, Snack
- **Cooking Time**: Range filtering
- **Rating**: Star rating filtering

## Implementation Steps

### Step 1: Setup TanStack Query

1. [x] Install @tanstack/react-query and @tanstack/react-query-devtools
2. [x] Create lib/query-client.ts with QueryClient configuration
3. [x] Add QueryClient provider to app/providers.tsx
4. [x] Configure 30-second staleTime and refetchInterval

### Step 2: Create API Functions

1. [x] Create entities/api/recipes/recipes.api.ts
2. [x] Implement fetchRecipes function with DummyJSON parameters
3. [x] Implement fetchRecipe function for single recipe
4. [x] Export functions from index.ts

### Step 3: Setup Server-Side Prefetching

1. [x] Create app/recipes/page.tsx as server component
2. [x] Import getQueryClient and fetchRecipes
3. [x] Use queryClient.prefetchQuery for recipes list
4. [x] Wrap return with HydrationBoundary and dehydrate
5. [x] Create app/recipes/[id]/page.tsx for single recipe
6. [x] Use queryClient.prefetchQuery for single recipe

### Step 4: Create Client Components

1. [x] Create widgets/recipes/recipe-list.component.tsx
2. [x] Use useQuery hook with same fetchRecipes function
3. [x] Create widgets/recipes/recipe-card.component.tsx
4. [x] Use useQuery hook for single recipe data
5. [x] Add loading states and error handling

### Step 5: Setup Zustand Store

1. Create shared/store/ui.store.ts
2. Define UI state interface (viewMode, sidebarOpen, etc.)
3. Create store with actions for UI state
4. Add user preferences (favorites, recentlyViewed)
5. Export store from index.ts

### Step 6: Create Filter Components

1. Create widgets/recipes/filter-panel.component.tsx
2. Use React Hook Form for filter forms
3. Use HeroUI components for form inputs
4. Implement URL parameter updates on form submit
5. Add search and pagination components

### Step 7: Integrate All Tools

1. Use HeroUI components throughout the app
2. Connect Zustand store to components
3. Use React Hook Form for all forms
4. Ensure TanStack Query handles all data fetching
5. Test 30-second revalidation functionality

## Implementation Notes

1. **No Type Safety in API Layer** - Follows architectural rules strictly
2. **Server-Side Prefetching** - TanStack Query prefetches data on server
3. **Client-Side Hydration** - Same fetch functions used for client queries
4. **30-Second Revalidation** - Automatic background refetching with Tanstack Query
5. **Strict Import Rules** - Higher layers can only import from lower layers
6. **DummyJSON Integration** - Use built-in filtering parameters
7. **SEO-Friendly** - Server-side prefetching with client-side hydration
8. **Performance** - Cached data with real-time updates
