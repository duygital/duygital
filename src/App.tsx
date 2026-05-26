import { useState, useEffect } from "react";
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
} from "./data";
import { Project, Essay, PhilosophySnippet, WorkflowStep, PricingPlan, FAQ, Testimonial } from "./types";
import { Film, Settings, Compass, Sliders, CheckSquare, Sparkles } from "lucide-react";
import { translations, updateTranslationsWithLabels, resetTranslations } from "./translations";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [language, setLanguage] = useState<"en" | "vi">("vi");
  const [isCMSModalOpen, setIsCMSModalOpen] = useState<boolean>(false);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);

  // Dynamic Portfolio Database States initialized with robust fallbacks
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [essays, setEssays] = useState<Essay[]>(DEFAULT_ESSAYS);
  const [pricing, setPricing] = useState<PricingPlan[]>(DEFAULT_PRICING);
  const [faqs, setFaqs] = useState<FAQ[]>(DEFAULT_FAQ);
  const [workflow, setWorkflow] = useState<WorkflowStep[]>(DEFAULT_WORKFLOW);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

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
    } else {
      // Clean fallback to defaults when sheet is unlinked
      resetTranslations();
      setProjects(DEFAULT_PROJECTS);
      setPricing(DEFAULT_PRICING);
      setFaqs(DEFAULT_FAQ);
      setWorkflow(DEFAULT_WORKFLOW);
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
    <div className="relative min-h-screen bg-bg text-paper font-sans overflow-x-hidden selection:bg-brand selection:text-paper" id="main-viewport-frame">
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
