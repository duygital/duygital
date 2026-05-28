import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

interface ContactProps {
  language: "en" | "vi";
}

const DICT = {
  en: {
    heroTag: "CONTACT INTAKE",
    heroTitle: "Begin the Alignment",
    heroSubtitle: "A human-first intake built for speed and clarity. Skip the massive, complex question traps. Outline your creative objectives in minimal words; we handle the translation.",
    
    // Field Labels & Placeholders
    fullName: "Full Name *",
    fullNamePlaceholder: "How should we address you?",
    emailAddr: "Email Address *",
    emailAddrPlaceholder: "yourname@domain.com",
    zaloWhatsApp: "Zalo / WhatsApp",
    zaloWhatsAppPlaceholder: "e.g. +84 901 234 567",
    
    clientType: "What best describes you? *",
    clientTypeOptions: ["Brand / Company", "Agency Partner", "Independent Creator", "Other / Individual"],
    
    projectType: "Project type *",
    projectTypePlaceholder: "e.g., Documentary, Film, Editorial Commercial, Music Video...",
    
    estimatedQuantity: "Estimated video quantity *",
    estimatedQuantityPlaceholder: "e.g., 1 video, a series of 3, or ongoing retainer...",
    
    budgetLabel: "Estimated budget",
    budgetPlaceholder: "e.g., $1,000, 20M VND, or Undecided...",
    
    mainPlatform: "Core distribution platform *",
    platformOptions: ["YouTube", "Vimeo", "TikTok / Reels", "Offsite / Exhibitions", "Film Festivals", "Other"],
    
    expectedTimeline: "Expected timeline *",
    timelineOptions: ["Rush (< 1 week)", "Standard (2–4 weeks)", "Flexible / Long-term"],
    
    referenceLinks: "Aesthetic reference links",
    referenceLinksPlaceholder: "Links to Vimeo, YouTube, or portfolios with editing styles you like...",
    
    projectDescription: "Short project description *",
    projectDescriptionPlaceholder: "A brief summary of what we are building together...",
    
    btnSubmit: "Submit Creative Alignment",
    btnSubmitting: "Transmitting Inquiry...",
    requiredAlert: "Please fill in all required fields (*) so we can connect.",
    generalError: "A transmission glitch occurred. Rest assured, your message is saved on your local device repository.",
    
    // Success States
    successHeading: "Inquiry Stored",
    successSub: "THE INTENT IS DIRECTLY FILED.",
    successP1: "Thank you for sharing your vision. No automated scripts or generic templates here—Duygital personally reviews every submission with genuine care.",
    successP2: "We will reach out within 24–48 hours via Email or Zalo/WhatsApp. Keep an eye on your inbox.",
    btnAnother: "START ANOTHER FORM",
    
    sheetsSynced: "Google Sheets ledger synchronized.",
    sheetsNotSynced: "Saved locally. Sheets integration was not reached.",
  },
  vi: {
    heroTag: "Ý ĐỒ CHIÊU TRÒ",
    heroTitle: "Khởi Đầu Sự Đồng Điệu",
    heroSubtitle: "Biểu mẫu tinh gọn được thiết kế để kết nối nhanh chóng và rõ ràng nhất. Không có khảo sát rườm rà. Hãy phác thảo sơ bộ ý tưởng của bạn, việc biên tập cứ để tôi lo.",
    
    // Field Labels & Placeholders
    fullName: "Họ và Tên *",
    fullNamePlaceholder: "Tôi nên gọi bạn là gì?",
    emailAddr: "Địa chỉ Email *",
    emailAddrPlaceholder: "yourname@domain.com",
    zaloWhatsApp: "Số liên hệ Zalo / WhatsApp",
    zaloWhatsAppPlaceholder: "Ví dụ: +84 901 234 567",
    
    clientType: "Bạn đại diện cho nhóm nào? *",
    clientTypeOptions: ["Brand / Nhãn hàng", "Agency đối tác", "Nhà sáng tạo độc lập", "Khác / Cá nhân"],
    
    projectType: "Thể loại dự án *",
    projectTypePlaceholder: "Ví dụ: Phim tài liệu, Nghệ thuật/Thời trang, Commercial, Music Video...",
    
    estimatedQuantity: "Số lượng video mong muốn *",
    estimatedQuantityPlaceholder: "Ví dụ: 1 video, chuỗi 3-5 video, hoặc không giới hạn...",
    
    budgetLabel: "Ngân sách dự kiến",
    budgetPlaceholder: "Ví dụ: 10 triệu, 50 triệu, hoặc chưa quyết định...",
    
    mainPlatform: "Nền tảng phát chính *",
    platformOptions: ["YouTube", "Vimeo", "TikTok / Video dọc", "Exhibitions ngoại tuyến", "Liên hoan phim", "Khác"],
    
    expectedTimeline: "Thời hạn mong muốn *",
    timelineOptions: ["Làm gấp (< 1 tuần)", "Tiêu chuẩn (2–4 tuần)", "Thoải mái / Dài hạn"],
    
    referenceLinks: "Đường dẫn tham chiếu (Tham khảo)",
    referenceLinksPlaceholder: "Ví dụ: Đường dẫn YouTube, Vimeo có màu sắc hoặc nhịp dựng bạn muốn tham khảo...",
    
    projectDescription: "Mô tả ngắn gọn về dự án *",
    projectDescriptionPlaceholder: "Chia sẻ ngắn gọn bức tranh cốt lõi hoặc câu chuyện của bạn (chỉ cần 1-2 câu)...",
    
    btnSubmit: "Gửi Yêu Cầu Liên Hệ",
    btnSubmitting: "Đang truyền tải dữ liệu...",
    requiredAlert: "Vui lòng cung cấp đầy đủ thông tin bắt buộc (*) để chúng ta có thể kết nối.",
    generalError: "Gặp sự cố kết nối. Thông tin của bạn đã được sao lưu an toàn ngay tại bộ nhớ thiết bị.",
    
    // Success States
    successHeading: "Đã Nhận Thông Tin",
    successSub: "Ý ĐỒ ĐÃ ĐƯỢC CHUYỂN ĐẾN.",
    successP1: "Cảm ơn bạn đã chia sẻ định hướng. Không có kịch bản tự động hay email mẫu thông thường—Duygital sẽ trực tiếp đánh giá và phản hồi với sự trân trọng.",
    successP2: "Số điện thoại hoặc Email bạn cung cấp sẽ nhận được thông tin phản hồi từ tôi trong vòng 24–48 giờ.",
    btnAnother: "GỬI THÊM YÊU CẦU MỚI",
    
    sheetsSynced: "Trang tính Google Sheets đã được cập nhật thành công.",
    sheetsNotSynced: "Đã lưu nội bộ. Đồng bộ hóa trực tuyến chưa được kích hoạt.",
  }
};

export default function Contact({ language }: ContactProps) {
  const t = DICT[language];

  const isThankYouPage = typeof window !== "undefined" && 
    (window.location.pathname.includes("/cam-on") || window.location.pathname.includes("/thank-you"));

  // Form states matching sheet expectations
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contactMethod: "", // Zalo WhatsApp
    clientType: language === "vi" ? "Brand / Nhãn hàng" : "Brand / Company",
    projectType: "",
    estimatedQuantity: "", // Amount
    budget: "",            // Budget
    mainPlatform: "YouTube",
    expectedTimeline: "Standard (2–4 weeks)",
    referenceLinks: "",
    projectDescription: ""
  });

  // Keep clientType selected option synced when toggling languages
  React.useEffect(() => {
    setForm(prev => {
      if (prev.clientType === "Brand / Company" && language === "vi") {
        return { ...prev, clientType: "Brand / Nhãn hàng" };
      }
      if (prev.clientType === "Brand / Nhãn hàng" && language === "en") {
        return { ...prev, clientType: "Brand / Company" };
      }
      return prev;
    });
  }, [language]);

  // Sync success state reactively with URL pathname (for navigation, bookmarks or fast transitions)
  React.useEffect(() => {
    setSuccess(isThankYouPage);
  }, [isThankYouPage]);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(isThankYouPage);
  const [errorMsg, setErrorMsg] = useState("");
  const [googleSheetsStatus, setGoogleSheetsStatus] = useState<{ synced: boolean; error: string | null } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectValue = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate main required fields
    if (!form.fullName || !form.email || !form.clientType || !form.projectType || !form.estimatedQuantity || !form.mainPlatform || !form.expectedTimeline || !form.projectDescription) {
      setErrorMsg(t.requiredAlert);
      return;
    }

    setSubmitting(true);

    try {
      // Helper to format timestamp to UTC+7 Ho Chi Minh (Hanoi) Standard Time
      const getHanoiTimeString = (date = new Date()) => {
        try {
          return new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Ho_Chi_Minh",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
          }).format(date).replace(",", "");
        } catch (error) {
          const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
          const vnDate = new Date(utc + (3600000 * 7));
          return vnDate.toLocaleString("vi-VN");
        }
      };

      // Append data into the "leads" tab structure
      const payload = {
        ...form,
        submittedAt: getHanoiTimeString(),
        appsScriptUrl: localStorage.getItem("duygital_apps_script_url") || ""
      };

      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setSuccess(true);
        setGoogleSheetsStatus({
          synced: data.googleSheetsSynced,
          error: data.sheetError
        });

        // Trigger dynamic slug routing redirect for Thank You page
        if (typeof window !== "undefined") {
          const targetSlug = language === "vi" ? "/cam-on" : "/thank-you";
          window.history.pushState(null, "", targetSlug);
        }

        // Local storage backup
        const localBackups = localStorage.getItem("duygital_leads")
          ? JSON.parse(localStorage.getItem("duygital_leads")!)
          : [];
        localBackups.push({ ...payload, id: data.record?.id });
        localStorage.setItem("duygital_leads", JSON.stringify(localBackups));
      } else {
        throw new Error(data.message || "Failed server transmission");
      }
    } catch (err: any) {
      console.error("Submissions failure:", err);
      // Resilience fallback setup
      setSuccess(true);
      setGoogleSheetsStatus({
        synced: false,
        error: "Server offline fallback"
      });

      // Trigger dynamic slug routing redirect for Thank You page even in fallback mode
      if (typeof window !== "undefined") {
        const targetSlug = language === "vi" ? "/cam-on" : "/thank-you";
        window.history.pushState(null, "", targetSlug);
      }

      const localBackups = localStorage.getItem("duygital_leads")
        ? JSON.parse(localStorage.getItem("duygital_leads")!)
        : [];
      localBackups.push({ ...form, id: "sub_local_" + Date.now().toString(36), submittedAt: new Date().toISOString() });
      localStorage.setItem("duygital_leads", JSON.stringify(localBackups));
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      fullName: "",
      email: "",
      contactMethod: "",
      clientType: language === "vi" ? "Brand / Nhãn hàng" : "Brand / Company",
      projectType: "",
      estimatedQuantity: "",
      budget: "",
      mainPlatform: "YouTube",
      expectedTimeline: "Standard (2–4 weeks)",
      referenceLinks: "",
      projectDescription: ""
    });
    setSuccess(false);
    setGoogleSheetsStatus(null);
    setErrorMsg("");

    // Reset path back to normal form contact
    if (typeof window !== "undefined") {
      const targetSlug = language === "vi" ? "/lien-he" : "/contact";
      window.history.pushState(null, "", targetSlug);
    }
  };

  return (
    <section className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto z-20 text-left">
      {/* Visual background ambient details */}
      <div className="absolute top-10 right-0 w-72 h-72 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-motion/5 rounded-full blur-3xl pointer-events-none" />

      {/* Title Header */}
      <div className="border-b border-paper/10 pb-8 mb-12 relative">
        <span className="font-mono text-xs text-brand tracking-[0.24em] block mb-2 font-black uppercase">
          CHAPTER VIII // {t.heroTag}
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-light italic text-paper uppercase leading-tight tracking-normal mb-4">
          {t.heroTitle}
        </h2>
        <p className="font-sans text-base text-paper/80 max-w-3xl leading-relaxed font-light mt-4">
          {t.heroSubtitle}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form
            key="contact-intake-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            onSubmit={handleSubmit}
            className="space-y-12 relative"
            id="creative-alignment-form"
          >
            {/* Display validation issues nicely */}
            {errorMsg && (
              <div className="bg-brand/5 border-2 border-brand p-5 rounded-md flex items-start gap-3.5 text-brand animate-shake text-sm font-semibold" id="form-validation-warning">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Part 1: Primary Identity Details */}
            <div className="space-y-6">
              <h3 className="font-mono text-[10px] tracking-[0.24em] text-brand uppercase font-black border-b border-paper/10 pb-2">
                01. Core Identity & Contact
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Full name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={form.fullName}
                    onChange={handleInputChange}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full h-[56px] bg-paper/[0.02] border border-paper/15 focus:border-brand/60 focus:bg-brand/[0.01] px-4 py-3.5 text-base text-paper focus:outline-none transition-all placeholder:text-paper/20 rounded-none font-sans"
                  />
                </div>

                {/* Email address */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                    {t.emailAddr}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder={t.emailAddrPlaceholder}
                    className="w-full h-[56px] bg-paper/[0.02] border border-paper/15 focus:border-brand/60 focus:bg-brand/[0.01] px-4 py-3.5 text-base text-paper focus:outline-none transition-all placeholder:text-paper/20 rounded-none font-sans"
                  />
                </div>

                {/* Zalo or WhatsApp contact method */}
                <div className="space-y-2">
                  <label htmlFor="contactMethod" className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                    {t.zaloWhatsApp}
                  </label>
                  <input
                    type="text"
                    id="contactMethod"
                    name="contactMethod"
                    value={form.contactMethod}
                    onChange={handleInputChange}
                    placeholder={t.zaloWhatsAppPlaceholder}
                    className="w-full h-[56px] bg-paper/[0.02] border border-paper/15 focus:border-brand/60 focus:bg-brand/[0.01] px-4 py-3.5 text-base text-paper focus:outline-none transition-all placeholder:text-paper/20 rounded-none font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Part 2: Persona and Scope */}
            <div className="space-y-6 pt-4">
              <h3 className="font-mono text-[10px] tracking-[0.24em] text-brand uppercase font-black border-b border-paper/10 pb-2">
                02. Segment & Direct Scope
              </h3>

              {/* Client type label selector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                  {t.clientType}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {t.clientTypeOptions.map((opt) => {
                    const isSelected = form.clientType === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectValue("clientType", opt)}
                        className={`w-full h-[56px] flex items-center justify-center text-center px-2.5 border text-[10px] md:text-xs font-mono tracking-[0.15em] transition-all rounded-none font-semibold uppercase cursor-pointer ${
                          isSelected
                            ? "bg-brand border-brand text-paper"
                            : "bg-transparent border-paper/15 text-paper/70 hover:border-paper/40 hover:text-paper"
                        }`}
                      >
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project type & Estimated quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <label htmlFor="projectType" className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                    {t.projectType}
                  </label>
                  <input
                    type="text"
                    id="projectType"
                    name="projectType"
                    required
                    value={form.projectType}
                    onChange={handleInputChange}
                    placeholder={t.projectTypePlaceholder}
                    className="w-full h-[56px] bg-paper/[0.02] border border-paper/15 focus:border-brand/60 focus:bg-brand/[0.01] px-4 py-3.5 text-base text-paper focus:outline-none transition-all placeholder:text-paper/20 rounded-none font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="estimatedQuantity" className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                    {t.estimatedQuantity}
                  </label>
                  <input
                    type="text"
                    id="estimatedQuantity"
                    name="estimatedQuantity"
                    required
                    value={form.estimatedQuantity}
                    onChange={handleInputChange}
                    placeholder={t.estimatedQuantityPlaceholder}
                    className="w-full h-[56px] bg-paper/[0.02] border border-paper/15 focus:border-brand/60 focus:bg-brand/[0.01] px-4 py-3.5 text-base text-paper focus:outline-none transition-all placeholder:text-paper/20 rounded-none font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Part 3: Scope & Platform */}
            <div className="space-y-6 pt-4">
              <h3 className="font-mono text-[10px] tracking-[0.24em] text-brand uppercase font-black border-b border-paper/10 pb-2">
                03. Platform & Target Horizon
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main platform */}
                <div className="space-y-2">
                  <label htmlFor="mainPlatform" className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                    {t.mainPlatform}
                  </label>
                  <select
                    id="mainPlatform"
                    value={form.mainPlatform}
                    onChange={(e) => handleSelectValue("mainPlatform", e.target.value)}
                    className="w-full h-[56px] bg-paper/[0.02] border border-paper/15 focus:border-brand/60 px-4 py-3.5 text-base text-paper id-select-main-platform focus:outline-none rounded-none font-sans cursor-pointer transition-all"
                  >
                    {t.platformOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0A0314] text-paper">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Expected timeline */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                    {t.expectedTimeline}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {t.timelineOptions.map((opt) => {
                      const isSelected = form.expectedTimeline === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectValue("expectedTimeline", opt)}
                          className={`w-full h-[56px] flex items-center justify-center text-center px-1 border text-[10px] md:text-xs font-mono tracking-[0.15em] transition-all rounded-none font-semibold uppercase cursor-pointer ${
                            isSelected
                              ? "bg-brand border-brand text-paper"
                              : "bg-transparent border-paper/15 text-paper/70 hover:border-paper/40 hover:text-paper"
                          }`}
                        >
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Budget and Aesthetic reference links side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Budget */}
                <div className="space-y-2">
                  <label htmlFor="budget" className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                    {t.budgetLabel}
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleInputChange}
                    placeholder={t.budgetPlaceholder}
                    className="w-full h-[56px] bg-paper/[0.02] border border-paper/15 focus:border-brand/60 focus:bg-brand/[0.01] px-4 py-3.5 text-base text-paper focus:outline-none transition-all placeholder:text-paper/20 rounded-none font-sans"
                  />
                </div>

                {/* Reference links */}
                <div className="space-y-2">
                  <label htmlFor="referenceLinks" className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                    {t.referenceLinks}
                  </label>
                  <input
                    type="text"
                    id="referenceLinks"
                    name="referenceLinks"
                    value={form.referenceLinks}
                    onChange={handleInputChange}
                    placeholder={t.referenceLinksPlaceholder}
                    className="w-full h-[56px] bg-paper/[0.02] border border-paper/15 focus:border-brand/60 focus:bg-brand/[0.01] px-4 py-3.5 text-base text-paper focus:outline-none transition-all placeholder:text-paper/20 rounded-none font-sans"
                  />
                </div>
              </div>

              {/* Short project description */}
              <div className="space-y-2">
                <label htmlFor="projectDescription" className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                  {t.projectDescription}
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  required
                  rows={3}
                  value={form.projectDescription}
                  onChange={handleInputChange}
                  placeholder={t.projectDescriptionPlaceholder}
                  className="w-full bg-paper/[0.02] border border-paper/15 focus:border-brand/60 p-4 text-base text-paper focus:outline-none transition-all placeholder:text-paper/25 rounded-none font-sans leading-relaxed"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 pb-12">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand hover:bg-[#FF5A00] text-paper text-xs font-mono uppercase tracking-[0.22em] py-4.5 px-6 font-black flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer rounded-none shadow-lg"
              >
                <span>{submitting ? t.btnSubmitting : t.btnSubmit}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-left space-y-8 py-6"
            id="creative-aligned-success"
          >
            {/* Elegant Success Badge */}
            <div className="inline-flex items-center gap-2 bg-brand/5 border border-brand px-4 py-2 text-brand font-mono text-[10px] font-black tracking-[0.24em] uppercase rounded-none">
              <Check className="w-4 h-4 stroke-[3px]" />
              <span>{t.successHeading}</span>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-2xl md:text-4xl font-light italic tracking-normal text-paper uppercase">
                {t.successSub}
              </h3>
              <p className="font-sans text-sm md:text-base text-paper/80 leading-relaxed max-w-2xl font-light">
                {t.successP1}
              </p>
              <p className="font-sans text-sm md:text-base text-paper/85 font-light leading-relaxed max-w-2xl">
                {t.successP2}
              </p>
            </div>

            {/* Sync status warning */}
            {googleSheetsStatus && (
              <div className="text-[10px] font-mono uppercase text-[#F5F5F0]/40 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${googleSheetsStatus.synced ? "bg-emerald-500" : "bg-brand animate-pulse"}`} />
                <span>
                  {googleSheetsStatus.synced ? t.sheetsSynced : t.sheetsNotSynced}
                </span>
              </div>
            )}

            {/* Reset button to let them submit again */}
            <div className="pt-6 flex gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="bg-transparent border border-paper/15 text-paper text-[10px] font-mono uppercase tracking-[0.22em] py-3.5 px-6 font-black hover:border-paper hover:bg-paper/5 transition-all cursor-pointer rounded-none"
              >
                {t.btnAnother}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
