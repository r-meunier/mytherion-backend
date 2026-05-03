"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkAuth } from "../store/authSlice";
import { fetchDashboardStats } from "../store/dashboardSlice";
import { fetchProjects, clearCurrentProject } from "../store/projectSlice";
import { useRouter } from "next/navigation";
import DualSidebar from "../components/DualSidebar";
import DashboardHeader from "../components/DashboardHeader";
import ProjectList from "../components/projects/ProjectList";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectModal from "../components/projects/ProjectModal";

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
              <h1 className="text-display-lg">
                Your Worlds
              </h1>
              <p className="text-subtitle-muted mt-1 max-w-md">
                Access and manage your multi-verse projects.
              </p>
            </div>
            
            {/* Filter Bar (New Logical UX) */}
            <ProjectFilters 
              onSearchChange={(q) => console.log("Search:", q)}
              onSortChange={(s) => console.log("Sort:", s)}
              onGroupChange={(g) => console.log("Group:", g)}
              onViewChange={(v) => console.log("View:", v)}
            />
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
