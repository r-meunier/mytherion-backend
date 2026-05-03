"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface GlassSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  minWidth?: string;
}

function GlassSelect({ label, value, options, onChange, minWidth = "140px" }: GlassSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">
        {label}:
      </label>
      <div className="relative" style={{ minWidth }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white transition-all hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-1 focus:ring-primary/40 ${isOpen ? 'ring-1 ring-primary/40' : ''}`}
        >
          <span className="truncate">{selectedOption?.label}</span>
          <span className={`material-symbols-outlined text-[20px] text-white/20 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>

        {isOpen && (
          <div className="absolute top-[calc(100%+8px)] left-0 w-full z-50 bg-[#16111B]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between group ${
                    option.value === value 
                      ? 'bg-primary/10 text-primary font-semibold' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {option.label}
                  {option.value === value && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
  const [sortBy, setSortBy] = useState("date");
  const [groupBy, setGroupBy] = useState("none");

  const handleViewToggle = (newView: "grid" | "list") => {
    setView(newView);
    onViewChange?.(newView);
  };

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "series", label: "Series" },
    { value: "date", label: "Date" }
  ];

  const groupOptions = [
    { value: "none", label: "None" },
    { value: "series", label: "Series" },
    { value: "date", label: "Date" },
    { value: "shared", label: "Shared" }
  ];

  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Search / Filter */}
      <div className="flex flex-col gap-1.5 min-w-[260px]">
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
      <GlassSelect
        label="Sort By"
        value={sortBy}
        options={sortOptions}
        onChange={(val) => {
          setSortBy(val);
          onSortChange?.(val);
        }}
      />

      {/* Group By */}
      <GlassSelect
        label="Group By"
        value={groupBy}
        options={groupOptions}
        onChange={(val) => {
          setGroupBy(val);
          onGroupChange?.(val);
        }}
      />

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
