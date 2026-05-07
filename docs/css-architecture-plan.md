# Implementation Plan: CSS Tree Logic & Inheritance

This plan outlines the restructuring of `globals.css` into a hierarchical system of CSS files, following an inheritance model (similar to an interface and its implementations).

## 1. CSS Hierarchy Structure

We will create a `app/styles` directory to house the new CSS architecture:

```text
app/styles/
├── base.css        (The "Interface" - Core variables, resets, and shared utilities)
├── auth.css        (Child - Login & Register specific look)
├── projects.css    (Child - Main Dashboard / Projects entrypoint look)
└── app-core.css    (Child - Standard application look)
```

## 2. Variable & Logic Separation

### A. `base.css` (The Interface)
- **Tailwind Foundation**: `@import "tailwindcss";` and `@theme`.
- **Global Palette**: Primary/Secondary colors, Gold, and Semantic text tokens.
- **Root Logic**: Definition of standard spacing, transitions, and glassmorphism defaults.
- **Typography System**: All `@utility text-*` classes to ensure semantic consistency.
- **Resets**: `body`, `scrollbar`, `selection`, and `Material Symbols`.

### B. `auth.css` (Login/Register)
- **Inheritance**: `@import "./base.css";`
- **Overrides**: 
    - Darker background variables (`#02020a`).
    - Specialized glass opacity for the auth card.
- **Specifics**: `.nebula`, `.starfield`, `.floating-element`.

### C. `projects.css` (Projects Dashboard `/`)
- **Inheritance**: `@import "./base.css";`
- **Overrides**:
    - Dashboard-specific background (`#16111B`).
    - Sidebar dimensions and active state colors.
- **Specifics**: `.project-card`, dashboard-specific scrollbars, and filter bar utilities.

### D. `app-core.css` (The Rest)
- **Inheritance**: `@import "./base.css";`
- **Standard Look**: Balanced glassmorphism and the default app background.
- **Specifics**: Complex modal behaviors, editor-specific utilities.

## 3. Implementation Steps

1. **Create Directory**: Create `app/styles`.
2. **Deconstruct `globals.css`**:
   - Move common code to `app/styles/base.css`.
   - Create `app/styles/auth.css` with its specific logic.
   - Create `app/styles/projects.css` with dashboard logic.
   - Create `app/styles/app-core.css`.
3. **Update Imports**:
   - Create/Update layout files to import the correct CSS file for each route.
   - Use Route Groups (`(auth)`, `(dashboard)`, etc.) if necessary to keep layouts clean, or selectively import in existing `page.tsx`.
4. **Validation**: Ensure that switching between `/login` and `/` correctly applies the unique backgrounds and component styles without leakage.

## 4. Key Decisions on Variables

| Variable Group | Scope | Rationale |
| :--- | :--- | :--- |
| `--primary`, `--gold` | **Base** | Brand identity must be consistent. |
| `--background-dark` | **Override** | Auth needs absolute black, Dashboard needs deep purple/grey. |
| `--glass-bg` | **Override** | Different levels of transparency based on context. |
| `--font-*` | **Base** | Typography should be universal. |

---

> [!IMPORTANT]
> Since Next.js global CSS imports have side effects (they apply to the whole page), we will use specific layout files to manage these imports.
> For `/` (Projects), we may need to wrap it in a specific layout or handle it in the root if it's the primary entry.

---

**Next Steps**:
1. Create the files in `app/styles`.
2. Populate them by splitting the current `globals.css`.
3. Update `app/layout.tsx` and create specific layouts for Auth.
