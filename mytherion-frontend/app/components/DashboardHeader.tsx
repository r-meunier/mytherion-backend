"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logoutUser } from "../store/authSlice";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface DashboardHeaderProps {
  onCreateProject?: () => void;
}

export default function DashboardHeader({ onCreateProject }: DashboardHeaderProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, isInitialized } = useAppSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/", active: pathname === "/" },
    { label: "Community", href: "#", active: false },
    { label: "Assets", href: "#", active: false },
  ];

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-[#16111B]/80 backdrop-blur-xl relative z-50">
      {/* Left Side: Branding & Navigation Tabs */}
      <div className="flex items-center gap-8 h-full">
        {/* Branding */}
        <Link href="/" className="group flex items-center gap-3 mr-4">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 shadow-lg shadow-primary/10">
            <span className="material-symbols-outlined text-primary text-[24px]">auto_awesome</span>
          </div>
          <div className="hidden sm:flex flex-col">
            <h2 className="text-xl font-bold tracking-tighter text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.3)] leading-none">
              Mytherion
            </h2>
            <p className="text-[9px] text-white/30 font-bold uppercase tracking-[0.3em] mt-1">
              Archivist Level 4
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 h-full">
          {navItems.map((item) => {
            // Transform Dashboard into "Back to Worlds" in project mode
            const isDashboard = item.label === "Dashboard";
            const isProjectMode = pathname.startsWith("/projects/");
            const displayLabel = isDashboard && isProjectMode ? "Back to Worlds" : item.label;
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium h-full px-5 flex items-center transition-all duration-300 relative top-[1px] group/nav ${
                  item.active 
                    ? "text-[#D8B4FE] border-b-2 border-[#A855F7] bg-white/[0.04]" 
                    : "text-white/70 hover:text-[#D8B4FE] hover:bg-white/[0.02]"
                }`}
              >
                {isDashboard && isProjectMode && (
                  <span className="material-symbols-outlined text-[18px] mr-2 transition-transform group-hover/nav:-translate-x-1">
                    arrow_back
                  </span>
                )}
                {displayLabel}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar (Exact Design Specs) */}
        <div className="hidden lg:block relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-[20px]">
            search
          </span>
          <input
            className="pl-10 pr-4 py-1.5 bg-white/5 border-none focus:ring-1 focus:ring-primary/40 rounded-full text-sm w-64 text-white placeholder:text-white/30 transition-all"
            placeholder="Search archives..."
            type="text"
          />
        </div>

        {!isInitialized ? (
          <div className="h-10 w-24 bg-white/5 rounded-lg animate-pulse"></div>
        ) : isAuthenticated && user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-[22px]">notifications</span>
              </button>

              {/* Profile Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                  <span className="material-symbols-outlined text-[24px]">account_circle</span>
                </button>

                <div className={`absolute right-0 top-full mt-2 w-56 bg-[#0f0f23] backdrop-blur-3xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 origin-top-right z-50 ${
                  isDropdownOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
                }`}>
                  <div className="p-3 space-y-1">
                    <div className="px-3 py-2 border-b border-white/5 mb-1">
                      <p className="text-xs font-bold text-white truncate">{user.username || user.email}</p>
                      <p className="text-[10px] text-primary uppercase tracking-[0.2em] mt-0.5">Arbiter Level 4</p>
                    </div>
                    <Link 
                      href="#"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">settings</span>
                      Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-400/80 hover:text-white hover:bg-rose-500/10 rounded-lg transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* New Project Action (Responsive) */}
            {onCreateProject && (
              <button 
                onClick={onCreateProject}
                className="bg-primary/20 text-primary border border-primary/30 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-primary/30 transition-all active:scale-[0.98] shadow-lg shadow-primary/10 flex items-center gap-2 whitespace-nowrap group"
              >
                <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform">add</span>
                <span className="hidden xl:inline">New Project</span>
              </button>
            )}
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-primary hover:bg-primary/80 text-white px-5 py-1.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
