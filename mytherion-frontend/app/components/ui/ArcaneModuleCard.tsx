"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ArcaneModuleCardProps {
  title: string;
  description: string;
  icon: string;
  href?: string;
  badge?: string;
  isPrimary?: boolean;
  disabled?: boolean;
}

export default function ArcaneModuleCard({
  title,
  description,
  icon,
  href,
  badge,
  isPrimary = false,
  disabled = false
}: ArcaneModuleCardProps) {
  const CardContent = (
    <>
      <div className="flex justify-between items-start mb-8">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isPrimary 
            ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:scale-110" 
            : "bg-white/5 text-white/20"
        }`}>
          <span className="material-symbols-outlined text-[28px]">{icon}</span>
        </div>
        
        {badge && (
          <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.1em] ${
            isPrimary 
              ? "bg-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]" 
              : "bg-white/5 text-white/20 border border-white/10"
          }`}>
            {badge}
          </span>
        )}
      </div>
      
      <div className="mt-auto">
        <h4 className={`text-xl font-bold mb-2 transition-colors ${
          disabled ? "text-white/20" : "text-white group-hover:text-primary"
        }`}>
          {title}
        </h4>
        <p className={`text-xs leading-relaxed font-medium transition-colors ${
          disabled ? "text-white/10" : "text-white/30"
        }`}>
          {description}
        </p>
      </div>
    </>
  );

  const baseStyles = `glass-card p-8 rounded-[32px] transition-all duration-500 flex flex-col min-h-[280px] border-white/5 shadow-2xl relative overflow-hidden group ${
    isPrimary 
      ? "bg-[#1A1625]/80 border-primary/30 border-2 hover:border-primary/60 hover:bg-[#1A1625]" 
      : "bg-[#1A1625]/40 opacity-80"
  } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`;

  if (disabled || !href) {
    return (
      <div className={baseStyles}>
        {CardContent}
      </div>
    );
  }

  return (
    <Link href={href} className={baseStyles}>
      {/* Subtle hover light leak */}
      {isPrimary && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-primary/10 transition-all duration-700"></div>
      )}
      {CardContent}
    </Link>
  );
}
