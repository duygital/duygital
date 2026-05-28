import { motion } from "motion/react";
import { Play } from "lucide-react";
import { PhilosophySnippet, Project, HeroContent } from "../types";
import VideoThumbnail from "./media/VideoThumbnail";

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
    vi: "XEM CÁC TÁC PHẨM TUYỂN CHỌN",
    en: "VIEW SELECTED WORKS",
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

export default function Hero({ onExploreWorks, philosophySnippet, language, projects, onSelectProject, heroContent }: HeroProps) {
  const t = (key: string): string => {
    if (heroContent && heroContent[key]) {
      const val = heroContent[key][language];
      if (val) return val;
    }
    return FALLBACK_HERO_CONTENT[key]?.[language] || "";
  };

  // Dynamic localized version of the central philosophy quote fallback
  const localizedQuote = t("hero_quote") || (language === "en" 
    ? philosophySnippet.quote 
    : "Biên tập không phải là dồn dập kỹ xảo. Nó là nghệ thuật điều tiết khoảng lặng để câu chuyện tự thân cất tiếng.");

  const localizedAuthor = t("hero_quote_author") || (language === "en" ? philosophySnippet.author : "Duygital");

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
        <span className="w-3 h-[1px] bg-brand/30" />
        <span className="font-mono text-[10px] tracking-[0.24em] text-brand uppercase font-black">
          CHAPTER I // {t("hero_badge")}
        </span>
        <span className="w-3 h-[1px] bg-brand/30" />
      </motion.div>

      {/* CENTER: Main typography statement with serif emotional contrast */}
      <div className="w-full max-w-4xl mx-auto z-20 text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          className="font-sans text-3xl md:text-6xl lg:text-[4.75rem] font-extrabold tracking-tight leading-[1.08] text-paper uppercase"
        >
          {t("hero_heading_line1")} <br />
          <span className="font-serif italic font-normal text-brand lowercase tracking-wide normal-case inline-block my-1 md:my-2">
            {t("hero_heading_line2")}
          </span> <br />
          {t("hero_heading_line3")}
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
                  <div 
                    onClick={() => onSelectProject(featuredProject.id)}
                    className="absolute inset-0 w-full h-full cursor-pointer z-10"
                  >
                    <VideoThumbnail
                      project={featuredProject}
                      className="absolute inset-0 w-full h-full object-cover opacity-35 grayscale group-hover:scale-[1.02] group-hover:opacity-45 transition-all duration-[1200ms]"
                    />
                  </div>

                  {/* Symmetrical Quote Overlay as Showcase details */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center px-8 md:px-16 text-center z-20 bg-bg/20">
                    <span className="text-[9px] bg-[#D9381E] text-white px-2.5 py-1 rounded-none font-black tracking-widest uppercase mb-4">
                      {t("hero_label")}
                    </span>

                    <h3 
                      className="font-serif text-2xl md:text-3.5xl lg:text-4xl font-light italic text-paper uppercase tracking-normal leading-tight max-w-2xl cursor-pointer hover:text-brand transition-colors duration-300"
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
                      className="mt-6 flex items-center gap-2 bg-black/40 hover:bg-brand/15 text-paper hover:text-brand border border-paper/20 hover:border-brand px-5 py-2.5 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 rounded-none backdrop-blur-xs cursor-pointer shadow-md"
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
          <span>{t("hero_cta")}</span>
        </button>
      </motion.div>

      {/* BOTTOM: Supporting philosophy blocks aligned consistently across columns with cinematic headers */}
      <div className="w-full max-w-4xl mx-auto z-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-paper/15 pt-12 text-left">
        {(() => {
          const raw1 = t("hero_principle_1_title");
          const p1 = raw1.split(" / ");
          const num1 = p1[0] ? p1[0].trim() : "01";
          const title1 = p1[1] ? p1[1].trim() : raw1;
          return (
            <div>
              <span className="font-mono text-[10px] tracking-[0.24em] text-[#D9381E] block mb-2 font-black uppercase">
                SECTION // {num1}
              </span>
              <h4 className="font-serif text-lg font-light italic text-paper uppercase tracking-normal mb-3">
                {title1}
              </h4>
              <p className="text-sm font-light text-paper/80 leading-relaxed font-sans">
                {t("hero_principle_1_desc")}
              </p>
            </div>
          );
        })()}

        {(() => {
          const raw2 = t("hero_principle_2_title");
          const p2 = raw2.split(" / ");
          const num2 = p2[0] ? p2[0].trim() : "02";
          const title2 = p2[1] ? p2[1].trim() : raw2;
          return (
            <div>
              <span className="font-mono text-[10px] tracking-[0.24em] text-[#D9381E] block mb-2 font-black uppercase">
                SECTION // {num2}
              </span>
              <h4 className="font-serif text-lg font-light italic text-paper uppercase tracking-normal mb-3">
                {title2}
              </h4>
              <p className="text-sm font-light text-paper/80 leading-relaxed font-sans">
                {t("hero_principle_2_desc")}
              </p>
            </div>
          );
        })()}

        {(() => {
          const raw3 = t("hero_principle_3_title");
          const p3 = raw3.split(" / ");
          const num3 = p3[0] ? p3[0].trim() : "03";
          const title3 = p3[1] ? p3[1].trim() : raw3;
          return (
            <div>
              <span className="font-mono text-[10px] tracking-[0.24em] text-[#D9381E] block mb-2 font-black uppercase">
                SECTION // {num3}
              </span>
              <h4 className="font-serif text-lg font-light italic text-paper uppercase tracking-normal mb-3">
                {title3}
              </h4>
              <p className="text-sm font-light text-paper/80 leading-relaxed font-sans">
                {t("hero_principle_3_desc")}
              </p>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
