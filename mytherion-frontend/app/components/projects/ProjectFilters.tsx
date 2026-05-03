"use client";

import { useState } from "react";

interface ProjectFiltersProps {
  onSearchChange?: (query: string) => void;
  onSortChange?: (sort: string) => void;
  onGroupChange?: (group: string) => void;
  onViewChange?: (view: "grid" | "list") => void;
}

export default function ProjectFilters({
  onSearchChange,
  onSortChange,
  onGroupChange,
  onViewChange
}: ProjectFiltersProps) {
  const [view, setView] = useState<"grid" | "list">("grid");

  const handleViewToggle = (newView: "grid" | "list") => {
    setView(newView);
    onViewChange?.(newView);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Search / Filter */}
      <div className="flex flex-col gap-1.5 min-w-[240px]">
        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">
          Search/Filter:
        </label>
        <div className="flex items-center gap-0">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search world/project..."
              className="w-full bg-white/5 border border-white/10 border-r-0 rounded-l-lg px-4 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
          <button className="h-[38px] px-3 bg-white/5 border border-white/10 rounded-r-lg text-white/30 hover:text-white hover:bg-white/10 transition-all">
            <span className="material-symbols-outlined text-[20px]">filter_alt</span>
          </button>
        </div>
      </div>

      {/* Sort By */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">
          Sort By:
        </label>
        <div className="relative">
          <select 
            className="appearance-none bg-white/5 border border-white/10 rounded-lg pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all cursor-pointer min-w-[120px]"
            onChange={(e) => onSortChange?.(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="recent">Recent</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none text-[20px]">
            expand_more
          </span>
        </div>
      </div>

      {/* Group By */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">
          Group By:
        </label>
        <div className="relative">
          <select 
            className="appearance-none bg-white/5 border border-white/10 rounded-lg pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all cursor-pointer min-w-[120px]"
            onChange={(e) => onGroupChange?.(e.target.value)}
          >
            <option value="series">Series</option>
            <option value="type">Type</option>
            <option value="none">None</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none text-[20px]">
            expand_more
          </span>
        </div>
      </div>

      {/* View As */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">
          View As:
        </label>
        <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-lg h-[38px]">
          <button 
            onClick={() => handleViewToggle("grid")}
            className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${
              view === "grid" 
                ? "bg-white/10 text-white shadow-sm" 
                : "text-white/30 hover:text-white/60"
            }`}
          >
            Grid
          </button>
          <button 
            onClick={() => handleViewToggle("list")}
            className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${
              view === "list" 
                ? "bg-white/10 text-white shadow-sm" 
                : "text-white/30 hover:text-white/60"
            }`}
          >
            List
          </button>
        </div>
      </div>
    </div>
  );
}
