import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, AlertCircle, FileText, Sparkles, MessageSquare, Info } from "lucide-react";

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
    zaloWhatsApp: "Zalo / WhatsApp (Optional)",
    zaloWhatsAppPlaceholder: "e.g. +84 901 234 567",
    
    clientType: "What best describes you? *",
    clientTypeOptions: ["Brand / Company", "Agency Partner", "Independent Creator", "Other / Individual"],
    
    projectType: "Project type *",
    projectTypePlaceholder: "e.g., Documentary, Film, Editorial Commercial, Music Video...",
    
    estimatedQuantity: "Estimated video quantity *",
    quantityOptions: ["Single Video", "Series (3–5 videos)", "Ongoing / Retainer", "Unspecified / Custom"],
    
    mainPlatform: "Core distribution platform *",
    platformOptions: ["YouTube", "Vimeo", "TikTok / Reels", "Offsite / Exhibitions", "Film Festivals", "Other"],
    
    expectedTimeline: "Expected timeline *",
    timelineOptions: ["Rush (< 1 week)", "Standard (2–4 weeks)", "Flexible / Long-term"],
    
    referenceLinks: "Aesthetic reference links (Optional)",
    referenceLinksPlaceholder: "Links to Vimeo, YouTube, or portfolios with editing styles you like...",
    
    projectDescription: "Short project description *",
    projectDescriptionPlaceholder: "A brief summary of what we are building together (1-2 sentences is perfect)...",
    
    followUpPref: "Follow-up workflow preference",
    followUpLabel: "Would you like to complete our comprehensive creative direction workflow form later?",
    followUpOptions: {
      yes: "Yes, email me the deep creative form once my initial contact is qualified.",
      no: "No, let's start with a casual 15-minute alignment call."
    },
    
    btnSubmit: "Submit Creative Alignment",
    btnSubmitting: "Transmitting Inquiry...",
    requiredAlert: "Please fill in all required fields (*) so we can connect.",
    generalError: "A transmission glitch occurred. Rest assured, your message is saved on your local device repository.",
    
    // Success States
    successHeading: "Inquiry Stored",
    successSub: "THE INTENT IS DIRECTLY FILED.",
    successP1: "Thank you for sharing your vision. No automated scripts or generic templates here—Duygital personally reviews every submission with genuine care.",
    successP2: "We will reach out within 24–48 hours via Email or Zalo/WhatsApp. Keep an eye on your inbox.",
    successFollowUpYes: "As requested, we will also package and send our comprehensive Creative Direction Workbook to your email.",
    successFollowUpNo: "As selected, we will prepare a short 15-minute alignment call structure to map things out.",
    btnAnother: "START ANOTHER FORM",
    
    sheetsSynced: "Google Sheets ledger synchronized.",
    sheetsNotSynced: "Saved locally. Sheets integration was not reached.",
    technicalGuideTitle: "Apps Script Integration Guide",
    technicalGuideDesc: "To sync these submissions straight to your designated 'leads' Google Sheet tab, deploy the script below in your Google Sheet's 'Extensions > Apps Script' editor.",
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
    zaloWhatsApp: "Số liên hệ Zalo / WhatsApp (Không bắt buộc)",
    zaloWhatsAppPlaceholder: "Ví dụ: +84 901 234 567",
    
    clientType: "Bạn đại diện cho nhóm nào? *",
    clientTypeOptions: ["Thương hiệu / Nhãn hàng", "Agency đối tác", "Nhà sáng tạo độc lập", "Khác / Cá nhân"],
    
    projectType: "Thể loại dự án *",
    projectTypePlaceholder: "Ví dụ: Phim tài liệu, Nghệ thuật/Thời trang, Commercial, Music Video...",
    
    estimatedQuantity: "Số lượng video ước tính *",
    quantityOptions: ["Một video duy nhất", "Chuỗi video (3–5 video)", "Không giới hạn / Định kỳ", "Chưa xác định / Khác"],
    
    mainPlatform: "Nền tảng phát phát chính *",
    platformOptions: ["YouTube", "Vimeo", "TikTok / Video dọc", "Exhibitions ngoại tuyến", "Liên hoan phim", "Khác"],
    
    expectedTimeline: "Thời hạn mong muốn *",
    timelineOptions: ["Làm gấp (< 1 tuần)", "Tiêu chuẩn (2–4 tuần)", "Thoải mái / Dài hạn"],
    
    referenceLinks: "Đường dẫn tham chiếu (Tham khảo - Không bắt buộc)",
    referenceLinksPlaceholder: "Ví dụ: Đường dẫn YouTube, Vimeo có màu sắc hoặc nhịp dựng bạn muốn tham khảo...",
    
    projectDescription: "Mô tả ngắn gọn về dự án *",
    projectDescriptionPlaceholder: "Chia sẻ ngắn gọn bức tranh cốt lõi hoặc câu chuyện của bạn (chỉ cần 1-2 câu ngắn gọn)...",
    
    followUpPref: "Cách thức tiến hành tiếp theo",
    followUpLabel: "Bạn có muốn nhận biểu mẫu định hướng sáng tạo chi tiết sau cuộc gọi đầu tiên không?",
    followUpOptions: {
      yes: "Có, hãy gửi cho tôi biểu mẫu chi tiết qua email sau khi được kích hoạt.",
      no: "Không, chúng ta hãy thảo luận nhanh qua cuộc gọi 15 phút đầu tiên."
    },
    
    btnSubmit: "Gửi Yêu Cầu Liên Hệ",
    btnSubmitting: "Đang truyền tải dữ liệu...",
    requiredAlert: "Vui lòng cung cấp đầy đủ thông tin bắt buộc (*) để chúng ta có thể kết nối.",
    generalError: "Gặp sự cố kết nối. Thông tin của bạn đã được sao lưu an toàn ngay tại bộ nhớ thiết bị.",
    
    // Success States
    successHeading: "Đã Nhận Thông Tin",
    successSub: "Ý ĐỒ ĐÃ ĐƯỢC CHUYỂN ĐẾN.",
    successP1: "Cảm ơn bạn đã chia sẻ định hướng. Không có kịch bản tự động hay email mẫu thông thường—Duygital sẽ trực tiếp đánh giá và phản hồi với sự trân trọng.",
    successP2: "Số điện thoại hoặc Email bạn cung cấp sẽ nhận được thông tin phản hồi từ tôi trong vòng 24–48 giờ.",
    successFollowUpYes: "Theo yêu cầu, một cuốn sổ tay định hướng sáng tạo chi tiết (Creative Direction Workbook) sẽ được chuyển đến email của bạn.",
    successFollowUpNo: "Chúng ta sẽ trao đổi trực tiếp qua một buổi nói chuyện nhanh 15 phút.",
    btnAnother: "GỬI THÊM YÊU CẦU MỚI",
    
    sheetsSynced: "Trang tính Google Sheets đã được cập nhật thành công.",
    sheetsNotSynced: "Đã lưu nội bộ. Đồng bộ hóa trực tuyến chưa được kích hoạt.",
    technicalGuideTitle: "Hướng Dẫn Cấu Hình Google Sheets",
    technicalGuideDesc: "Để tự động cập nhật biểu mẫu này vào thẻ 'leads' trên Google Sheet của bạn, hãy cấu hình Apps Script bên dưới bằng trình chỉnh sửa trong 'Extensions > Apps Script'.",
  }
};

export default function Contact({ language }: ContactProps) {
  const t = DICT[language];

  // Complete, high-priority state redesign for 10 simple fields
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contactMethod: "", // Zalo or WhatsApp
    clientType: "Brand / Company",
    projectType: "",
    estimatedQuantity: "Single Video",
    mainPlatform: "YouTube",
    expectedTimeline: "Standard (2–4 weeks)",
    referenceLinks: "",
    projectDescription: "",
    sendFollowUpWorkflow: "yes" // "yes" or "no"
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
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
      // Append data into the "leads" tab structure
      const payload = {
        ...form,
        submittedAt: new Date().toISOString(),
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
      // Resilience flow
      setSuccess(true);
      setGoogleSheetsStatus({
        synced: false,
        error: "Server offline fallback"
      });

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
      clientType: "Brand / Company",
      projectType: "",
      estimatedQuantity: "Single Video",
      mainPlatform: "YouTube",
      expectedTimeline: "Standard (2–4 weeks)",
      referenceLinks: "",
      projectDescription: "",
      sendFollowUpWorkflow: "yes"
    });
    setSuccess(false);
    setGoogleSheetsStatus(null);
    setErrorMsg("");
  };

  const appsScriptTemplate = `// Google Apps Script source code
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    // Try to write specifically into the "leads" tab per the portfolio schema
    var sheet = ss.getSheetByName("leads");
    if (!sheet) {
      sheet = ss.insertSheet("leads");
      sheet.appendRow([
        "Received At", "ID", "Full Name", "Email", "Zalo / WhatsApp",
        "Client Type", "Project Type", "Quantity", "Main Platform",
        "Expected Timeline", "Reference Links", "Project Description", "Send Workbook Later?"
      ]);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(data.receivedAt || Date.now()),
      data.id || "",
      data.fullName || "",
      data.email || "",
      data.contactMethod || "",
      data.clientType || "",
      data.projectType || "",
      data.estimatedQuantity || "",
      data.mainPlatform || "",
      data.expectedTimeline || "",
      data.referenceLinks || "",
      data.projectDescription || "",
      data.sendFollowUpWorkflow || "yes"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "success", 
      "message": "Entry written to 'leads' tab successfully." 
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "error", 
      "message": error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`;

  return (
    <section className="relative min-h-screen py-20 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto z-20 text-left bg-bg text-paper font-sans">
      
      {/* Editorial Lead Section Title */}
      <div className="border-b-2 border-paper/10 pb-8 mb-12">
        <span className="font-mono text-xs text-brand tracking-[0.3em] block mb-2 font-bold uppercase">
          {t.heroTag}
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-medium text-paper leading-tight tracking-tight mb-3">
          {t.heroTitle}
        </h2>
        <p className="font-sans text-xs md:text-sm text-paper/70 max-w-2xl leading-relaxed">
          {t.heroSubtitle}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-10"
            id="creative-redesigned-intake"
          >
            {errorMsg && (
              <div className="bg-brand/10 border-2 border-brand p-4 flex items-center gap-3 text-brand font-mono text-xs font-bold">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Part 1: Who you are */}
            <div className="space-y-6">
              <h3 className="font-mono text-[10px] tracking-widest text-brand uppercase font-bold border-b border-paper/10 pb-2">
                01. Personal Coordinates
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="w-full bg-paper/5 border-2 border-paper/15 focus:border-brand px-4 py-3.5 text-base text-paper focus:outline-none transition-all placeholder:text-paper/20 rounded-md font-sans"
                  />
                </div>

                {/* Email */}
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
                    className="w-full bg-paper/5 border-2 border-paper/15 focus:border-brand px-4 py-3.5 text-base text-paper focus:outline-none transition-all placeholder:text-paper/20 rounded-md font-sans"
                  />
                </div>
              </div>

              {/* Zalo / Whatsapp */}
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
                  className="w-full bg-paper/5 border-2 border-paper/15 focus:border-brand px-4 py-3.5 text-base text-paper focus:outline-none transition-all placeholder:text-paper/20 rounded-md font-sans"
                />
              </div>
            </div>

            {/* Part 2: What you represent */}
            <div className="space-y-6 pt-4">
              <h3 className="font-mono text-[10px] tracking-widest text-brand uppercase font-bold border-b border-paper/10 pb-2">
                02. Venture Context
              </h3>

              {/* Client type (Large Buttons) */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                  {t.clientType}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {t.clientTypeOptions.map((opt) => {
                    const isSelected = form.clientType === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectValue("clientType", opt)}
                        className={`px-4 py-3 border-2 text-xs font-mono uppercase tracking-wider text-center transition-all cursor-pointer rounded-md font-bold ${
                          isSelected
                            ? "bg-brand border-brand text-paper shadow-md"
                            : "bg-transparent border-paper/10 text-paper/70 hover:border-paper/30"
                        }`}
                      >
                        {opt}
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
                    className="w-full bg-paper/5 border-2 border-paper/15 focus:border-brand px-4 py-3.5 text-base text-paper focus:outline-none transition-all placeholder:text-paper/20 rounded-md font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <span className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                    {t.estimatedQuantity}
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    <select
                      value={form.estimatedQuantity}
                      onChange={(e) => handleSelectValue("estimatedQuantity", e.target.value)}
                      className="w-full bg-[#1c082a] border-2 border-paper/15 focus:border-brand px-4 py-3.5 text-sm text-paper focus:outline-none rounded-md font-sans"
                    >
                      {t.quantityOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#230C33] text-paper">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Part 3: Scope & Platform */}
            <div className="space-y-6 pt-4">
              <h3 className="font-mono text-[10px] tracking-widest text-brand uppercase font-bold border-b border-paper/10 pb-2">
                03. Platform & Target Horizon
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main platform */}
                <div className="space-y-3">
                  <span className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                    {t.mainPlatform}
                  </span>
                  <select
                    value={form.mainPlatform}
                    onChange={(e) => handleSelectValue("mainPlatform", e.target.value)}
                    className="w-full bg-[#1c082a] border-2 border-paper/15 focus:border-brand px-4 py-3.5 text-sm text-paper id-select-main-platform focus:outline-none rounded-md font-sans"
                  >
                    {t.platformOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#230C33] text-paper">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Expected timeline */}
                <div className="space-y-3">
                  <span className="block text-xs font-mono uppercase tracking-wider text-paper/85 font-medium">
                    {t.expectedTimeline}
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {t.timelineOptions.map((opt) => {
                      const isSelected = form.expectedTimeline === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectValue("expectedTimeline", opt)}
                          className={`w-full text-left px-4 py-2.5 border-2 text-xs font-mono tracking-wide transition-all rounded-md font-bold uppercase ${
                            isSelected
                              ? "bg-brand border-brand text-paper"
                              : "bg-transparent border-paper/10 text-paper/70 hover:border-paper/30"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Reference links */}
              <div className="space-y-2 pt-2">
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
                  className="w-full bg-paper/5 border-2 border-paper/15 focus:border-brand px-4 py-3.5 text-sm text-paper focus:outline-none transition-all placeholder:text-paper/20 rounded-md font-sans"
                />
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
                  className="w-full bg-paper/5 border-2 border-paper/15 focus:border-brand p-4 text-base text-paper focus:outline-none transition-all placeholder:text-paper/25 rounded-md font-sans leading-relaxed"
                />
              </div>
            </div>

            {/* Part 4: Next steps/Follow-up workflow form option */}
            <div className="bg-brand/5 border-2 border-brand/25 p-6 rounded-md space-y-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="block text-xs font-mono text-brand uppercase tracking-widest font-bold">
                    {t.followUpPref}
                  </span>
                  <p className="font-serif italic text-base text-paper/90 font-medium">
                    {t.followUpLabel}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1.5">
                {[
                  { key: "yes", label: t.followUpOptions.yes },
                  { key: "no", label: t.followUpOptions.no }
                ].map((item) => {
                  const isSelected = form.sendFollowUpWorkflow === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleSelectValue("sendFollowUpWorkflow", item.key)}
                      className={`text-left p-3.5 border-2 text-xs transition-all flex items-start justify-between rounded-md ${
                        isSelected
                          ? "bg-[#1E082A] border-brand text-brand font-bold"
                          : "bg-transparent border-paper/10 text-paper/80 hover:border-paper/20 hover:text-paper"
                      }`}
                    >
                      <span className="pr-4 leading-normal font-sans">{item.label}</span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${isSelected ? "border-brand bg-brand" : "border-paper/30"}`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-paper" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 pb-12">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand hover:bg-[#FF5A00] text-paper text-sm text-[12px] font-mono uppercase tracking-[0.2em] py-4.5 px-6 font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer rounded-md shadow-lg"
              >
                <span>{submitting ? t.btnSubmitting : t.btnSubmit}</span>
                <ArrowRight className="w-4 h-4 font-bold" />
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
            <div className="inline-flex items-center gap-2 bg-brand/10 border-2 border-brand px-4 py-2 text-brand font-mono text-[10px] font-semibold tracking-widest uppercase">
              <Check className="w-4 h-4 stroke-[3px]" />
              <span>{t.successHeading}</span>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-tight text-paper">
                {t.successSub}
              </h3>
              <p className="font-sans text-sm md:text-base text-paper/80 leading-relaxed max-w-2xl">
                {t.successP1}
              </p>
              <p className="font-sans text-sm md:text-base text-paper/85 font-medium leading-relaxed max-w-2xl">
                {t.successP2}
              </p>
            </div>

            {/* Dynamic visual feedback regarding workflow preference */}
            <div className="bg-paper/5 border-l-4 border-brand p-5 max-w-2xl rounded-r-md">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <p className="font-serif italic text-base text-paper/90 leading-relaxed">
                  {form.sendFollowUpWorkflow === "yes" 
                    ? t.successFollowUpYes 
                    : t.successFollowUpNo}
                </p>
              </div>
            </div>

            {/* Sync status warning */}
            {googleSheetsStatus && (
              <div className="text-[10px] font-mono uppercase text-paper/40 flex items-center gap-2">
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
                className="bg-transparent border-2 border-paper/15 text-paper text-[11px] font-mono uppercase tracking-[0.25em] py-3.5 px-6 font-bold hover:border-paper hover:bg-paper/5 transition-all cursor-pointer rounded-md"
              >
                {t.btnAnother}
              </button>
            </div>

            {/* Hidden practical documentation on how to configure Apps Script leads webhook */}
            <div className="border-t border-paper/10 pt-8 mt-12 max-w-2xl">
              <details className="group cursor-pointer">
                <summary className="font-mono text-[10px] tracking-widest text-brand uppercase font-bold flex items-center justify-between hover:text-paper list-none">
                  <span>{t.technicalGuideTitle}</span>
                  <span className="text-paper/40 group-open:rotate-180 transition-transform font-bold">&darr;</span>
                </summary>
                <div className="mt-4 space-y-4 text-xs font-sans text-paper/60 leading-relaxed cursor-default">
                  <p>{t.technicalGuideDesc}</p>
                  <pre className="p-4 bg-paper/5 border border-paper/15 rounded-md overflow-x-auto text-[10px] font-mono text-paper/80 leading-normal select-all">
                    {appsScriptTemplate}
                  </pre>
                </div>
              </details>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
