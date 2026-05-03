"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useAppSelector } from "../store/hooks";
import { 
  getGlobalIconItems, 
  getProjectIconItems, 
  getGlobalNavItems, 
  getGlobalLibraryItems,
  getGlobalManagementItems,
  getProjectNavItems, 
  getManagementItems,
  NavItem 
} from "../config/projectNavigation";

interface DualSidebarProps {
  activeSection?: string;
  activeIcon?: string;
  projectId?: number;
  navItems?: NavItem[];
  libraryItems?: NavItem[];
  managementItems?: NavItem[];
  title?: string;
  subTitle?: string;
  onCreateProject?: () => void;
}

export default function DualSidebar({
  activeSection = "projects",
  activeIcon,
  projectId,
  navItems: customNavItems,
  libraryItems: customLibraryItems,
  managementItems: customManagementItems,
  title: customTitle,
  subTitle: customSubTitle,
  onCreateProject,
}: DualSidebarProps) {
  const { currentProject } = useAppSelector((state) => state.projects);
  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === "ADMIN";

  // Determine Navigation Mode
  const isProjectMode = !!projectId;
  const activeProjectId = projectId || currentProject?.id;

  // Icon Navigation (Left Rail)
  const iconNavItems = useMemo(() => {
    if (isProjectMode && activeProjectId) {
      return getProjectIconItems(activeProjectId);
    }
    return getGlobalIconItems();
  }, [isProjectMode, activeProjectId]);

  // Main Navigation (Middle Bar)
  const currentNavItems = useMemo(() => {
    if (customNavItems) return customNavItems;
    if (isProjectMode && activeProjectId) {
      return getProjectNavItems(activeProjectId);
    }
    return getGlobalNavItems();
  }, [customNavItems, isProjectMode, activeProjectId]);

  // Library Items
  const currentLibraryItems = useMemo(() => {
    if (customLibraryItems) return customLibraryItems;
    return getGlobalLibraryItems();
  }, [customLibraryItems]);

  // Management Items
  const finalManagementItems = useMemo(() => {
    if (customManagementItems) return customManagementItems;
    const items = isProjectMode && activeProjectId 
      ? getManagementItems(activeProjectId) 
      : getGlobalManagementItems();
    
    if (isAdmin && !isProjectMode) {
      const adminItem = { id: 'admin', label: 'Admin Portal', href: '/admin/users', icon: 'admin_panel_settings' };
      if (!items.some(i => i.id === 'admin')) {
        return [items[0], adminItem, ...items.slice(1)];
      }
    }
    return items;
  }, [customManagementItems, isProjectMode, activeProjectId, isAdmin]);

  const displayTitle = customTitle || (isProjectMode ? currentProject?.name : "Mytherion") || "Mytherion";
  const displaySubTitle = customSubTitle || (isProjectMode ? "ACTIVE WORLD" : "Archivist Level 4");

  const currentActiveSection = activeIcon || activeSection;

  return (
    <div className="flex h-full shrink-0 relative z-50">
      {/* Left Sidebar Rail (80px) - Matching Design Layout */}
      <aside className="w-20 bg-[#0F0F23] border-r border-white/5 flex flex-col items-center py-6 gap-8">
        {/* Logo */}
        <Link href="/" className="group mb-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-500 group-hover:scale-110">
            <span className="material-symbols-outlined text-white text-3xl">
              auto_awesome
            </span>
          </div>
        </Link>

        {/* Navigation Rail */}
        <nav className="flex flex-col gap-6">
          {iconNavItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group ${
                currentActiveSection === item.id
                  ? "text-[#F1E0FF] bg-primary/20 border-l-4 border-primary"
                  : "text-white/30 hover:bg-white/5 hover:text-white"
              }`}
              title={item.label}
            >
              <span 
                className="material-symbols-outlined text-2xl"
                style={{fontVariationSettings: currentActiveSection === item.id ? "'FILL' 1, 'wght' 700" : "'FILL' 0, 'wght' 400"}}
              >
                {item.icon}
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom Rail Section (Settings, Support, User) */}
        <div className="mt-auto flex flex-col gap-6 items-center w-full px-4 mb-2">
          {finalManagementItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group ${
                currentActiveSection === item.id ? "text-primary bg-primary/10" : "text-white/20 hover:text-white hover:bg-white/5"
              }`}
              title={item.label}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
            </Link>
          ))}
          <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors mt-2 ring-2 ring-white/5">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </aside>

      {/* Inner Sidebar (256px / w-64) - Matching Design Width */}
      <aside className="w-64 bg-[#16111B]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col pt-8 font-display">
        {/* Header */}
        <div className="px-8 mb-12">
          <Link href="/">
            <h2 className="text-2xl font-bold tracking-tighter text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.3)] truncate">
              {displayTitle}
            </h2>
          </Link>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em] mt-1.5">
            {displaySubTitle}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-10 overflow-y-auto custom-scrollbar">
          {/* Main Nav */}
          <div className="space-y-1">
            <p className="px-4 text-[10px] font-black text-white/10 uppercase tracking-[0.4em] mb-4">
              Navigation
            </p>
            {currentNavItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  currentActiveSection === item.id
                    ? "sidebar-item-active"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] transition-all duration-300 group-hover:scale-110 ${
                  currentActiveSection === item.id ? "text-[#F1E0FF]" : "opacity-40"
                }`}>
                  {item.icon}
                </span>
                <span className="text-sm font-semibold tracking-tight truncate">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Library Nav */}
          <div className="space-y-1">
            <p className="px-4 text-[10px] font-black text-white/10 uppercase tracking-[0.4em] mb-4">
              Library
            </p>
            {currentLibraryItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all group"
              >
                <span className="material-symbols-outlined text-[20px] opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </span>
                <span className="text-sm font-semibold tracking-tight truncate">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Creation Action */}
          {!isProjectMode && onCreateProject && (
            <div className="px-4 pt-4 pb-8">
              <button 
                onClick={onCreateProject}
                className="w-full bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 hover:border-primary/50 group active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[20px] text-primary group-hover:scale-110 transition-transform">add_circle</span>
                <span className="text-xs font-bold uppercase tracking-widest">Create New Project</span>
              </button>
            </div>
          )}
        </nav>

        {/* Management (Settings/Support with labels) */}
        <div className="mt-auto pb-8 px-4 space-y-1">
          {finalManagementItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                currentActiveSection === item.id
                  ? "bg-white/5 text-white"
                  : "text-white/30 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-[20px] opacity-30 group-hover:opacity-100 transition-all duration-300">
                {item.icon}
              </span>
              <span className="text-sm font-semibold tracking-tight truncate">{item.label}</span>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
