"use client";

import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number | undefined;
  subtitle?: string;
  subtitleColor?: string;
  icon: string;
  badges?: ReactNode;
  loading?: boolean;
  progressBar?: {
    value: number;
    label: string;
  };
}

export default function StatCard({
  title,
  value,
  subtitle,
  subtitleColor = "text-primary",
  icon,
  badges,
  loading,
  progressBar,
}: StatCardProps) {
  return (
    <div className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-all duration-500 cursor-pointer bg-[#16111b]/40 backdrop-blur-xl border border-white/5 shadow-2xl min-h-[160px] flex flex-col justify-center">
      {/* Background Icon Watermark */}
      <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
        <span className="material-symbols-outlined" style={{ fontSize: '140px' }}>{icon}</span>
      </div>

      {/* Content */}
      <p className="text-subtitle-label text-white/40 tracking-[0.2em] relative z-10 mb-2">{title}</p>
      <div className="flex items-baseline space-x-3 relative z-10">
        {loading ? (
          <div className="h-10 w-32 bg-white/5 rounded animate-pulse" />
        ) : (
          <h3 className="text-5xl font-display font-extrabold text-white tracking-tight drop-shadow-sm">{value}</h3>
        )}
        {!loading && subtitle && (
          <span className={`${subtitleColor} text-xs font-bold uppercase tracking-wider opacity-80`}>{subtitle}</span>
        )}
      </div>

      {/* Optional Badges */}
      {badges && !loading && <div className="mt-4 relative z-10">{badges}</div>}

      {/* Optional Progress Bar */}
      {progressBar && !loading && (
        <div className="mt-6 flex items-center space-x-3 relative z-10">
          <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]"
              style={{ width: `${progressBar.value}%` }}
            ></div>
          </div>
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
            {progressBar.label}
          </span>
        </div>
      )}
    </div>
  );
}
