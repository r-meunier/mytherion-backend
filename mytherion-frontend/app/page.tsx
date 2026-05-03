"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { checkAuth } from "./store/authSlice";
import { fetchDashboardStats } from "./store/dashboardSlice";
import { fetchProjects, clearCurrentProject } from "./store/projectSlice";
import { useRouter } from "next/navigation";
import DualSidebar from "./components/DualSidebar";
import DashboardHeader from "./components/DashboardHeader";
import ProjectList from "./components/projects/ProjectList";
import ProjectModal from "./components/projects/ProjectModal";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

  // Check authentication on mount
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Fetch projects only after auth is initialized
  useEffect(() => {
    if (isInitialized) {
      if (isAuthenticated) {
        dispatch(fetchDashboardStats());
        dispatch(fetchProjects({ page: 0, size: 8 }));
        dispatch(clearCurrentProject());
      } else {
        router.push("/login");
      }
    }
  }, [dispatch, isInitialized, isAuthenticated, router]);

  return (
    <div className="relative z-10 flex h-screen overflow-hidden bg-[#16111B]">
      {/* Background Ley Lines - Exact Design Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0F0F23]">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[100%] bg-[#a855f7]/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-[#fbbf24]/5 rounded-full blur-[160px]" />
      </div>

      {/* Dual Sidebar (Exact Design Specs: 21rem / 336px) */}
      <DualSidebar 
        activeSection="projects" 
        activeIcon="projects"
        onCreateProject={() => setShowCreateModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header (Matching Tabbed Design) */}
        <DashboardHeader onCreateProject={() => setShowCreateModal(true)} />

        {/* Dashboard Content - Matching Design p-stack-lg (48px) */}
        <div className="flex-1 overflow-y-auto p-[48px] space-y-[48px] scroll-smooth relative z-10 custom-scrollbar">
          
          {/* Section Header & Filter Bar (Exact Match) */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h1 className="text-display-lg text-[#E6E1E5]">
                Your Worlds
              </h1>
              <p className="text-white/40 mt-1 font-medium tracking-wide">
                Access and manage your multi-verse projects.
              </p>
            </div>
            
            {/* Filter Bar (Precise Design Specs) */}
            <div className="flex items-center gap-2 p-1 glass-card rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)] border-white/5 bg-black/40">
              <button 
                onClick={() => setActiveFilter("all")}
                className={`px-5 py-1.5 rounded-full text-[13px] font-bold transition-all duration-300 ${
                  activeFilter === "all" 
                    ? "bg-[#D8B4FE] text-[#581C87] shadow-lg" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                All Projects
              </button>
              <button 
                onClick={() => setActiveFilter("edited")}
                className={`px-5 py-1.5 rounded-full text-[13px] font-bold transition-all duration-300 ${
                  activeFilter === "edited" 
                    ? "bg-[#D8B4FE] text-[#581C87] shadow-lg" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                Recently Edited
              </button>
              <button 
                onClick={() => setActiveFilter("favorites")}
                className={`px-5 py-1.5 rounded-full text-[13px] font-bold transition-all duration-300 ${
                  activeFilter === "favorites" 
                    ? "bg-[#D8B4FE] text-[#581C87] shadow-lg" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                Favorites
              </button>
              <div className="w-px h-5 bg-white/10 mx-1"></div>
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
              </button>
            </div>
          </div>

          {/* Library Grid */}
          <section>
            <ProjectList 
              onCreateClick={() => setShowCreateModal(true)}
              onEditClick={(id) => { /* Selection handles navigation */ }}
            />
          </section>
        </div>
      </main>

      {/* Creation Modal */}
      <ProjectModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
}
