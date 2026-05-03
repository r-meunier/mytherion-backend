export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

/**
 * Get global icon-level navigation (leftmost bar)
 */
export const getGlobalIconItems = (): NavItem[] => [
  { id: "projects", icon: "public", label: "Worlds", href: "/" },
  { id: "lorebook", icon: "library_books", label: "Codex", href: "#" },
  { id: "timeline", icon: "history_edu", label: "Timeline", href: "#" },
  { id: "characters", icon: "group", label: "Characters", href: "#" },
  { id: "atlas", icon: "map", label: "Atlas", href: "#" },
];

/**
 * Get project-specific icon-level navigation (leftmost bar)
 */
export const getProjectIconItems = (projectId: number): NavItem[] => [
  { id: "overview", icon: "dashboard", label: "Dashboard", href: `/projects/${projectId}` },
  { id: "entities", icon: "menu_book", label: "Codex", href: `/projects/${projectId}/entities` },
  { id: "timeline", icon: "history_edu", label: "Timeline", href: "#" },
  { id: "atlas", icon: "map", label: "Atlas", href: "#" },
];

/**
 * Get global navigation items (middle bar)
 */
export const getGlobalNavItems = (): NavItem[] => [
  { id: "projects", label: "Worlds", href: "/", icon: "public" },
  { id: "lorebook", label: "Codex", href: "#", icon: "library_books" },
  { id: "timeline", label: "Timeline", href: "#", icon: "history_edu" },
  { id: "characters", label: "Characters", href: "#", icon: "group" },
  { id: "atlas", label: "Atlas", href: "#", icon: "map" },
];

/**
 * Get global library items
 */
export const getGlobalLibraryItems = (): NavItem[] => [
  { id: "bestiary", label: "Bestiary", href: "#", icon: "pets" },
];

/**
 * Get global management items (Bottom section)
 */
export const getGlobalManagementItems = (): NavItem[] => [
  { id: "settings", label: "Settings", href: "#", icon: "settings" },
  { id: "support", label: "Support", href: "#", icon: "help" },
];

/**
 * Get navigation items for a specific project
 */
export const getProjectNavItems = (projectId: number): NavItem[] => [
  { id: "overview", label: "Overview", href: `/projects/${projectId}`, icon: "dashboard" },
  { id: "entities", label: "Codex", href: `/projects/${projectId}/entities`, icon: "menu_book" },
  { id: "timeline", label: "Timeline", href: "#", icon: "history_edu" },
  { id: "atlas", label: "Atlas", href: "#", icon: "map" },
  { id: "notes", label: "Project Notes", href: "#", icon: "note_alt" },
];

/**
 * Get management items for project sidebar
 */
export const getManagementItems = (projectId: number): NavItem[] => [
  { id: "settings", label: "Settings", href: "#", icon: "settings" },
  { id: "support", label: "Support", href: "#", icon: "help" },
];
