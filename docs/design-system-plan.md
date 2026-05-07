# Design System: Centralized Semantic Typography

Based on the goal of a granular, maintainable design system that separates different navigation contexts and defines specific text color roles for main content versus card-based content.

## Proposed Design System Structure

### 1. Separate Navigation Styles
- **Sidebar Nav Header**: `text-sidebar-nav-header` (Uppercase, tracking, muted slate).
- **Top Nav Header**: `text-top-nav-header` (For labels in the `DashboardHeader`, potentially different tracking or weight).

### 2. Semantic Color Roles
- **Main Section Text**: Standard high-contrast text for page-level reading.
- **Card Text**: Slightly softer contrast for text inside glass/surface cards.
- **Muted Metadata**: For timestamps and secondary labels.

### 3. Heading Hierarchy
- **Section Heading**: For main page sections (e.g., `<h2>` / `<h3>` on the page).
- **Card Heading**: For titles inside cards (e.g., `<h4>` / `<h5>` inside a `StatCard`).

## Proposed Changes

### `globals.css`
- Add semantic color variables to `:root`.
- Add `@utility` definitions for:
    - `text-sidebar-nav-header`
    - `text-top-nav-header`
    - `text-section-heading`
    - `text-card-heading`
    - `text-micro-badge`
    - `text-body-muted`

### Component Updates
- Update `DualSidebar.tsx` → `text-sidebar-nav-header`.
- Update `DashboardHeader.tsx` → `text-top-nav-header` / `text-micro-badge`.
- Update `StatCard.tsx`, `RecentChronicles.tsx`, `WorldMapCard.tsx` → `text-card-heading` / `text-body-muted`.
- Update `app/page.tsx`, `app/projects/[projectId]/page.tsx` → `text-section-heading`.

## Verification Plan

### Manual Verification
- Ensure that switching between "Sidebar Nav Headers" and "Top Nav Headers" in `globals.css` allows for independent control.
- Verify color contrast in cards versus main background sections.
- Ensure all text remains accessible (minimum 12px for primary labels).
