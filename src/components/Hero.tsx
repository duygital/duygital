import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PhilosophySnippet, Project, HeroContent } from "../types";
import AmbientPlayer from "./media/AmbientPlayer";

interface HeroProps {
  onExploreWorks: () => void;
  philosophySnippet: PhilosophySnippet;
  language: "en" | "vi";
  projects: Project[];
  onSelectProject: (id: string) => void;
  heroContent?: HeroContent | null;
}

const FALLBACK_HERO_CONTENT: Record<string, Record<"vi" | "en", string>> = {
  hero_badge: {
    vi: "XƯỞNG BIÊN TẬP DUYGITAL",
    en: "DUYGITAL EDITING STUDIO",
  },
  hero_heading_line1: {
    vi: "Biên tập hình ảnh",
    en: "Video editing",
  },
  hero_heading_line2: {
    vi: "được dẫn dắt bởi sự thấu hiểu",
    en: "guided by deep understanding",
  },
  hero_heading_line3: {
    vi: "và nhịp điệu tự nhiên.",
    en: "and natural organic rhythm.",
  },
  hero_label: {
    vi: "TÁC PHẨM TIÊU BIỂU",
    en: "FEATURED SPOTLIGHT",
  },
  hero_quote: {
    vi: "Biên tập không phải là dồn dập kỹ xảo. Nó là nghệ thuật điều tiết khoảng lặng để câu chuyện tự thân cất tiếng.",
    en: "Editing is not about piling up visual tricks; it is the art of modulating silences, letting the narrative breathe and find its own natural rhythm.",
  },
  hero_quote_author: {
    vi: "Duygital",
    en: "Duygital",
  },
  hero_cta: {
    vi: "TIẾN VÀO THƯ VIỆN TÁC PHẨM",
    en: "ENTER THE SELECTED ARCHIVE",
  },
  hero_principle_1_title: {
    vi: "01 / NHỊP ĐIỆU DÒNG THỜI GIAN",
    en: "01 / TEMPORAL COLLAGE",
  },
  hero_principle_1_desc: {
    vi: "Mỗi nhịp cắt là một nhịp thở chuyển tiếp. Sự nôn nóng trong biên tập thường tước đi cơ hội để người xem thấu cảm trọn vẹn diễn biến bản chất và thông điệp sâu xa.",
    en: "Each edit operates as a respiratory transition. Excessive rush within post-production sweeps strips away opportunities to completely fathom contextual values.",
  },
  hero_principle_2_title: {
    vi: "02 / THIẾT KẾ ÂM THANH",
    en: "02 / SONIC SCROLL",
  },
  hero_principle_2_desc: {
    vi: "Chúng tôi phác thảo không gian âm thanh trước khi khóa các khung hình cuối cùng. Tiếng động môi trường và âm nền tĩnh tạo nên hồn cốt trước cả khi những diễn biến thị giác bắt đầu.",
    en: "We blueprint acoustic spheres before processing final visual frames. Passive ambient textures and atmospheric noise construct structural gravity.",
  },
  hero_principle_3_title: {
    vi: "03 / TẦM NHÌN BIÊN TẬP",
    en: "03 / CRAFT FOCUS",
  },
  hero_principle_3_desc: {
    vi: "Sự tiết chế tối đa nhằm tôn vinh sự mạch lạc, tập trung cao độ và sức nặng chân thực ẩn sâu trong tài liệu của bạn.",
    en: "Maximum subtractive discipline designed to leverage pristine narrative layout and organic visual elements. Keeping frame delivery highly curated.",
  }
};

export default function Hero({
  onExploreWorks,
  philosophySnippet,
  language,
  projects,
  onSelectProject,
  heroContent,
}: HeroProps) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);

  const t = (key: string): string => {
    if (heroContent && heroContent[key]) {
      const val = heroContent[key][language];
      if (val) return val;
    }
    return FALLBACK_HERO_CONTENT[key]?.[language] || "";
  };

  const localizedQuote = t("hero_quote") || (language === "en" 
    ? philosophySnippet.quote 
    : "Biên tập không phải là dồn dập kỹ xảo. Nó là nghệ thuật điều tiết khoảng lặng để câu chuyện tự thân cất tiếng.");

  const localizedAuthor = t("hero_quote_author") || (language === "en" ? philosophySnippet.author : "Duygital");

  const featuredProject = projects.find((p) => p.featured);

  // Custom Cursor event listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovering]);

  const handleMouseEnter = (text: string) => {
    // Only enable custom floating cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setHoverText(text);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div ref={heroRef} className="relative w-full">
      {/* Absolute Dynamic Custom Pointer Layer following standard Brutal calm styles */}
      <AnimatePresence>
        {isHovering && hoverText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="fixed pointer-events-none z-[9999] px-4 py-2 bg-text border border-bg text-bg rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.6)] font-mono text-[10px] tracking-[0.25em] font-black uppercase text-center flex items-center justify-center whitespace-nowrap"
            style={{
              left: cursorPos.x + 15,
              top: cursorPos.y + 15,
            }}
          >
            {hoverText}
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative min-h-screen pt-40 pb-28 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-start overflow-hidden bg-bg w-full">
        {/* Background Atmosphere Vignette */}
        <div className="absolute inset-0 cinematic-vignette z-10 pointer-events-none" />

        {/* TOP: Small intro tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center gap-3 justify-center mb-10 z-20"
        >
          <span className="w-4 h-[1px] bg-brand" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-brand uppercase font-black">
            {t("hero_badge")}
          </span>
          <span className="w-4 h-[1px] bg-brand" />
        </motion.div>

        {/* CENTER: Massive Typography with Elegant Serifs and Large Spacing */}
        <div 
          className="w-full max-w-4xl mx-auto z-20 text-center mb-20 cursor-pointer group"
          onClick={onExploreWorks}
          onMouseEnter={() => handleMouseEnter(language === "vi" ? "[ XEM DỰ ÁN ]" : "[ VIEW ARCHIVE ]")}
          onMouseLeave={handleMouseLeave}
        >
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 }}
            className="font-sans text-3xl md:text-6xl lg:text-[5rem] font-extrabold tracking-widest leading-[1.12] text-paper uppercase transition-all duration-[600ms] group-hover:text-brand"
          >
            {t("hero_heading_line1")} <br />
            <span className="font-serif italic font-normal text-brand lowercase tracking-wide normal-case inline-block my-2 md:my-4 transition-transform duration-[600ms] group-hover:scale-[1.01]">
              {t("hero_heading_line2")}
            </span> <br />
            {t("hero_heading_line3")}
          </motion.h1>
        </div>

        {/* BELOW: Cinematic Video/Image Featured Spotlight Grid */}
        <div className="w-full max-w-4xl mx-auto z-20 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
            className="relative aspect-video w-full border border-paper/10 bg-black/98 overflow-hidden shadow-[0_45px_95px_rgba(0,0,0,0.98)] group flex flex-col justify-center items-center cursor-pointer"
            onClick={() => {
              if (featuredProject) {
                onSelectProject(featuredProject.id);
              } else {
                onExploreWorks();
              }
            }}
            onMouseEnter={() => handleMouseEnter(language === "vi" ? "[ TIẾN VÀO ]" : "[ ENTER WORK ]")}
            onMouseLeave={handleMouseLeave}
          >
            {featuredProject ? (
              <>
                {/* Embedded dynamic looping background video texture with zero YouTube branding shown */}
                <AmbientPlayer project={featuredProject} />

                {/* Symmetrical Quote Overlay as Showcase details */}
                <div className="absolute inset-0 flex flex-col justify-center items-center px-8 md:px-16 text-center z-20 bg-bg/5 transition-colors duration-700 group-hover:bg-bg/20">
                  <span className="text-[9px] bg-[#D9381E] text-white px-3 py-1 font-black tracking-[0.25em] uppercase mb-6 animate-pulse">
                    {t("hero_label")}
                  </span>

                  <h3 className="font-sans text-xl md:text-3xl lg:text-4xl font-black text-paper uppercase tracking-wider leading-tight max-w-2xl transition-all duration-500 group-hover:text-brand">
                    {featuredProject.title}
                  </h3>

                  <p className="font-mono text-[9px] text-brand tracking-[0.25em] uppercase mt-5 font-black">
                    {featuredProject.category ? `${featuredProject.category.toUpperCase()} — ` : ""}{featuredProject.year || "2026"}
                  </p>

                  {featuredProject.role && (
                    <p className="text-xs text-paper/60 font-sans tracking-widest mt-2 font-medium">
                      {featuredProject.role}
                    </p>
                  )}

                  {/* Clean Text-Only subtle indicator link instead of a chunky button */}
                  <div className="mt-8 text-paper/90 font-mono text-[10px] tracking-[0.3em] uppercase transition-all duration-300 group-hover:text-brand flex items-center gap-2">
                    <span>{language === "vi" ? "CHI TIẾT Ý TƯỞNG ↗" : "EXPLORE STUDY IN-DEPTH ↗"}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Static elegant layout backfill */}
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200"
                  alt="Cinematic framing"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale scale-100 group-hover:scale-105 transition-all duration-[2000ms]"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-center px-8 md:px-16 text-center z-20 bg-bg/10">
                  <p className="font-sans text-base md:text-xl lg:text-2xl text-paper/85 max-w-2xl leading-relaxed font-serif italic">
                    &ldquo;{localizedQuote}&rdquo;
                  </p>
                  <p className="font-mono text-[9px] text-brand tracking-[0.25em] uppercase mt-6 font-bold">
                    — {localizedAuthor}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* MID-BOTTOM: Spacious Pure CSS/Text Link acting as CTA with ZERO Bulky Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
          className="z-20 mb-24 text-center"
        >
          <div
            onClick={onExploreWorks}
            onMouseEnter={() => handleMouseEnter(language === "vi" ? "[ KHÁM PHÁ ]" : "[ DISCOVER ]")}
            onMouseLeave={handleMouseLeave}
            className="inline-block py-12 px-6 cursor-pointer group"
          >
            <span className="text-paper/80 font-mono text-xs tracking-[0.4em] uppercase font-bold transition-all duration-[550ms] border-b border-paper/10 pb-2 group-hover:text-brand group-hover:border-brand/40 group-hover:tracking-[0.45em]">
              {t("hero_cta")} →
            </span>
          </div>
        </motion.div>

        {/* BOTTOM: Massive vertical spacing and supporting philosophy grids */}
        <div className="w-full max-w-4xl mx-auto z-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 border-t border-paper/10 pt-16 text-left">
          <div className="space-y-4">
            <span className="font-mono text-[11px] text-brand tracking-[0.25em] block font-black uppercase">
              {t("hero_principle_1_title")}
            </span>
            <p className="text-sm font-normal text-paper/75 leading-relaxed font-sans mt-2">
              {t("hero_principle_1_desc")}
            </p>
          </div>
          <div className="space-y-4">
            <span className="font-mono text-[11px] text-brand tracking-[0.25em] block font-black uppercase">
              {t("hero_principle_2_title")}
            </span>
            <p className="text-sm font-normal text-paper/75 leading-relaxed font-sans mt-2">
              {t("hero_principle_2_desc")}
            </p>
          </div>
          <div className="space-y-4">
            <span className="font-mono text-[11px] text-motion tracking-[0.25em] block font-black uppercase">
              {t("hero_principle_3_title")}
            </span>
            <p className="text-sm font-normal text-paper/75 leading-relaxed font-sans mt-2">
              {t("hero_principle_3_desc")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
