import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { PhilosophySnippet, Project, HeroContent } from "../types";
import VideoThumbnail from "./media/VideoThumbnail";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

export default function Hero({
  onExploreWorks,
  philosophySnippet,
  language,
  projects,
  onSelectProject,
  heroContent
}: HeroProps) {
  const masterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);

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

  // Dynamic canvas images with local storage persistence
  const [leftCharUrl] = useState(() => {
    return localStorage.getItem("duygital_canvas_left") || "https://sv2.anhsieuviet.com/2026/05/28/trai.png";
  });
  const [rightCharUrl] = useState(() => {
    return localStorage.getItem("duygital_canvas_right") || "https://sv2.anhsieuviet.com/2026/05/28/phai.png";
  });
  const [bgColorUrl] = useState(() => {
    return localStorage.getItem("duygital_canvas_bg") || "https://sv2.anhsieuviet.com/2026/05/29/BG.png";
  });

  const handleScrollToPortfolio = () => {
    const el = document.querySelector(".main-portfolio-content");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // GSAP Mouse Parallax & Cinematic Scroll Pinning Setup
  useEffect(() => {
    const parent = containerRef.current;
    const master = masterRef.current;
    if (!parent || !master) return;

    // Mousemove Parallax listener inside active Renaissance viewport bounds (restrained coordinates)
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1; 
      const normY = (e.clientY / innerHeight) * 2 - 1; 

      // Background drifts slower
      gsap.to(parent.querySelectorAll(".bg-mouse-wrap"), {
        x: normX * 6,
        y: normY * 6,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Character figures react with symmetrical counterpart weight (slightly faster but quiet)
      gsap.to(parent.querySelectorAll(".char-left-mouse-wrap, .char-right-mouse-wrap"), {
        x: normX * -10,
        y: normY * -10,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Text elements float subtly opposite
      gsap.to(parent.querySelectorAll(".content-mouse-wrap"), {
        x: normX * -14,
        y: normY * -14,
        duration: 1.0,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Build the master timeline context using GSAP context for clean garbage collection
    const ctx = gsap.context(() => {
      // 1. PINNED CINEMATIC TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "introTrigger",
          trigger: parent,
          pin: true,
          start: "top top",
          end: "+=2600",
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Initial layout sets to ensure absolute perfection and cinematic depth
      gsap.set(".camera-lens-viewport", { scale: 1.0 });
      gsap.set(".celestial-spark", { scale: 0, opacity: 0 });
      gsap.set(".char-left-wrap", { y: "8vh", x: "-4vw", scale: 0.75, opacity: 1, filter: "none" });
      gsap.set(".char-right-wrap", { y: "8vh", x: "4vw", scale: 0.75, opacity: 1, filter: "none" });
      gsap.set(".char-colored", { opacity: 1 });
      gsap.set(".char-etched", { opacity: 0 });
      gsap.set(".radial-exposure-wave", { scale: 0, opacity: 0 });
      gsap.set(".starfield-bg", { opacity: 0 });
      gsap.set(".hero-bg", { scale: 1.1, opacity: 1, filter: "none" });
      gsap.set(".renaissance-overlay-wrap", { opacity: 1, filter: "none", display: "block", pointerEvents: "none" });
      gsap.set(".layer-bottom-hero", { opacity: 0, scale: 0.95, pointerEvents: "none" });
      gsap.set(".dust-container", { opacity: 0 });

      // STAGE 2: THE APPROACH & DIAGONAL ASCENSE (Fast & Snappy Cinematic Curves)
      tl.to(".camera-lens-viewport", {
        scale: 1.08,
        ease: "power1.inOut",
        duration: 2.5,
      }, 0)
      .to(".char-left-wrap", {
        x: "11vw", // Diagonal inward approach
        y: "-4vh", // Drifts upward
        scale: 1.0, // Reaches exactly 1.0 near contact
        ease: "power1.inOut",
        duration: 2.5,
      }, 0)
      .to(".char-right-wrap", {
        x: "-11vw", // Diagonal inward approach
        y: "-4vh", // Drifts upward
        scale: 1.0, // Reaches exactly 1.0 near contact
        ease: "power1.inOut",
        duration: 2.5,
      }, 0)
      .to(".hero-bg", {
        scale: 1.02,
        ease: "power1.inOut",
        duration: 2.5,
      }, 0)
      .to(".content-scroll-wrap", {
        opacity: 0,
        y: -15,
        ease: "power1.in",
        duration: 1.8,
      }, 0);

      // SACRED RECLAMATION MOMENT (Subsecond majestic contact)
      // Spawn concentrated white celestial spark flash
      tl.to(".celestial-spark", {
        scale: 100,
        opacity: 1,
        ease: "power3.out",
        duration: 0.25,
      }, 2.4)
      .to(".celestial-spark", {
        scale: 160,
        opacity: 0,
        ease: "power2.in",
        duration: 0.35,
      }, 2.65)
      
      // ORGANIC RADIAL EXPOSURE WAVE PROPAGATION
      .to(".radial-exposure-wave", {
        scale: 25,
        opacity: 1,
        duration: 1.1,
        ease: "power2.out",
      }, 2.45)
      .to(".radial-exposure-wave", {
        opacity: 0,
        duration: 0.6,
        ease: "power1.in",
      }, 3.55)

      // Wherever the wave passes: renaissance pigment dissolves & surfaces become luminous etched contours
      .to(".char-colored", {
        opacity: 0,
        duration: 0.9,
        ease: "power1.inOut",
      }, 2.5)
      .to(".char-etched", {
        opacity: 1,
        duration: 0.9,
        ease: "power1.inOut",
      }, 2.5)

      // Background darkens into deep starry void atmosphere
      .to(".hero-bg", {
        opacity: 0,
        duration: 1.1,
        ease: "power2.inOut",
      }, 2.5)
      .to(".starfield-bg", {
        opacity: 1,
        duration: 1.1,
        ease: "power2.inOut",
      }, 2.5)
      .to(".dust-container", {
        opacity: 1,
        duration: 0.9,
        ease: "power1.inOut"
      }, 2.5);

      // STAGE 3: THE CINEMATIC CROSS-THROUGH & FOREGROUND EXIT
      tl.to(".camera-lens-viewport", {
        scale: 1.35,
        ease: "power1.inOut",
        duration: 2.7,
      }, 2.5)
      .to(".char-left-wrap", {
        x: "45vw", // Keep moving to upper-right foreground
        y: "-25vh",
        scale: 2.2, // Drifts larger to pass camera plane
        opacity: 0,
        duration: 2.7,
        ease: "power2.inOut",
      }, 2.5)
      .to(".char-right-wrap", {
        x: "-45vw", // Keep moving to upper-left foreground
        y: "-25vh",
        scale: 2.2, // Drifts larger to pass camera plane
        opacity: 0,
        duration: 2.7,
        ease: "power2.inOut",
      }, 2.5)
      .to(".starfield-bg", {
        opacity: 0,
        duration: 1.6,
        ease: "power2.inOut",
      }, 3.8)
      .to(".dust-container", {
        opacity: 0,
        duration: 1.6,
        ease: "power2.inOut",
      }, 3.5)
      .to(".renaissance-overlay-wrap", {
        opacity: 0,
        duration: 1.6,
        ease: "power2.inOut",
      }, 4.2)
      
      // STAGE 4: NEW MODERN CINEMATIC WORLD EMERGES FROM PITCH DARKNESS
      .to(".layer-bottom-hero", {
        opacity: 1,
        scale: 1.0,
        pointerEvents: "auto",
        duration: 1.5,
        ease: "power2.out",
      }, 5.0)

      // Hide Renaissance Overlay completely to enable element hover of bottom hero
      .set(".renaissance-overlay-wrap", {
        display: "none",
        pointerEvents: "none"
      }, 6.5);

      // 2. DEDICATED PORTFOLIO STAGGER SECTION
      gsap.from(".main-portfolio-content .anim-reveal", {
        scrollTrigger: {
          trigger: ".main-portfolio-content",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 45,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power2.out",
      });

    }, master);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, [leftCharUrl, rightCharUrl, bgColorUrl]);

  return (
    <div ref={masterRef} className="relative w-full bg-[#0D0D0D] p-0 m-0">
      
      {/* ================= EXPERIENCE SCROLL SCENE (z-10) ================= */}
      <div ref={containerRef} className="intro-scroll-scene relative w-full h-screen overflow-hidden bg-[#0C0C0C]">
        
        {/* ================= LAYER 1: BOTTOM CORE BRANDING HERO (z-10) ================= */}
        <div 
          ref={layer1Ref} 
          className="layer-bottom-hero absolute inset-0 w-full h-full flex flex-col justify-between p-0 m-0 z-10"
        >
          {/* Symmetrical dark backdrop mesh */}
          <div className="absolute inset-0 bg-[#0D0D0D] z-1 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.04)_0%,transparent_70%)] z-2 pointer-events-none" />
          
          {/* Layer 1 Sleek Top Header Navigation */}
          <header className="w-full flex items-center justify-between px-8 py-6 md:px-16 z-30 border-b border-white/[0.04] bg-[#0D0D0D]/60 backdrop-blur-md relative uppercase text-[#A0A0A0]">
            <div className="flex items-center gap-6 sm:gap-12 pointer-events-auto">
              <span 
                className="text-[#F4F1EA] text-base md:text-lg font-bold tracking-[0.25em] cursor-pointer"
                style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
              >
                DUYGITAL
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] hidden sm:inline-block animate-pulse" />
              <span className="text-[8px] font-mono tracking-[0.3em] hidden sm:inline-block">
                {language === "vi" ? "XƯỞNG BIÊN TẬP" : "POST-PRODUCTION"}
              </span>
            </div>
            
            <nav className="flex items-center gap-6 md:gap-10 font-mono text-[8px] md:text-[9px] tracking-[0.22em] pointer-events-auto">
              <button 
                onClick={handleScrollToPortfolio}
                className="hover:text-[#F4F1EA] transition-colors cursor-pointer bg-transparent border-none outline-none font-bold font-mono"
              >
                {language === "vi" ? "Tác phẩm" : "Portfolio"}
              </button>
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToPortfolio();
                }} 
                className="hover:text-[#F4F1EA] transition-colors no-underline font-bold"
              >
                {language === "vi" ? "Triết lý" : "Philosophy"}
              </a>
            </nav>
          </header>

          {/* Centered Brand Spotlight Statement */}
          <div className="flex-grow flex flex-col items-center justify-center text-center px-6 z-10 py-12 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,transparent_80%)] pointer-events-none z-1" />
            
            <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl pointer-events-auto text-[#F4F1EA]">
              
              {/* Premium Rotating Craftsman Badge design */}
              <div className="relative w-24 h-24 mb-6 animate-[spin_20s_linear_infinite] select-none pointer-events-none opacity-85">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#C5A880]/60">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className="font-mono uppercase text-[7px] fill-current tracking-[0.08em]">
                    <textPath href="#circlePath">
                      {language === "vi" 
                        ? " • XƯỞNG BIÊN TẬP DUYGITAL • POST PRODUCTION STUDIO • " 
                        : " • DUYGITAL POST PRODUCTION STUDIO • ART DIRECTION • "}
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-[#C5A880] font-bold">
                  ★
                </div>
              </div>

              {/* Subheading badge line */}
              <span className="text-[#C5A880] font-mono text-[9px] md:text-[10px] tracking-[0.38em] uppercase mb-4 block select-none">
                {language === "vi" ? "CHAPTER I // XƯỞNG BIÊN TẬP DUYGITAL" : "CHAPTER I // DUYGITAL EDITING STUDIO"}
              </span>

              {/* Magnificent displays heading statement */}
              <h1 
                className="text-[#F4F1EA] text-4xl sm:text-6xl md:text-[5rem] lg:text-[6.5rem] font-bold tracking-[0.25em] uppercase mb-7 leading-none select-none text-center"
                style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
              >
                DUYGITAL
              </h1>

              {/* Minimal sub statement description */}
              <p className="text-[#A0A0A0] text-[9px] sm:text-xs tracking-[0.2em] max-w-2xl font-light leading-relaxed mb-10 select-none uppercase text-center font-sans px-4">
                {language === "vi" 
                  ? "ĐẠO DIỄN NGHỆ THUẬT & DỰNG PHIM ĐỘNG LỰC HỌC PHONG CÁCH PHỤC HƯNG"
                  : "ARTISTIC DIRECTION & KINETIC MONTAGES IN MODERN RENAISSANCE PACING"}
              </p>

              {/* Main explore CTA click target button */}
              <button 
                onClick={handleScrollToPortfolio}
                className="px-10 py-4.5 border border-[#C5A880] text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.22em] bg-transparent transition-all duration-300 hover:bg-[#F4F1EA] hover:text-[#0D0D0D] hover:border-[#F4F1EA] rounded-none cursor-pointer shadow-md flex items-center gap-3"
              >
                <span>{language === "vi" ? "XEM CÁC TÁC PHẨM TUYỂN CHỌN" : "EXPLORE SELECT WORKS"}</span>
                <span className="animate-bounce">↓</span>
              </button>

            </div>
          </div>



        </div>

        {/* ================= LAYER 2: THE RENAISSANCE OVERLAY PORTAL (z-20) ================= */}
        <div 
          ref={introRef} 
          className="renaissance-overlay-wrap absolute inset-0 w-full h-full z-20 pointer-events-none"
        >
          
          {/* Core scalable viewfinder with custom center origin coordinates */}
          <div className="camera-lens-viewport scale-110 !transform">
            
            {/* Deep star-filled void background (initially hidden, revealed as pigment dissolves) */}
            <div className="starfield-bg" />

            {/* Background image overlay layer */}
            <div className="bg-scroll-wrap absolute inset-0 w-full h-full z-1">
              <div className="bg-mouse-wrap w-full h-full relative">
                <div className="hero-bg">
                  <img 
                    src={bgColorUrl} 
                    alt="Renaissance Oil Backdrop" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Chiaroscuro museum vignette gradients */}
            <div className="hero-vignette" />

            {/* High-performance stylistic floating dust overlay */}
            <div className="dust-container">
              <div className="dust-particle dp-1" />
              <div className="dust-particle dp-2" />
              <div className="dust-particle dp-3" />
              <div className="dust-particle dp-4" />
              <div className="dust-particle dp-5" />
              <div className="dust-particle dp-6" />
              <div className="dust-particle dp-7" />
              <div className="dust-particle dp-8" />
            </div>

            {/* Radial exposure wave element at the fingertip contact point (viewport center) */}
            <div className="radial-exposure-wave" />

            {/* Centered initial minimal instructional content scroll callout */}
            <div className="content-scroll-wrap absolute inset-x-0 bottom-[6vh] flex justify-center z-10 pointer-events-none select-none">
              <div className="content-mouse-wrap">
                <span className="font-mono text-[9px] tracking-[0.45em] text-white/30 uppercase">
                  {language === "vi" ? "CUỘN XUỐNG" : "DESCEND"}
                </span>
              </div>
            </div>

            {/* Left character portrait mesh */}
            <div className="char-left-wrap left-0 overflow-hidden absolute">
              <div className="char-left-mouse-wrap w-full h-full relative">
                <div className="hero-char-left scale-105">
                  <img 
                    src={leftCharUrl} 
                    alt="Renaissance Left Character Figure"
                    referrerPolicy="no-referrer"
                    className="char-colored select-none pointer-events-none"
                    onError={(e) => {
                      e.currentTarget.src = "https://sv2.anhsieuviet.com/2026/05/28/trai.png";
                    }}
                  />
                  <img 
                    src={leftCharUrl} 
                    alt="Renaissance Left Character Contour"
                    referrerPolicy="no-referrer"
                    className="char-etched select-none pointer-events-none"
                    onError={(e) => {
                      e.currentTarget.src = "https://sv2.anhsieuviet.com/2026/05/28/trai.png";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right character portrait mesh */}
            <div className="char-right-wrap right-0 overflow-hidden absolute">
              <div className="char-right-mouse-wrap w-full h-full relative">
                <div className="hero-char-right scale-105">
                  <img 
                    src={rightCharUrl} 
                    alt="Renaissance Right Character Figure"
                    referrerPolicy="no-referrer"
                    className="char-colored select-none pointer-events-none"
                    onError={(e) => {
                      e.currentTarget.src = "https://sv2.anhsieuviet.com/2026/05/28/phai.png";
                    }}
                  />
                  <img 
                    src={rightCharUrl} 
                    alt="Renaissance Right Character Contour"
                    referrerPolicy="no-referrer"
                    className="char-etched select-none pointer-events-none"
                    onError={(e) => {
                      e.currentTarget.src = "https://sv2.anhsieuviet.com/2026/05/28/phai.png";
                    }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Symmetrical timeline margin indicators */}
          <div className="absolute inset-x-0 bottom-20 top-24 pointer-events-none flex items-center justify-between px-8 md:px-16 z-3 select-none">
            <div className="w-12 h-12 border border-white/[0.04] rounded-full flex items-center justify-center font-mono text-[7px] text-[#A0A0A0]/20 tracking-widest uppercase pb-0.5">
              SEC.01
            </div>
            <div className="w-9 h-9 border border-white/[0.04] rotate-45 flex items-center justify-center font-mono text-[6px] text-[#A0A0A0]/20 tracking-widest uppercase">
              P.01
            </div>
          </div>

        </div>

        {/* Symmetrical white flash/glow center element at fingers intersection point */}
        <div className="celestial-spark" />

      </div>

      {/* ================= SECTION 2: PORTFOLIO MAIN LISTING CONTENT ================= */}
      <div className="main-portfolio-content relative min-h-0 bg-[#0D0D0D] z-20 py-12 px-6 md:px-12 lg:px-24 border-t border-white/[0.05]">
        
        <div className="max-w-4xl mx-auto mb-12 text-center select-none">
          <div className="anim-reveal mb-6 flex items-center gap-2 justify-center">
            <span className="w-3 h-[1px] bg-[#C5A880]/35" />
            <span className="font-mono text-[10px] tracking-[0.24em] text-[#C5A880] uppercase font-black">
              CHAPTER II // {t("hero_label")}
            </span>
            <span className="w-3 h-[1px] bg-[#C5A880]/35" />
          </div>

          {/* Central Featured Video Frame */}
          <div className="anim-reveal w-full border border-white/10 bg-black overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.98)] group relative aspect-video flex flex-col justify-center items-center mb-10">
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
                        className="absolute inset-0 w-full h-full object-cover opacity-35 grayscale group-hover:scale-[1.01] group-hover:opacity-50 transition-all duration-[1200ms]"
                      />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-16 text-center z-20 bg-black/40 pointer-events-none">
                      <span className="text-[9px] bg-[#C5A880] text-black px-2.5 py-1 rounded-none font-black tracking-widest uppercase mb-4 select-none">
                        {t("hero_label")}
                      </span>

                      <h3 
                        className="font-serif text-2xl md:text-3.5xl lg:text-4xl font-light italic text-[#F4F1EA] uppercase tracking-normal leading-tight max-w-2xl cursor-pointer hover:text-[#C5A880] pointer-events-auto transition-colors duration-300"
                        onClick={() => onSelectProject(featuredProject.id)}
                      >
                        {featuredProject.title}
                      </h3>

                      <p className="font-mono text-[10px] text-[#C5A880] tracking-[0.2em] uppercase mt-4 font-bold select-none">
                        {featuredProject.category ? `${featuredProject.category.toUpperCase()} — ` : ""}{featuredProject.year || "2026"}
                      </p>

                      {featuredProject.role && (
                        <p className="text-xs text-[#A0A0A0] font-sans tracking-wide mt-1.5 font-light select-none">
                          {featuredProject.role}
                        </p>
                      )}

                      <button
                        onClick={() => onSelectProject(featuredProject.id)}
                        className="mt-6 flex items-center gap-2 bg-black/65 hover:bg-[#C5A880]/20 text-[#C5A880] hover:text-[#F4F1EA] border border-white/10 hover:border-[#C5A880] px-6 py-3 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 pointer-events-auto rounded-none backdrop-blur-xs cursor-pointer shadow-md"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{language === "vi" ? "CHI TIẾT SÁNG TẠO" : "EXPLORE SELECTED WORK"}</span>
                      </button>
                    </div>
                  </>
                );
              }

              return (
                <div className="absolute inset-0 flex flex-col justify-center items-center px-8 md:px-16 text-center z-20 bg-black/45">
                  <p className="font-sans text-base md:text-xl lg:text-2xl text-[#F4F1EA]/90 max-w-2xl leading-relaxed font-light font-serif italic">
                    &ldquo;{localizedQuote}&rdquo;
                  </p>
                  <p className="font-mono text-[9px] text-[#C5A880] tracking-[0.25em] uppercase mt-5 font-bold">
                    — {localizedAuthor}
                  </p>
                </div>
              );
            })()}
          </div>

          {/* Philosophy / Conceptual Post-Production Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-10 text-left">
            {(() => {
              const raw1 = t("hero_principle_1_title");
              const p1 = raw1.split(" / ");
              const num1 = p1[0] ? p1[0].trim() : "01";
              const title1 = p1[1] ? p1[1].trim() : raw1;
              return (
                <div className="anim-reveal">
                  <span className="font-mono text-[9px] tracking-[0.22em] text-[#C5A880] block mb-3 font-black uppercase select-none">
                    SECTION // {num1}
                  </span>
                  <h4 
                    className="text-lg md:text-xl font-light italic text-[#F4F1EA] uppercase tracking-normal mb-3 select-none"
                    style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
                  >
                    {title1}
                  </h4>
                  <p className="text-[13px] font-light text-[#A0A0A0] leading-relaxed font-sans">
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
                <div className="anim-reveal">
                  <span className="font-mono text-[9px] tracking-[0.22em] text-[#C5A880] block mb-3 font-black uppercase select-none">
                    SECTION // {num2}
                  </span>
                  <h4 
                    className="text-lg md:text-xl font-light italic text-[#F4F1EA] uppercase tracking-normal mb-3 select-none"
                    style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
                  >
                    {title2}
                  </h4>
                  <p className="text-[13px] font-light text-[#A0A0A0] leading-relaxed font-sans">
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
                <div className="anim-reveal">
                  <span className="font-mono text-[9px] tracking-[0.22em] text-[#C5A880] block mb-3 font-black uppercase select-none">
                    SECTION // {num3}
                  </span>
                  <h4 
                    className="text-lg md:text-xl font-light italic text-[#F4F1EA] uppercase tracking-normal mb-3 select-none"
                    style={{ fontFamily: '"Cinzel", "Playfair Display", serif' }}
                  >
                    {title3}
                  </h4>
                  <p className="text-[13px] font-light text-[#A0A0A0] leading-relaxed font-sans">
                    {t("hero_principle_3_desc")}
                  </p>
                </div>
              );
            })()}
          </div>



        </div>

      </div>

    </div>
  );
}
