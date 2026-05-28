import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Clock, ArrowLeft, Disc, Laptop, Tag, User, Layers, Calendar, ChevronRight } from "lucide-react";
import { Project } from "../types";
import { translations } from "../translations";
import UnifiedVideoPlayer from "./media/UnifiedVideoPlayer";
import VideoThumbnail from "./media/VideoThumbnail";

// Helper to extract YouTube ID (robustly handles standard, shorts, embed, and 11-char strings)
function getYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const str = String(url).trim();
  
  // 1. Check shorts format explicitly
  const shortsMatch = str.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) {
    return shortsMatch[1];
  }

  // 2. Standard YouTube matching patterns
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = str.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }

  // 3. Fallback to raw 11-char ID check
  if (str.length === 11 && !str.includes("/") && !str.includes(".")) {
    return str;
  }
  return null;
}

// Helper to extract Vimeo ID
function getVimeoId(url: string | null | undefined): string | null {
  if (!url) return null;
  const str = String(url).trim();
  const match = str.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

// Helper to parse timestamp (e.g. 0:12 or 1:24 or 0:02) to total seconds
function parseTimeToSeconds(timeStr: string | null | undefined): number {
  if (!timeStr) return 0;
  const parts = String(timeStr).trim().split(":").map(Number);
  if (parts.length === 2) {
    if (isNaN(parts[0]) || isNaN(parts[1])) return 0;
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    if (isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) return 0;
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  const parsed = parseInt(timeStr, 10);
  return isNaN(parsed) ? 0 : parsed;
}

// Generate the high-fidelity video player embed URL incorporating seek coordinates from Google Sheets
function getEmbedUrl(project: Project): string {
  const ytId = getYouTubeId(project.youtube_url || "");
  const vimeoId = getVimeoId(project.vimeo_url || "");
  const seconds = parseTimeToSeconds(project.thumbnail_time);

  if (ytId) {
    let url = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=0&rel=0&modestbranding=1&controls=1&showinfo=0`;
    if (seconds > 0) {
      url += `&start=${seconds}`;
    }
    return url;
  } else if (vimeoId) {
    let url = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=0&byline=0&title=0&portrait=0`;
    if (seconds > 0) {
      url += `#t=${seconds}s`;
    }
    return url;
  }
  return "";
}

// Strictly Static, High-Contrast Cinematic card thumbnail preview
function EditorialThumbnail({ project }: { project: Project }) {
  return (
    <VideoThumbnail
      project={project}
      className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:scale-[1.03] group-hover:opacity-100 transition-all duration-700 select-none pointer-events-none"
    />
  );
}

interface ShortFormModalProps {
  project: Project;
  onClose: () => void;
  language: "en" | "vi";
}

function ShortFormModal({ project, onClose, language }: ShortFormModalProps) {
  const embedUrl = getEmbedUrl(project);
  const isVi = language === "vi";

  return (
    <div className="fixed inset-0 bg-[#07010C]/95 backdrop-blur-md z-[100] flex items-center justify-center overflow-hidden animate-fade-in">
      {/* Background click to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Cinematic Modal Container (Responsive: Centered card on desktop, full-viewport screen on mobile) */}
      <div className="relative w-full h-full md:h-[90vh] md:max-h-[820px] md:aspect-[9/16] bg-black md:rounded-xl md:border md:border-white/10 md:shadow-[0_24px_80px_rgba(0,0,0,0.9)] overflow-hidden z-20 flex flex-col justify-center">
        
        {/* Header/Close bar - completely clean and minimal */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-3">
          {/* Label indicating total format duration */}
          <span className="hidden md:inline bg-black/85 px-3 py-1.5 border border-white/15 rounded-none text-[10px] font-mono uppercase tracking-[0.24em] text-[#F5F5F0]/60">
            {isVi ? `ĐẠO DIỄN SẢN XUẤT | TCR ${project.thumbnail_time || "00:00"}` : `9:16 VERTICAL | TCR ${project.thumbnail_time || "00:00"}`}
          </span>
          <button
            onClick={onClose}
            className="bg-black/95 hover:bg-[#D9381E] text-white w-9 h-9 rounded-none flex items-center justify-center transition-all duration-300 cursor-pointer border border-white/15 shadow-lg hover:border-[#D9381E]"
            title={isVi ? "Đóng phát" : "Close player"}
            id="btn-close-short-modal"
          >
            <span className="font-mono text-sm leading-none">×</span>
          </button>
        </div>

        {/* Video Frame configured to maintain proper aspect ratio */}
        <div className="w-full h-full relative aspect-[9/16] bg-black">
          <UnifiedVideoPlayer
            project={project}
            autoplay={true}
            className="absolute inset-0 w-full h-full border-0 z-10"
          />
        </div>

        {/* Minimal Title Bar overlay at bottom under video (YouTube Shorts style but cleaner) */}
        <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none text-left bg-black/85 p-5 rounded-none border border-white/10">
          <span className="text-[9px] bg-[#D9381E] text-white px-2.5 py-1 rounded-none font-black tracking-widest uppercase mb-2 inline-block">
            {project.category.toUpperCase()}
          </span>
          <h3 className="text-[#F5F5F0] font-serif text-lg leading-tight uppercase tracking-normal font-light italic">
            {project.title}
          </h3>
          <p className="text-[#F5F5F0]/70 text-[10px] mt-2 font-mono tracking-[0.2em] uppercase">
            {project.year} — {project.role}
          </p>
        </div>
      </div>
    </div>
  );
}

interface WorksProps {
  projects: Project[];
  language: "en" | "vi";
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
}

export default function Works({ projects, language, selectedProjectId, setSelectedProjectId }: WorksProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const t = translations[language];

  // Auto-scroll to top when selected project changes (for immersion)
  useEffect(() => {
    if (selectedProjectId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProjectId]);

  // Generate unique categories dynamically from the project category column
  const categories = ["ALL", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];

  const activeProject = projects.find((p) => p.id === selectedProjectId);

  // Filter projects by dynamic category selection
  const filteredProjects = selectedCategory === "ALL"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  // Detail Page Render View (for standard landscape & unified vertical videos)
  if (selectedProjectId && activeProject) {
    const isVi = language === "vi";

    return (
      <div className="relative min-h-screen py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto z-20 animate-fade-in font-sans text-left">
        
        {/* Back navigation button - bold crimson high contrast */}
        <button
          onClick={() => setSelectedProjectId(null)}
          className="group inline-flex items-center gap-3 text-[10px] font-mono tracking-[0.24em] text-[#D9381E] hover:text-[#FF5A00] transition-colors duration-300 uppercase font-black mb-10 cursor-pointer bg-paper/[0.02] border border-white/15 hover:border-[#D9381E]/30 px-5 py-3 rounded-none shadow-lg"
          id="btn-back-to-archives"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{isVi ? "QUAY LẠI LƯU TRỮ TÁC PHẨM" : "BACK TO PROJECT INDEX"}</span>
        </button>

        {/* 01. Project title & subheader */}
        <div className="mb-10 text-left border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-none bg-[#D9381E]" />
            <span className="font-mono text-[10px] text-[#D9381E] tracking-[0.24em] uppercase font-black">
              {isVi ? "CHUYÊN ĐỀ HỒ SƠ TÁC PHẨM CHI TIẾT" : "PROJECT ANALYTICAL STUDY"}
            </span>
          </div>
          
          <h1 className="font-serif text-3xl md:text-5xl font-light italic text-[#F5F5F0] uppercase leading-tight tracking-normal mb-4">
            {activeProject.title}
          </h1>
          
          {(isVi ? activeProject.short_desc_vi : activeProject.short_desc_en) && (
            <p className="font-sans text-base text-[#F5F5F0]/80 font-light leading-relaxed mt-4 max-w-4xl">
              {isVi ? activeProject.short_desc_vi : activeProject.short_desc_en}
            </p>
          )}
        </div>

        {/* 02. Embed Player Surround */}
        <div className="relative aspect-video w-full bg-black rounded-none border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.9)] mb-14 overflow-hidden">
          <UnifiedVideoPlayer
            project={activeProject}
            autoplay={true}
            className="absolute inset-0 w-full h-full border-0 z-10"
          />
        </div>

        {/* 03. Curated Case Study Modules (Project Context, Creative Goal, Editing Focus, Deliverables) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-left items-start">
          
          {/* Main Case Study Columns */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Project Context */}
            {activeProject.project_context && (
              <div className="bg-paper/[0.015] border border-white/10 p-8 md:p-10 rounded-none shadow-md hover:border-[#D9381E]/20 transition-all duration-300">
                <h3 className="font-mono text-[10px] text-[#D9381E] tracking-[0.24em] uppercase font-black mb-5 border-b border-white/10 pb-3 flex items-center gap-2">
                  <span className="text-[#F5F5F0]/30 font-mono text-xs font-bold">01 /</span>
                  {isVi ? "BỐI CẢNH DỰ ÁN" : "PROJECT CONTEXT"}
                </h3>
                <p className="font-sans text-[#F5F5F0]/80 leading-relaxed font-light text-base">
                  {activeProject.project_context}
                </p>
              </div>
            )}

            {/* Creative Goal */}
            {activeProject.creative_goal && (
              <div className="bg-paper/[0.015] border border-white/10 p-8 md:p-10 rounded-none shadow-md hover:border-[#D9381E]/20 transition-all duration-300">
                <h3 className="font-mono text-[10px] text-[#D9381E] tracking-[0.24em] uppercase font-black mb-5 border-b border-white/10 pb-3 flex items-center gap-2">
                  <span className="text-[#F5F5F0]/30 font-mono text-xs font-bold">02 /</span>
                  {isVi ? "MỤC TIÊU NGHỆ THUẬT & SÁNG TẠO" : "CREATIVE & ARTISTIC GOAL"}
                </h3>
                <p className="font-sans text-[#F5F5F0]/80 leading-relaxed font-light text-base">
                  {activeProject.creative_goal}
                </p>
              </div>
            )}

            {/* Editing Focus */}
            {activeProject.editing_focus && (
              <div className="bg-paper/[0.015] border border-white/10 p-8 md:p-10 rounded-none shadow-md hover:border-[#D9381E]/20 transition-all duration-300">
                <h3 className="font-mono text-[10px] text-[#D9381E] tracking-[0.24em] uppercase font-black mb-5 border-b border-white/10 pb-3 flex items-center gap-2">
                  <span className="text-[#F5F5F0]/30 font-mono text-xs font-bold">03 /</span>
                  {isVi ? "TRỌNG TÂM BIÊN TẬP & TIẾT CHẾ PACING" : "EDITING & PACING FOCUS"}
                </h3>
                <p className="font-sans text-[#F5F5F0]/80 leading-relaxed font-light text-base">
                  {activeProject.editing_focus}
                </p>
              </div>
            )}

            {/* Deliverables */}
            {activeProject.deliverables && (
              <div className="bg-paper/[0.015] border border-white/10 p-8 md:p-10 rounded-none shadow-md hover:border-[#D9381E]/20 transition-all duration-300">
                <h3 className="font-mono text-[10px] text-[#D9381E] tracking-[0.24em] uppercase font-black mb-5 border-b border-white/10 pb-3 flex items-center gap-2">
                  <span className="text-[#F5F5F0]/30 font-mono text-xs font-bold">04 /</span>
                  {isVi ? "SẢN PHẨM BÀN GIAO MASTER" : "DELIVERABLES"}
                </h3>
                <p className="font-sans text-[#F5F5F0]/80 leading-relaxed font-light text-base">
                  {activeProject.deliverables}
                </p>
              </div>
            )}

            {/* Emotional Focus (Cảm quan chủ đạo) - Moved to main column for beautiful spacing */}
            {activeProject.focus && (
              <div className="bg-paper/[0.015] border border-white/10 p-8 md:p-10 rounded-none shadow-md hover:border-[#D9381E]/20 transition-all duration-300">
                <h3 className="font-mono text-[10px] text-[#D9381E] tracking-[0.24em] uppercase font-black mb-5 border-b border-white/10 pb-3 flex items-center gap-2">
                  <span className="text-[#F5F5F0]/30 font-mono text-xs font-bold">05 /</span>
                  {isVi ? "CẢM QUAN CHỦ ĐẠO" : "EMOTIONAL FOCUS"}
                </h3>
                <p className="font-sans text-[#F5F5F0]/80 leading-relaxed font-light text-base">
                  {activeProject.focus}
                </p>
              </div>
            )}

          </div>

          {/* Sidebar: Technical Workflow */}
          <div className="space-y-8 col-span-1">
            
            {/* Technical Workflow Block */}
            {(activeProject.year || activeProject.client || activeProject.runtime || activeProject.aspect_ratio || activeProject.color_pipeline || activeProject.role || activeProject.platform || activeProject.credits) && (
              <div className="bg-[#150A21] border border-[#D9381E]/30 p-8 rounded-none shadow-xl">
                <h3 className="font-mono text-[10px] text-[#D9381E] tracking-[0.24em] uppercase font-black border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
                  <span className="text-[#F5F5F0]/30 font-mono text-xs font-bold">06 /</span>
                  {isVi ? "QUY TRÌNH KỸ THUẬT" : "TECHNICAL WORKFLOW"}
                </h3>

                <div className="space-y-5 font-sans text-base">
                  
                  {/* Year */}
                  {activeProject.year && (
                    <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                      <span className="text-[10px] text-[#F5F5F0]/50 font-mono uppercase tracking-[0.2em]">
                        {isVi ? "NĂM SẢN XUẤT" : "RELEASE YEAR"}
                      </span>
                      <span className="text-[#F5F5F0] font-light">{activeProject.year}</span>
                    </div>
                  )}

                  {/* Main Client */}
                  {activeProject.client && (
                    <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                      <span className="text-[10px] text-[#F5F5F0]/50 font-mono uppercase tracking-[0.2em]">
                        {isVi ? "ĐỐI TÁC / KHÁCH HÀNG" : "CLIENT / PARTNER"}
                      </span>
                      <span className="text-[#F5F5F0] font-light">{activeProject.client}</span>
                    </div>
                  )}

                  {/* Runtime */}
                  {activeProject.runtime && (
                    <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                      <span className="text-[10px] text-[#F5F5F0]/50 font-mono uppercase tracking-[0.2em]">
                        {isVi ? "THỜI LƯỢNG RENDER" : "TOTAL RUNTIME"}
                      </span>
                      <span className="text-[#FF5A00] font-light flex items-center gap-1.5 font-mono">
                        <Clock className="w-4 h-4 text-[#D9381E]" /> {activeProject.runtime}
                      </span>
                    </div>
                  )}

                  {/* Aspect Ratio */}
                  {activeProject.aspect_ratio && (
                    <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                      <span className="text-[10px] text-[#F5F5F0]/50 font-mono uppercase tracking-[0.2em]">
                        {isVi ? "TỶ LỆ KHUNG HÌNH" : "ASPECT RATIO"}
                      </span>
                      <span className="text-[#F5F5F0] font-light font-mono">{activeProject.aspect_ratio}</span>
                    </div>
                  )}

                  {/* Color Pipeline */}
                  {activeProject.color_pipeline && (
                    <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                      <span className="text-[10px] text-[#F5F5F0]/50 font-mono uppercase tracking-[0.2em]">
                        {isVi ? "TIÊU CHUẨN MÀU SẮC" : "COLOR PIPELINE"}
                      </span>
                      <span className="text-[#F5F5F0] font-light text-sm font-mono">{activeProject.color_pipeline}</span>
                    </div>
                  )}

                  {/* Role / Credit */}
                  {activeProject.role && (
                    <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                      <span className="text-[10px] text-[#F5F5F0]/50 font-mono uppercase tracking-[0.2em]">
                        {isVi ? "VAI TRÒ KHÁI QUÁT" : "COMPLETED ASSIGNMENTS"}
                      </span>
                      <span className="text-[#D9381E] font-semibold">{activeProject.role}</span>
                    </div>
                  )}

                  {/* Platform */}
                  {activeProject.platform && (
                    <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                      <span className="text-[10px] text-[#F5F5F0]/50 font-mono uppercase tracking-[0.2em]">
                        {isVi ? "NỀN TẢNG KIỂM TRA" : "PREVIEW PLATFORM"}
                      </span>
                      <span className="text-[#F5F5F0] font-light">{activeProject.platform}</span>
                    </div>
                  )}

                  {/* Credits */}
                  {activeProject.credits && (
                    <div className="flex flex-col gap-1.5 pt-1">
                      <span className="text-[10px] text-[#F5F5F0]/50 font-mono uppercase tracking-[0.2em]">
                        {isVi ? "BẢN QUYỀN SẢN XUẤT" : "PRODUCTION CREDITS"}
                      </span>
                      <p className="text-xs text-[#F5F5F0]/80 leading-relaxed font-mono whitespace-pre-line bg-[#0E0415] border border-white/5 p-3 rounded-none">
                        {activeProject.credits}
                      </p>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* Human Editorial Note (Quotations emphasize only, serif) */}
            <div className="bg-paper/[0.015] border border-white/10 p-8 rounded-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D9381E]/5 rounded-full blur-2xl pointer-events-none" />
              <h3 className="font-mono text-[10px] text-[#D9381E] tracking-[0.24em] uppercase font-black mb-3 pb-2 flex items-center gap-2 border-b border-white/5">
                <span className="text-[#F5F5F0]/30 font-mono text-xs font-bold">—</span>
                {isVi ? "BẢN CHẤT CỦA CẮT CẢNH" : "THE PHILOSOPHY"}
              </h3>
              <p className="font-serif italic text-lg md:text-xl text-[#F5F5F0]/90 leading-relaxed font-light">
                {isVi
                  ? `“Biên tập không phải là dồn dập kỹ xảo hay tốc ramping điên cuồng. Nó là nghệ thuật điều tiết khoảng lặng để câu chuyện tự thân tìm thấy hơi thở riêng biệt của nó.”`
                  : `“Editing is not about aggressive technical ramping. It is the careful regulation of silence so the stories can find their own organic breath.”`}
              </p>
            </div>

          </div>

        </div>

        {/* Dynamic Navigation Row */}
        <div className="mt-16 pt-8 border-t border-white/10 text-left">
          <button
            onClick={() => setSelectedProjectId(null)}
            className="group inline-flex items-center gap-3 text-[10px] font-mono tracking-[0.24em] text-[#D9381E] hover:text-[#FF5A00] transition-colors duration-300 uppercase font-black cursor-pointer bg-paper/[0.02] border border-white/15 hover:border-[#D9381E]/30 px-5 py-3 rounded-none shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{isVi ? "QUAY LẠI DANH MỤC" : "BACK TO PORTFOLIO LIBRARY"}</span>
          </button>
        </div>

      </div>
    );
  }

  // --- MAIN PORTFOLIO ARCHIVE RE-DESIGNED ---
  const localizedAll = language === "vi" ? "TẤT CẢ" : "ALL";

  return (
    <section className="relative min-h-screen py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto z-20 font-sans text-left">
      
      {/* Dynamic Header Block with Subtitles */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 mb-12 gap-6">
        <div>
          <span className="font-mono text-xs text-[#D9381E] tracking-[0.24em] block mb-2 font-black uppercase">
            CHAPTER II
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light italic text-[#F5F5F0] uppercase leading-tight tracking-normal">
            {t.works.title}
          </h2>
        </div>
        <div className="text-left md:text-right max-w-lg mt-2 md:mt-0">
          <span className="block font-mono uppercase text-[10px] tracking-[0.24em] text-[#F5F5F0]/50 mb-2 font-black">
            {language === 'vi' ? "DANH MỤC LƯU TRỮ CHỦ ĐỀ & PHÂN TÍCH TỶ LỆ" : "ADDITIONAL ESSAYS, FASHION REELS & SPATIAL STUDIES"}
          </span>
        </div>
      </div>

      <div className="mb-12 max-w-3xl">
        <p className="text-base font-sans text-[#F5F5F0]/80 leading-relaxed font-light">
          {t.works.desc}
        </p>
      </div>

      {/* 1. Dynamic Category Filter System - 0 hardcoded categories */}
      <div className="flex flex-wrap items-center justify-start gap-2.5 mb-14 border-b border-white/5 pb-8">
        <span className="text-[10px] text-[#F5F5F0]/50 font-mono tracking-[0.2em] uppercase mr-3">
          {language === "vi" ? "LỌC THEO THỂ LOẠI:" : "FILTER CATEGORY:"}
        </span>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const displayLabel = cat === "ALL" ? localizedAll : cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 border font-mono text-[10px] tracking-[0.16em] uppercase font-black transition-all duration-300 rounded-none cursor-pointer ${
                isSelected
                  ? "bg-[#D9381E] text-white border-[#D9381E] shadow-sm"
                  : "bg-paper/[0.02] text-[#F5F5F0]/70 border-white/15 hover:border-white/30 hover:text-white"
              }`}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>

      {/* 2. Structured & Clean Editorial Cards Architecture */}
      {filteredProjects.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-white/15 rounded-none">
          <p className="text-sm text-[#F5F5F0]/50 font-mono uppercase tracking-[0.2em]">
            {language === "vi" ? "Không tìm thấy tác phẩm nào thuộc nhóm này." : "No projects found under this classification."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((project) => {
            // Support 'timestamp' overlay indicator beautifully on thumbnail
            const isTimestampMode = project.thumbnail_mode === "timestamp";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onClick={() => setSelectedProjectId(project.id)}
                className="bg-paper/[0.015] border border-white/15 rounded-none overflow-hidden group hover:border-[#D9381E]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl"
                id={`project-card-${project.id}`}
              >
                {/* Image and Timecode container (Refactored Cinematic Dynamic System with no divider line) */}
                <div className="relative aspect-video w-full bg-black overflow-hidden">
                  <EditorialThumbnail project={project} />
                  
                  {/* Category Stamp on top left */}
                  <div className="absolute top-4 left-4 z-20 bg-black/90 px-3 py-1 border border-white/15 rounded-none text-[10px] font-mono tracking-[0.15em] font-semibold text-[#F5F5F0]">
                    {project.category.toUpperCase()}
                  </div>

                  {/* Timestamp Mode Indicator or general Runtime Display */}
                  {isTimestampMode && project.thumbnail_time ? (
                    <div className="absolute top-4 right-4 z-20 bg-zinc-950 border border-[#D9381E]/40 px-3 py-1 rounded-none text-[10px] font-mono font-black text-[#FF5A00] tracking-widest uppercase">
                      TCR {project.thumbnail_time}
                    </div>
                  ) : null}

                  {/* General Runtime label footer */}
                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-black/90 px-3 py-1 border border-white/15 rounded-none text-[10px] font-mono font-black text-[#F5F5F0]">
                    <Clock className="w-3.5 h-3.5 text-[#D9381E]" />
                    <span>{project.runtime || "00:00"}</span>
                  </div>
                </div>

                {/* Content Box with solid high contrast layout and perfectly uniform margins */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div className="text-left">
                    {/* Role & Year Header formatted like archival catalog data */}
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F5F5F0]/45 font-medium border-l border-[#D9381E] pl-2">
                        {project.year}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D9381E] font-black">
                        {project.role}
                      </span>
                    </div>
                    
                    {/* Cinematic Serif Title - Italicized and unhurried */}
                    <h3 className="font-serif text-2xl font-light italic text-[#F5F5F0] group-hover:text-[#D9381E] transition-colors duration-300 uppercase leading-snug tracking-normal mt-8 mb-0">
                      {project.title}
                    </h3>
                    
                    {/* Generous body text readability and space (Editorial Narrative styling) with matching Mt-8 margin */}
                    <p className="text-sm md:text-base font-sans text-[#F5F5F0]/75 leading-relaxed font-light mt-8">
                      {project.short_desc}
                    </p>
                  </div>

                  {/* Card bottom details with matching uniform margin */}
                  <div className="mt-8 flex flex-col gap-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono bg-white/[0.02] border border-white/15 text-[#F5F5F0]/70 px-2.5 py-1 rounded-none font-medium uppercase tracking-wider transition-colors hover:bg-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between group-hover:text-[#FF5A00] transition-colors duration-300">
                      <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#D9381E] font-black group-hover:text-[#FF5A00] transition-colors duration-300">
                        {language === "vi" ? "XEM CHI TIẾT HỒ SƠ TÁC PHẨM" : "EXPLORE STUDY IN-DEPTH"}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#D9381E] group-hover:text-[#FF5A00] transform group-hover:translate-x-1.5 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      )}

    </section>
  );
}
