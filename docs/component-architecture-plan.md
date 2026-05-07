# Component Coupling & Architecture Plan

## 1. Goal: Stronger Coupling
To ensure the frontend and backend stay in sync regarding entity components, we are implementing the following patterns:

### A. Shared Type Registry
We use a centralized `ComponentType` enum in both frontend and backend (simulated via string constants in polymorphic handling in Kotlin, and a formal Enum in TypeScript).
- **Best Practice**: The backend should be the source of truth. If the backend defines a new component in its `@JsonSubTypes` list, the frontend's `ComponentType` enum must be updated to match.

### B. Formal Identification (IDs)
We are adding an `id` field to `EntityComponent`.
- **Why?**: In the future, we might want to support multiple components of the same type (e.g., two "Custom" blocks). A unique `id` allows the frontend to track these instances correctly in lists without relying on the `type` index.
- **Implementation**: In the backend, `id` defaults to `type` in the base interface. In the frontend, we add a required `id` field to the `EntityComponent` union.

## 2. Workflow for Adding a New Component
To add a component "X":

1. **Backend Model**:
    - Create `XComponent.kt` and `XData` class.
    - Add `XComponent::class` to `@JsonSubTypes` in `EntityComponent.kt`.
2. **Frontend Types**:
    - Add `X` to `ComponentType` enum in `entity.ts`.
    - Add `XData` interface.
    - Add `| { id: string; type: ComponentType.X; data: XData }` to `EntityComponent` union.
3. **Frontend UI**:
    - Create `XFields.tsx`.
    - Add case `ComponentType.X` to `ComponentDispatcher.tsx`.
    - Add `X` to relevant archetype in `TAB_CONFIG` (in `EntityMetadataEditor.tsx`).

## 3. Future Improvements: Meta-Data Driven UI
To avoid manual updates in step 3, we could implement a system where:
- The backend provides a `/api/entities/components/schema` endpoint.
- The frontend uses this schema to dynamically generate forms (e.g., using a JSON Schema form builder).
- This would allow adding components purely by changing the backend.

## 4. Current Progress
- [x] Introduced `ComponentType` enum in Frontend.
- [x] Added `id` property to `EntityComponent` in Backend (defaulting to `type`).
- [x] Added `ORIGINS` component to Frontend (matching Backend).
- [x] Add `id` property to `EntityComponent` in Frontend.
- [x] Update `EntityForm.tsx` to generate/provide `id` for components.
- [x] Update `ComponentDispatcher.tsx` to handle `ORIGINS` and other missing types.
