import { motion } from "motion/react";
import { Sliders } from "lucide-react";
import { translations } from "../translations";
import { useState, useEffect } from "react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: "en" | "vi";
  toggleLanguage: () => void;
  onOpenCMSModal: () => void;
  isCMSLinked: boolean;
}

export default function Header({
  activeTab,
  setActiveTab,
  language,
  toggleLanguage,
  onOpenCMSModal,
  isCMSLinked,
}: HeaderProps) {
  const t = translations[language];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (activeTab !== "home") {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      // Transition exactly at 150px
      setScrolled(window.scrollY > 150);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab]);

  const navItems = [
    { id: "home", label: t.header.home },
    { id: "works", label: t.header.works },
    { id: "thinking", label: t.header.thinking },
    { id: "collaboration", label: t.header.collaboration },
    { id: "contact", label: t.header.contact },
  ];

  const headerBgClass = scrolled
    ? "bg-[#0D0D0D]/85 border-b border-paper/15 backdrop-blur-md py-4 md:py-4.5 shadow-xl"
    : "bg-transparent border-b border-transparent py-5 md:py-6";

  return (
    <header className={`fixed top-0 left-0 w-full z-40 px-6 md:px-12 grid grid-cols-2 md:grid-cols-3 items-center transition-all duration-500 ease-in-out ${headerBgClass}`}>
      {/* LEFT: DUYGITAL logo only */}
      <div className="flex items-center justify-self-start">
        <button
          onClick={() => setActiveTab("home")}
          className="cursor-pointer text-left"
          id="btn-nav-home-logo"
        >
          <span className="font-sans font-black text-lg tracking-[0.28em] text-paper hover:text-brand transition-colors duration-500">
            DUYGITAL
          </span>
        </button>
      </div>

      {/* CENTER: Main Navigation Menu (Centered, balanced, stable, sans-serif) */}
      <nav className="hidden md:flex items-center justify-center gap-6 col-start-2 justify-self-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative px-2.5 py-1 text-xs font-sans tracking-[0.22em] uppercase transition-colors duration-500 hover:text-brand cursor-pointer text-center ${
                isActive ? "text-brand font-semibold" : "text-paper/80 font-light"
              }`}
              id={`nav-${item.id}`}
            >
              <span className="uppercase">{item.label}</span>
              {isActive && (
                <motion.span
                  layoutId="activeNavProgress"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-brand"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* RIGHT: Language toggle (VI / EN) + CMS button */}
      <div className="flex items-center gap-3 justify-self-end col-start-2 md:col-start-3">
        {/* Elegant Language Segment Toggle */}
        <button
          onClick={toggleLanguage}
          className="px-3 py-1.5 border border-paper/15 hover:border-brand/40 bg-paper/[0.02] text-[10px] font-mono text-paper/80 hover:text-brand rounded-none transition-all duration-300 font-black tracking-widest cursor-pointer"
          id="btn-language-toggle"
          title="Chọn ngôn ngữ / Switch Language"
        >
          <span className={language === "vi" ? "text-brand" : "text-paper/40"}>VI</span>
          <span className="text-paper/20 mx-1.5 font-light">/</span>
          <span className={language === "en" ? "text-brand" : "text-paper/40"}>EN</span>
        </button>

        <button
          onClick={onOpenCMSModal}
          className="p-1.5 text-paper/80 hover:text-motion border border-paper/15 hover:border-motion/30 bg-paper/[0.02] rounded-none cursor-pointer transition-all duration-300 flex items-center gap-1.5"
          title="Configure Headless CMS"
          id="btn-cms-settings"
        >
          <Sliders className="w-3.5 h-3.5 text-paper/60" />
          <span className="hidden sm:inline font-sans text-[10px] tracking-[0.2em] text-paper/70 group-hover:text-motion uppercase font-semibold">
            {t.header.cms}
          </span>
        </button>
      </div>
    </header>
  );
}
