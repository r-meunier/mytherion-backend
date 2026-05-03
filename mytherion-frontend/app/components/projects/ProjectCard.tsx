"use client";

import { useState } from "react";
import { Project } from "@/app/services/projectService";
import Link from "next/link";
import { useIsMounted } from "@/app/hooks/useIsMounted";

interface ProjectCardProps {
  project: Project;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const isMounted = useIsMounted();

  const formatDate = (dateString: string) => {
    if (!isMounted) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Placeholder images based on project ID
  const getPlaceholderImage = (id: number) => {
    const images = [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCF1oUEVgWsE7erK_ShruATA4wV1-2bleXiAreToITou3C8wZLMBXu7YQ6Ff07csHL90tWQ5aYlGhGlLEeeFrdW_sYvYX3dMtFdsFfwTktUJhe4tCkRv_Qo7O0xk5tv5uhHwVRUOWXldYanoSn-LG5ikF0zjAoPGoqyIrawpqQg0xstt_qvyPuYUILeeWg5YS8mKRM50fTB5RsSabJUhZlplOPg9HgsUJ3dZzPGQ2aNN8XGhwI87gCyNenSzILQeS0EMMCNbc2ip6yn",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGwCD-6H2m3-0h8SfHigQrcJqVzvDuBZDezE0TvhYuYPl_AcveQQSspn8p0HwfK1FNNdqj1RnYMW0RcYYDKzN8brVvQeWFQGsTecUdRkY9LbrdfDl5tjMdrNhHlIucFmuasfgqHouNp399DCP8C6Gz6oArDgF4u9jI4tzHMxY8t48FgIwWMeCMYHEapdk3A2M1y8p0muFVKUQiNuJNtHetiwJ2hagI_pY0PbWMIE2apNminIKMTJQ8f2bwLTcMrE5H0JfNMeBA78EU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBH5ibpqCunIHb1VauBGb_FJlrq3B83OhHchAuPVLO-TkT5ANpGl8_GtcctUJpqIblxE7gLX6GGVhqmgruNEvY33gr2dWjwz-wfq3eys-yl0njlmalJ5AKoUGqlRf1Pd-GOlFynbRX5qWvq64BtjJor8ZFxk8ytrLMo7Cp6uDykEyQFe5tkzjcC2g45IL8caeP5eIRfRcEohtPDj1XAWxJMT_YEfhoXmioBIZdQiIlk_eIgS76QyV0suSRVIFTl4738131J4_0SnMzJ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCwEG8oCeMUKDVgdy2IsWwf9ZYN2uyQoEowHkmn7FKO5QF4SWvDJIdPSq7keiHQxc4Vn2o1DUBsxKfAaeP-F9WNXgHZrqUgXNpYA5qF2YNDMTKbH7WV4XeruwoNnL9MMbG07w8oGH0FHW3tDvp1_WO86Of0ztpgefQQkrmFtemTcv9XgejHSzJg4FZa2b-mkEYr3BrQXs6iemewW6P1WwvlmNWoRvmEocJdQyxtNwTWo3X06GH-9I17wqOWwpyJmBbM7vGfxfQ90JjU"
    ];
    return images[id % images.length];
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden group cursor-pointer flex flex-col relative h-[420px] shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] border border-white/5 bg-[#16111B]/40">
      {/* Click overlay */}
      <Link href={`/projects/${project.id}`} className="absolute inset-0 z-10" />

      {/* Hero Image Section */}
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={getPlaceholderImage(project.id)}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16111B] via-transparent to-transparent opacity-80" />
        
        {/* Genre Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-secondary border border-secondary/20 flex items-center gap-1.5 uppercase tracking-widest">
            <span className="material-symbols-outlined text-[12px]">star</span>
            {project.genre || "Primary"}
          </span>
        </div>
      </div>

      {/* Project Details Section (Matching Design Spatial Layout) */}
      <div className="p-7 flex-1 flex flex-col bg-white/[0.02]">
        {/* Title and Menu */}
        <div className="flex justify-between items-start mb-2.5">
          <h3 className="text-section-header font-bold text-[#E6E1E5] group-hover:text-primary transition-colors duration-300 truncate pr-4">
            {project.name}
          </h3>
          <button className="text-white/20 hover:text-white transition-colors relative z-20">
            <span className="material-symbols-outlined text-[20px]">more_vert</span>
          </button>
        </div>

        {/* Description */}
        <p className="text-white/40 text-body-sm leading-relaxed line-clamp-2 mb-6 font-medium">
          {project.description || "An infinite realm awaiting your narrative touch. Shape its destinies and record its histories."}
        </p>

        {/* Metadata Footer */}
        <div className="mt-auto space-y-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[11px] font-bold text-white/30 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] opacity-40">database</span>
              <span>1,420 Entities</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-white/30 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] opacity-40">schedule</span>
              <span>{formatDate(project.updatedAt)}</span>
            </div>
          </div>
          
          {/* Progress Indication */}
          <div className="relative pt-1">
            <div className="overflow-hidden h-[3px] flex rounded-full bg-white/5">
              <div 
                style={{ width: `${(project.id * 15 % 70) + 25}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary/60"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
