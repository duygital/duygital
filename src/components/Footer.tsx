import { Facebook, Instagram, Youtube, ArrowUp } from "lucide-react";
import { translations } from "../translations";

interface FooterProps {
  language: "en" | "vi";
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Footer({ language, activeTab, setActiveTab }: FooterProps) {
  const t = translations[language];

  const TiktokIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-3.5 h-3.5"
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.14.94 1.05 2.25 1.74 3.66 1.94v3.91a8.914 8.914 0 01-4.97-1.46c-.02 2.68-.02 5.35-.03 8.03-.09 1.76-.59 3.52-1.62 4.93-1.4 1.88-3.71 3.01-6.07 2.94-2.73-.1-5.32-1.92-6.14-4.52-1.03-3.13.51-6.73 3.53-7.93.94-.38 1.96-.54 2.97-.48v3.97c-.96-.13-1.97.16-2.68.83-.87.79-1.12 2.05-.62 3.14.49 1.12 1.69 1.82 2.9 1.72 1.25-.05 2.37-.96 2.63-2.18.11-.53.15-1.08.14-1.62-.01-4.81-.01-9.62-.01-14.43.02-.02.03-.04.05-.06z" />
    </svg>
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/duygital",
      icon: <Facebook className="w-3.5 h-3.5" />,
      color: "hover:text-[#1877F2] hover:border-[#1877F2]/30"
    },
    {
      name: "Instagram",
      href: "https://instagram.com/duygital",
      icon: <Instagram className="w-3.5 h-3.5" />,
      color: "hover:text-[#E1306C] hover:border-[#E1306C]/30"
    },
    {
      name: "TikTok",
      href: "https://tiktok.com/@duygital",
      icon: <TiktokIcon />,
      color: "hover:text-[#00f2fe] hover:border-[#FE2C55]/30"
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@duygital",
      icon: <Youtube className="w-3.5 h-3.5" />,
      color: "hover:text-[#FF0000] hover:border-[#FF0000]/30"
    }
  ];

  return (
    <footer className="w-full relative mt-0 bg-[#07030C] py-8 overflow-hidden z-30 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Copyright notes with subtle active signal */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5 select-none">
          <div className="flex items-center gap-2">
            <span className="font-sans font-black text-sm tracking-[0.25em] text-paper">
              DUYGITAL
            </span>
            <span className="w-1 h-1 rounded-full bg-brand animate-pulse" />
          </div>
          <span className="font-mono text-[9px] tracking-[0.16em] text-paper/35 lowercase">
            {t.footer.copyright}
          </span>
          <span className="font-mono text-[8px] tracking-[0.18em] text-brand/40 uppercase">
            {t.footer.subtitle}
          </span>
        </div>

        {/* Center: Sleek minimalist social broadcast nodes */}
        <div className="flex items-center gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 border border-paper/10 bg-paper/[0.01] text-paper/50 transition-all duration-300 rounded-none relative group overflow-hidden ${social.color}`}
              title={social.name}
            >
              <span className="absolute inset-x-0 bottom-0 h-[1px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              {social.icon}
            </a>
          ))}
        </div>

        {/* Right Side: Back to Top Trigger button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2.5 px-4 py-2.5 border border-paper/15 text-paper/50 hover:text-brand hover:border-brand/40 bg-paper/[0.01] hover:bg-[#12091A] transition-all duration-500 rounded-none cursor-pointer text-[9px] font-mono tracking-[0.2em] font-bold uppercase select-none group"
          id="btn-back-to-top"
          title={language === "vi" ? "Lên trên cùng" : "Back to top"}
        >
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          <span>{language === "vi" ? "VỀ ĐẦU TRANG" : "SCROLL TO TOP"}</span>
        </button>
      </div>
    </footer>
  );
}
