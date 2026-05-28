import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Works from "./components/Works";
import Thinking from "./components/Thinking";
import Collaboration from "./components/Collaboration";
import Contact from "./components/Contact";
import CMSConfig from "./components/CMSConfig";

import {
  DEFAULT_PROJECTS,
  DEFAULT_PHILOSOPHY,
  DEFAULT_ESSAYS,
  DEFAULT_WORKFLOW,
  DEFAULT_PRICING,
  DEFAULT_TESTIMONIALS,
  DEFAULT_FAQ,
  fetchSpreadsheetTabs,
  parseProjects,
  parsePricing,
  parseFaq,
  parseWorkflow,
  parseHeroContent,
} from "./data";
import { Project, Essay, PhilosophySnippet, WorkflowStep, PricingPlan, FAQ, Testimonial, HeroContent } from "./types";
import { Film, Settings, Compass, Sliders, CheckSquare, Sparkles } from "lucide-react";
import { translations, updateTranslationsWithLabels, resetTranslations } from "./translations";

// Define slugs mapping for robust two-way client-side routing
const SLUG_TO_TAB: Record<string, string> = {
  "/": "home",
  "/trang-chu": "home",
  "/du-an": "works",
  "/quy-trinh": "thinking",
  "/bang-gia": "collaboration",
  "/lien-he": "contact",
  "/cam-on": "contact",
  "/thank-you": "contact",
  "/home": "home",
  "/projects": "works",
  "/works": "works",
  "/process": "thinking",
  "/thinking": "thinking",
  "/pricing": "collaboration",
  "/collaboration": "collaboration",
  "/contact": "contact",
};

const TAB_TO_SLUG: Record<string, { vi: string; en: string }> = {
  home: { vi: "/", en: "/" },
  works: { vi: "/du-an", en: "/projects" },
  thinking: { vi: "/quy-trinh", en: "/process" },
  collaboration: { vi: "/bang-gia", en: "/pricing" },
  contact: { vi: "/lien-he", en: "/contact" },
};

const VI_SLUGS = ["/trang-chu", "/du-an", "/quy-trinh", "/bang-gia", "/lien-he", "/cam-on"];
const EN_SLUGS = ["/home", "/projects", "/works", "/process", "/thinking", "/pricing", "/collaboration", "/contact", "/thank-you"];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const cleanedPath = path === "/" ? "/" : path.replace(/\/$/, "");
      
      if (cleanedPath.startsWith("/du-an") || cleanedPath.startsWith("/works") || cleanedPath.startsWith("/projects")) {
        return "works";
      }
      return SLUG_TO_TAB[cleanedPath] || "home";
    }
    return "home";
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const cleanedPath = path === "/" ? "/" : path.replace(/\/$/, "");
      
      if (cleanedPath.startsWith("/du-an/") || cleanedPath.startsWith("/works/") || cleanedPath.startsWith("/projects/")) {
        const parts = cleanedPath.split("/");
        return parts[parts.length - 1] || null;
      }
    }
    return null;
  });

  const [language, setLanguage] = useState<"en" | "vi">(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const cleanedPath = path === "/" ? "/" : path.replace(/\/$/, "");
      if (cleanedPath.startsWith("/du-an") || VI_SLUGS.includes(cleanedPath) || cleanedPath === "/cam-on") {
        return "vi";
      }
      if (cleanedPath.startsWith("/works") || cleanedPath.startsWith("/projects") || EN_SLUGS.includes(cleanedPath) || cleanedPath === "/thank-you") {
        return "en";
      }
    }
    return "vi";
  });

  const [isCMSModalOpen, setIsCMSModalOpen] = useState<boolean>(false);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);

  // Dynamic Portfolio Database States initialized with robust fallbacks
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [essays, setEssays] = useState<Essay[]>(DEFAULT_ESSAYS);
  const [pricing, setPricing] = useState<PricingPlan[]>(DEFAULT_PRICING);
  const [faqs, setFaqs] = useState<FAQ[]>(DEFAULT_FAQ);
  const [workflow, setWorkflow] = useState<WorkflowStep[]>(DEFAULT_WORKFLOW);
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);

  // Cache tab raw records to support dynamic instant language switching
  const [rawSheetsData, setRawSheetsData] = useState<any>(null);

  // On boot, try to load any persistent custom sheet link from local storage
  useEffect(() => {
    const savedUrl = localStorage.getItem("duygital_cms_url");
    if (savedUrl) {
      setSheetUrl(savedUrl);
      loadSheetData(savedUrl);
    }
  }, []);

  // Synchronize state changes to URL path slug
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      let targetSlug = TAB_TO_SLUG[activeTab]?.[language] || "/";
      
      if (activeTab === "works" && selectedProjectId) {
        targetSlug = language === "vi" 
          ? `/du-an/${selectedProjectId}` 
          : `/works/${selectedProjectId}`;
      } else if (activeTab === "contact" && (currentPath === "/cam-on" || currentPath === "/thank-you")) {
        targetSlug = currentPath;
      }
      
      if (currentPath !== targetSlug) {
        window.history.pushState(null, "", targetSlug);
      }
    }
  }, [activeTab, selectedProjectId, language]);

  // Handle browser back and forward button popstates
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        const cleanedPath = path === "/" ? "/" : path.replace(/\/$/, "");
        
        let matchedTab = "home";
        let matchedProject: string | null = null;
        
        if (cleanedPath.startsWith("/du-an") || cleanedPath.startsWith("/works") || cleanedPath.startsWith("/projects")) {
          matchedTab = "works";
          if (cleanedPath.includes("/du-an/") || cleanedPath.includes("/works/") || cleanedPath.includes("/projects/")) {
            const parts = cleanedPath.split("/");
            matchedProject = parts[parts.length - 1] || null;
          }
        } else {
          matchedTab = SLUG_TO_TAB[cleanedPath] || "home";
        }
        
        setActiveTab(matchedTab);
        setSelectedProjectId(matchedProject);
        
        if (cleanedPath.startsWith("/du-an") || VI_SLUGS.includes(cleanedPath) || cleanedPath === "/cam-on") {
          setLanguage("vi");
        } else if (cleanedPath.startsWith("/works") || cleanedPath.startsWith("/projects") || EN_SLUGS.includes(cleanedPath) || cleanedPath === "/thank-you") {
          setLanguage("en");
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Reactive parsing when language toggles or new sheet is synchronized
  useEffect(() => {
    if (rawSheetsData) {
      if (rawSheetsData.labels) {
        updateTranslationsWithLabels(rawSheetsData.labels);
      } else {
        resetTranslations();
      }
      if (rawSheetsData.projects) {
        setProjects(parseProjects(rawSheetsData.projects, language));
      }
      if (rawSheetsData.pricing) {
        setPricing(parsePricing(rawSheetsData.pricing, language));
      }
      if (rawSheetsData.faq) {
        setFaqs(parseFaq(rawSheetsData.faq, language));
      }
      if (rawSheetsData.workflow) {
        setWorkflow(parseWorkflow(rawSheetsData.workflow, language));
      }
      if (rawSheetsData.heroContent) {
        setHeroContent(parseHeroContent(rawSheetsData.heroContent));
      } else {
        setHeroContent(null);
      }
    } else {
      // Clean fallback to defaults when sheet is unlinked
      resetTranslations();
      setProjects(DEFAULT_PROJECTS);
      setPricing(DEFAULT_PRICING);
      setFaqs(DEFAULT_FAQ);
      setWorkflow(DEFAULT_WORKFLOW);
      setHeroContent(null);
    }
  }, [rawSheetsData, language]);

  const loadSheetData = async (url: string) => {
    try {
      const tabs = await fetchSpreadsheetTabs(url);
      setRawSheetsData(tabs);
    } catch (error) {
      console.error("Failed to dynamically load spreadsheet tabs into state:", error);
    }
  };

  const handleCMSConfigSaved = (url: string | null) => {
    if (url) {
      localStorage.setItem("duygital_cms_url", url);
      setSheetUrl(url);
      loadSheetData(url);
    } else {
      localStorage.removeItem("duygital_cms_url");
      setSheetUrl(null);
      setRawSheetsData(null);
    }
    setIsCMSModalOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage((l) => (l === "en" ? "vi" : "en"));
  };

  // Get a random quote from our philosophy list to make heroes distinctive on each cycle
  const randomPhilosophy: PhilosophySnippet = DEFAULT_PHILOSOPHY[1]; // Focus on dopamine editing resistance

  return (
    <div
      className="relative min-h-screen bg-bg text-paper font-sans overflow-x-hidden selection:bg-brand selection:text-paper"
      id="main-viewport-frame"
    >
      {/* Dynamic scanlines & analog interference backing */}
      <div className="fixed inset-0 scannable-grain pointer-events-none z-35" />
      
      {/* Floating Header controller */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        toggleLanguage={toggleLanguage}
        onOpenCMSModal={() => setIsCMSModalOpen(true)}
        isCMSLinked={!!sheetUrl}
      />

      {/* Main Pages/Tabs Routing Panel with Framer Motion AnimatePresence */}
      <main className="w-full pt-4 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {activeTab === "home" && (
              <Hero
                projects={projects}
                onExploreWorks={() => setActiveTab("works")}
                onSelectProject={(id) => {
                  setSelectedProjectId(id);
                  setActiveTab("works");
                }}
                philosophySnippet={randomPhilosophy}
                language={language}
                heroContent={heroContent}
              />
            )}
            {activeTab === "works" && (
              <Works
                projects={projects}
                language={language}
                selectedProjectId={selectedProjectId}
                setSelectedProjectId={setSelectedProjectId}
              />
            )}
            {activeTab === "thinking" && (
              <Thinking
                language={language}
                workflow={workflow}
              />
            )}
            {activeTab === "collaboration" && (
              <Collaboration
                workflow={workflow}
                pricing={pricing}
                faqs={faqs}
                testimonials={DEFAULT_TESTIMONIALS}
                onGoToContact={() => setActiveTab("contact")}
                language={language}
              />
            )}
            {activeTab === "contact" && (
              <Contact
                language={language}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Grounded footer */}
      <footer className="w-full py-8 text-center text-[10px] font-mono text-paper/20 border-t border-paper/15 mt-16 flex flex-col items-center justify-center gap-1.5 z-30 relative bg-bg/95 backdrop-blur">
        <span>
          {translations[language]?.footer?.copyright || (language === "en"
            ? "© 2026 DUYGITAL. DESIGNED WITH EDITORIAL PACING AND FOCUS."
            : "© 2026 DUYGITAL. THIẾT KẾ VỚI NHỊP ĐIỆU VÀ SỰ PHÁT TRIỂN CÓ CHỦ ĐÍCH.")}
        </span>
        <span>
          {translations[language]?.footer?.subtitle || (language === "en" ? "PORTFOLIO AND PROJECT INDEX." : "BẢN THIẾT KẾ VÀ MỤC LỤC TÁC PHẨM.")}
        </span>
      </footer>

      {/* Hidden/Config modal CMS Setup Popup */}
      {isCMSModalOpen && (
        <CMSConfig
          onClose={() => setIsCMSModalOpen(false)}
          onConfigSaved={handleCMSConfigSaved}
          currentSheetUrl={sheetUrl}
        />
      )}

    </div>
  );
}
