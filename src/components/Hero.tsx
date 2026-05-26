import { motion } from "motion/react";
import { Play } from "lucide-react";
import { PhilosophySnippet, Project } from "../types";
import { translations } from "../translations";

interface HeroProps {
  onExploreWorks: () => void;
  philosophySnippet: PhilosophySnippet;
  language: "en" | "vi";
  projects: Project[];
  onSelectProject: (id: string) => void;
}

export default function Hero({ onExploreWorks, philosophySnippet, language, projects, onSelectProject }: HeroProps) {
  const t = translations[language];

  // Dynamic localized version of the central philosophy quote fallback
  const localizedQuote = language === "en" 
    ? philosophySnippet.quote 
    : "Biên tập không phải là dồn dập kỹ xảo. Nó là nghệ thuật điều tiết khoảng lặng để câu chuyện tự thân cất tiếng.";

  const localizedAuthor = language === "en" ? philosophySnippet.author : "Duygital";

  return (
    <section className="relative min-h-screen pt-36 pb-20 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-start overflow-hidden bg-bg w-full">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 cinematic-vignette z-10 pointer-events-none" />

      {/* TOP: Small intro tag */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex items-center gap-2 justify-center mb-6 z-20"
      >
        <span className="w-3 h-[1px] bg-brand" />
        <span className="font-mono text-[10px] tracking-[0.25em] text-brand uppercase font-bold">
          {t.hero.studio}
        </span>
        <span className="w-3 h-[1px] bg-brand" />
      </motion.div>

      {/* CENTER: Main typography statement with serif emotional contrast */}
      <div className="w-full max-w-4xl mx-auto z-20 text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          className="font-sans text-3xl md:text-6xl lg:text-[4.75rem] font-extrabold tracking-tight leading-[1.08] text-paper uppercase"
        >
          {language === "vi" ? (
            <>
              Biên tập hình ảnh <br />
              <span className="font-serif italic font-normal text-brand lowercase tracking-wide normal-case inline-block my-1 md:my-2">
                được dẫn dắt bởi sự thấu hiểu
              </span> <br />
              và nhịp điệu tự nhiên.
            </>
          ) : (
            <>
              Video editing <br />
              <span className="font-serif italic font-normal text-brand lowercase tracking-wide normal-case inline-block my-1 md:my-2">
                guided by deep understanding
              </span> <br />
              and natural organic rhythm.
            </>
          )}
        </motion.h1>
      </div>

      {/* BELOW: Main showcase visual (Clean, majestic frame with zero overdesigned fake telemetry) */}
      <div className="w-full max-w-4xl mx-auto z-20 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          className="relative aspect-video w-full border border-paper/10 bg-black/95 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.95)] group flex flex-col justify-center items-center"
        >
          {(() => {
            const featuredProject = projects.find((p) => p.featured);
            if (featuredProject) {
              return (
                <>
                  <img
                    src={featuredProject.thumbnail_url || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200"}
                    alt={featuredProject.title || "Featured framing"}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-35 grayscale group-hover:scale-[1.02] group-hover:opacity-45 transition-all duration-[1200ms] cursor-pointer"
                    onClick={() => onSelectProject(featuredProject.id)}
                  />

                  {/* Symmetrical Quote Overlay as Showcase details */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center px-8 md:px-16 text-center z-20 bg-bg/20">
                    <span className="text-[9px] bg-[#D9381E] text-white px-2.5 py-1 rounded font-black tracking-widest uppercase mb-4 animate-pulse">
                      {language === "vi" ? "TÁC PHẨM TIÊU BIỂU" : "FEATURED SPOTLIGHT"}
                    </span>

                    <h3 
                      className="font-sans text-xl md:text-3xl lg:text-4xl font-extrabold text-paper uppercase tracking-tight leading-tight max-w-2xl cursor-pointer hover:text-brand transition-colors duration-300"
                      onClick={() => onSelectProject(featuredProject.id)}
                    >
                      {featuredProject.title}
                    </h3>

                    <p className="font-mono text-[10px] text-brand tracking-[0.2em] uppercase mt-4 font-bold">
                      {featuredProject.category ? `${featuredProject.category.toUpperCase()} — ` : ""}{featuredProject.year || "2026"}
                    </p>

                    {featuredProject.role && (
                      <p className="text-xs text-paper/60 font-sans tracking-wide mt-1.5 font-light">
                        {featuredProject.role}
                      </p>
                    )}

                    <button
                      onClick={() => onSelectProject(featuredProject.id)}
                      className="mt-6 flex items-center gap-2 bg-[#D9381E] hover:bg-[#FF5A00] text-white px-5 py-2.5 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 rounded cursor-pointer border border-white/15 shadow-lg"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{language === "vi" ? "CHI TIẾT SÁNG TẠO" : "EXPLORE STUDY IN-DEPTH"}</span>
                    </button>
                  </div>
                </>
              );
            }

            return (
              <>
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200"
                  alt="Cinematic framing"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale group-hover:scale-[1.02] group-hover:opacity-20 transition-all duration-[1200ms]"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-center px-8 md:px-16 text-center z-20 bg-bg/15">
                  <p className="font-sans text-base md:text-xl lg:text-2xl text-paper/90 max-w-2xl leading-relaxed font-light font-serif italic">
                    &ldquo;{localizedQuote}&rdquo;
                  </p>
                  <p className="font-mono text-[9px] text-brand tracking-[0.25em] uppercase mt-5 font-bold">
                    — {localizedAuthor}
                  </p>
                </div>
              </>
            );
          })()}

          <div className="absolute inset-0 pointer-events-none" />
        </motion.div>
      </div>

      {/* MID-BOTTOM: CTA (Aligned centered under the content grid) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        className="z-20 mb-16"
      >
        <button
          onClick={onExploreWorks}
          className="group flex items-center justify-center gap-3 bg-brand text-paper hover:bg-brand/90 px-8 py-4 cursor-pointer text-xs font-mono tracking-widest transition-all duration-300 uppercase font-black shadow-lg"
          id="btn-hero-explore"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{t.hero.cta}</span>
        </button>
      </motion.div>

      {/* BOTTOM: Supporting philosophy blocks aligned consistently across columns */}
      <div className="w-full max-w-4xl mx-auto z-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-paper/15 pt-12 text-left">
        <div>
          <span className="font-mono text-xs text-brand tracking-[0.2em] block mb-3 font-bold uppercase">
            {t.hero.pacingTag}
          </span>
          <p className="text-sm font-normal text-paper/85 leading-relaxed font-sans">
            {t.hero.pacingDesc}
          </p>
        </div>
        <div>
          <span className="font-mono text-xs text-brand tracking-[0.2em] block mb-3 font-bold uppercase">
            {t.hero.soundTag}
          </span>
          <p className="text-sm font-normal text-paper/85 leading-relaxed font-sans">
            {t.hero.soundDesc}
          </p>
        </div>
        <div>
          <span className="font-mono text-xs text-motion tracking-[0.2em] block mb-3 font-bold uppercase">
            {t.hero.visionTag}
          </span>
          <p className="text-sm font-normal text-paper/85 leading-relaxed font-sans">
            {t.hero.visionDesc}
          </p>
        </div>
      </div>
    </section>
  );
}
