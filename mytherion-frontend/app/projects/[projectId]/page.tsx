'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { fetchProject, clearCurrentProject } from '@/app/store/projectSlice';
import { fetchProjectDashboardStats } from '@/app/store/dashboardSlice';
import Link from 'next/link';
import StatCard from '@/app/components/ui/StatCard';
import ModuleCard from '@/app/components/ui/ModuleCard';
import DualSidebar from '@/app/components/DualSidebar';
import DashboardHeader from '@/app/components/DashboardHeader';
import { getProjectNavItems, getManagementItems } from '@/app/config/projectNavigation';

export default function ProjectDashboard() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { currentProject, loading: projectLoading, error: projectError } = useAppSelector((state) => state.projects);
  const { stats, loading: statsLoading, error: statsError } = useAppSelector((state) => state.dashboard);
  const projectId = Number(params.projectId);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProject(projectId));
      dispatch(fetchProjectDashboardStats(projectId));
    }

    return () => {
      dispatch(clearCurrentProject());
    };
  }, [projectId, dispatch]);

  const projectNavItems = getProjectNavItems(projectId);
  const managementItems = getManagementItems();

  if ((projectLoading || statsLoading) && !currentProject) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (projectError || statsError || !currentProject) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-dark">
        <div className="text-center">
          <p className="text-red-400 mb-4">{projectError || statsError || 'Project not found'}</p>
          <Link
            href="/"
            className="text-primary hover:text-primary/80 transition-colors"
          >
             Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex h-screen overflow-hidden bg-[#16111B]">
      {/* Background Ley Lines - Exact Design Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#0F0F23]">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[100%] bg-[#a855f7]/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-[#fbbf24]/5 rounded-full blur-[160px]" />
      </div>

      {/* Dual Sidebar with Project Context */}
      <DualSidebar 
        activeSection="overview" 
        activeIcon="overview"
        projectId={projectId}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <DashboardHeader />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-[48px] space-y-[48px] scroll-smooth relative z-10 custom-scrollbar">
          
          {/* Page Title & Back Link */}
          <div>
            <Link href="/" className="inline-flex items-center text-primary text-xs font-bold uppercase tracking-widest hover:text-white transition-colors mb-4 group">
              <span className="material-symbols-outlined text-[18px] mr-2 group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Back to Worlds
            </Link>
            <h1 className="text-display-lg">
              {currentProject.name}
            </h1>
            <p className="text-subtitle-muted mt-1 max-w-md">
              Managing the multi-verse arcana of this realm.
            </p>
          </div>

          {/* Project Overview Card */}
          <section className="glass-card rounded-3xl p-8 relative overflow-hidden border-white/5 bg-black/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-8">Project Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard
                  title="Total Entities"
                  value={stats?.totalEntities || 0}
                  icon="auto_stories"
                  loading={statsLoading}
                  subtitle={stats && stats.entitiesThisWeek > 0 ? `+${stats.entitiesThisWeek} this week` : undefined}
                />
                <StatCard
                  title="Characters"
                  value={stats?.entityCountByType?.['CHARACTER'] || 0}
                  icon="person"
                  loading={statsLoading}
                  subtitleColor="text-blue-400"
                />
                <StatCard
                  title="Locations"
                  value={stats?.entityCountByType?.['LOCATION'] || 0}
                  icon="location_on"
                  loading={statsLoading}
                  subtitleColor="text-green-400"
                />
              </div>
            </div>
          </section>

          {/* World Modules Section */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">World Modules</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ModuleCard
                title="Codex Browser"
                description={`Explore all entities, lore entries, and myths of ${currentProject.name}.`}
                icon="menu_book"
                href={`/projects/${projectId}/entities`}
                badge="PRIMARY"
                badgeType="primary"
              />
              <ModuleCard
                title="Timeline"
                description="Visualize the chronological history and major eras of your world."
                icon="auto_graph"
                badge="Coming Soon"
                badgeType="disabled"
                disabled
              />
              <ModuleCard
                title="Relationship Map"
                description="Map out the intricate connections between characters and factions."
                icon="hub"
                badge="Coming Soon"
                badgeType="disabled"
                disabled
              />
            </div>
          </section>

          {/* Quick Create Section */}
          <section className="pt-12 border-t border-white/5">
            <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-6">Quick Create</h3>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center space-x-3 px-6 py-4 glass-card rounded-xl border-white/5 hover:border-primary/50 transition-all hover:bg-white/5 group bg-black/20">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">person_add</span>
                <span className="text-sm font-semibold text-slate-200">New Character</span>
              </button>
              <button className="flex items-center space-x-3 px-6 py-4 glass-card rounded-xl border-white/5 hover:border-primary/50 transition-all hover:bg-white/5 group bg-black/20">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">add_location_alt</span>
                <span className="text-sm font-semibold text-slate-200">New Location</span>
              </button>
              <button className="flex items-center space-x-3 px-6 py-4 glass-card rounded-xl border-white/5 hover:border-primary/50 transition-all hover:bg-white/5 group bg-black/20">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">history_edu</span>
                <span className="text-sm font-semibold text-slate-200">New Lore Entry</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
