import { motion } from "motion/react";
import { CornerRightDown } from "lucide-react";
import { translations } from "../translations";
import { WorkflowStep } from "../types";

interface ThinkingProps {
  language: "en" | "vi";
  workflow?: WorkflowStep[];
}

const DEFAULT_WORKFLOW: Record<"en" | "vi", WorkflowStep[]> = {
  vi: [
    {
      stepNumber: "01",
      title: "Gửi brief / yêu cầu dựng video",
      description: "Khách hàng gửi brief/yêu cầu dựng video (+ kịch bản - script nếu có).",
      duration: "Ngày 1",
      deliverable: "Yêu cầu sáng tạo"
    },
    {
      stepNumber: "02",
      title: "Báo giá và lập tiến trình",
      description: "Duy gửi báo giá chi tiết cùng timeline dự kiến của các cột mốc.",
      duration: "Ngày 1-2",
      deliverable: "Bản định giá & Kế hoạch bàn giao"
    },
    {
      stepNumber: "03",
      title: "Ký kết và Kích hoạt Dự án",
      description: "Sau khi thống nhất các điều khoản, Khách hàng cọc 50% để dự án chính thức bắt đầu thực hiện.",
      duration: "Ngày 2",
      deliverable: "Khởi động dự án"
    },
    {
      stepNumber: "04",
      title: "Bản nháp Draft 1",
      description: "Duy gửi bản draft nháp lần 1 để duyệt về: Nội dung, Bố cục tổng thể và nhịp điệu video.",
      duration: "Ngày 3-5",
      deliverable: "Video Draft 01"
    },
    {
      stepNumber: "05",
      title: "Biên tập Hoàn thiện",
      description: "Sau khi thống nhất ý tưởng / direction: Duy tiến hành edit sâu và hoàn thiện các hiệu ứng âm học.",
      duration: "Ngày 5-7",
      deliverable: "Fine Cut Video"
    },
    {
      stepNumber: "06",
      title: "Phản hồi cuối",
      description: "Duy gửi bản draft hoàn chỉnh cuối để Khách hàng đóng góp feedback tối ưu hóa.",
      duration: "Ngày 7-8",
      deliverable: "Bản chỉnh sửa cuối"
    },
    {
      stepNumber: "07",
      title: "Hoàn tất & Bàn giao",
      description: "Khách hàng tất toán 50% còn lại của hợp đồng, Duy chính thức bàn giao file Final gốc chất lượng cao nhất.",
      duration: "Ngày 8",
      deliverable: "File Master Final (.mp4)"
    }
  ],
  en: [
    {
      stepNumber: "01",
      title: "Submit Brief",
      description: "Client submits brief / video requirements (+ script if available).",
      duration: "Day 1",
      deliverable: "Creative Brief Intake"
    },
    {
      stepNumber: "02",
      title: "Custom Quote & Timeline Estimation",
      description: "Duy sends a custom pricing breakdown and estimated production timeline.",
      duration: "Day 1-2",
      deliverable: "Pricing Proposal & Delivery Schedule"
    },
    {
      stepNumber: "03",
      title: "Commitment & Onboarding",
      description: "Upon formal terms agreement, client settles 50% reservation deposit to secure timeline positioning.",
      duration: "Day 2",
      deliverable: "Project Onboarding"
    },
    {
      stepNumber: "04",
      title: "Initial Draft Assembly",
      description: "Duy delivers Draft 1 for milestone feedback regarding pacing, structure, and narrative.",
      duration: "Day 3-5",
      deliverable: "Review Draft 01"
    },
    {
      stepNumber: "05",
      title: "Deep Editing & Sound Polish",
      description: "Once direction is locked, Duy executes main timeline sweeps, color tuning, and ambient sound design.",
      duration: "Day 5-7",
      deliverable: "Fine-Cut Production Video"
    },
    {
      stepNumber: "06",
      title: "Final Revisions",
      description: "Duy structures the near-final draft for microscopic adjustments and review comments.",
      duration: "Day 7-8",
      deliverable: "Final Approved Lock"
    },
    {
      stepNumber: "07",
      title: "Master Deliverables Handoff",
      description: "Client clears the outstanding 50% balance, and Duy transmits native high-fidelity final master files.",
      duration: "Day 8",
      deliverable: "Master Final Export (.mp4)"
    }
  ]
};

export default function Thinking({ language, workflow }: ThinkingProps) {
  const t = translations[language];

  // If a dynamic workflow array exists from the Google Sheet, use it; otherwise fallback to highly polished localized defaults
  const activeSteps = workflow && workflow.length > 0 ? workflow : DEFAULT_WORKFLOW[language];

  return (
    <section className="relative min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto z-20 font-sans" id="thinking-process-section">
      
      {/* Page Title Header Block - Editorial high-contrast design */}
      <div className="border-b border-paper/15 pb-8 mb-20">
        <span className="font-mono text-[10px] text-brand tracking-[0.24em] block mb-3 font-black uppercase">
          {t.thinking.tag}
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-light italic text-[#F5F5F0] uppercase leading-tight tracking-normal">
          {t.thinking.title}
        </h2>
      </div>

      <div className="space-y-24 text-paper">
        
        {/* SECTION 01: WORKFLOW TIMELINE */}
        <div className="border-b border-paper/15 pb-16">
          <div className="mb-12">
            <span className="font-mono text-[10px] text-brand tracking-[0.24em] block mb-2 font-black uppercase">
              SECTION 01
            </span>
            <h3 className="font-serif text-2xl md:text-3.5xl font-light italic text-paper uppercase tracking-normal">
              {language === "vi" ? "QUY TRÌNH PHỐI HỢP DỰNG HÌNH" : "CO-CREATIVE TIMELINE PROCESS"}
            </h3>
            <p className="text-[10px] font-mono text-brand/90 uppercase mt-2 tracking-[0.16em]">
              {language === "vi" 
                ? "Trình tự thực hiện chi tiết từ ý tưởng ban đầu đến sản phẩm hoàn chỉnh"
                : "Post-Production Milestones and Sequential Framework"}
            </p>
          </div>

          {/* Dynamic / Fallback vertical workflow line progression */}
          <div className="relative border-l border-paper/15 pl-6 md:pl-10 ml-2 space-y-12">
            {activeSteps.map((step, idx) => {
              const formattedStepNum = step.stepNumber ? String(step.stepNumber).padStart(2, '0') : `0${idx + 1}`;
              const isAccentStep = idx === 0 || idx === 2 || idx === 6; // Highlight intake, deposit, deliverable steps with custom orange dot

              return (
                <div key={idx} className="relative group hover:transform hover:translate-x-1 transition-all duration-300">
                  {/* Visual marker dot */}
                  <div className={`absolute -left-[31px] md:-left-[47px] top-2 w-2 h-2 bg-bg border ${isAccentStep ? 'border-brand' : 'border-[#F5F5F0]/30'} rounded-none flex items-center justify-center`}>
                    {isAccentStep && <div className="w-1 h-1 bg-brand rounded-none" />}
                  </div>
                  
                  <span className="font-mono text-[10px] text-brand tracking-[0.2em] font-black block mb-1 uppercase">
                    {language === "vi" ? `BƯỚC ${formattedStepNum}` : `STEP ${formattedStepNum}`}
                  </span>
                  
                  <h4 className="font-serif font-light text-lg italic text-[#F5F5F0] uppercase tracking-normal mb-2">
                    {step.title}
                  </h4>
                  
                  <p className="text-sm md:text-base text-paper/80 leading-relaxed font-sans font-light mb-3 max-w-3xl">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap gap-4 items-center mt-2.5">
                    {step.duration && (
                      <span className="font-mono text-[9px] text-[#D9381E] font-black bg-brand/5 border border-[#D9381E]/20 px-2.5 py-0.5 uppercase tracking-[0.16em] rounded-none">
                        {language === "vi" ? `Thời lượng: ${step.duration}` : `Timeline: ${step.duration}`}
                      </span>
                    )}
                    {step.deliverable && (
                      <span className="font-mono text-[9px] text-[#F5F5F0]/50 font-black bg-[#F5F5F0]/[0.01] border border-paper/15 px-2.5 py-0.5 uppercase tracking-[0.16em] rounded-none">
                        {language === "vi" ? `Bàn giao: ${step.deliverable}` : `Deliverable: ${step.deliverable}`}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* POLICY GRID SECTION (Flat style, editorial pacing, clear readable paragraphs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 text-left">
          
          {/* SECTION 02: FEEDBACK TIMING */}
          <div className="border-t border-paper/15 pt-8">
            <span className="font-mono text-[10px] text-brand tracking-[0.24em] block mb-2 font-black uppercase">
              SECTION 02
            </span>
            <h4 className="font-serif font-light text-xl italic text-[#F5F5F0] uppercase mb-4 tracking-normal">
              {language === "vi" ? "QUY ĐỊNH PHẢN HỒI (FEEDBACK)" : "FEEDBACK SWEEPS"}
            </h4>
            <div className="space-y-4 text-sm text-[#F5F5F0]/80 font-light leading-relaxed">
              <p>
                {language === "vi"
                  ? "Duy luôn chờ phản hồi hoàn thiện của Khách hàng trước khi chuyển mốc dựng kế tiếp để bảo đảm thấu hiểu sâu sắc."
                  : "We pause workflow transitions to ensure feedback loop clarity before commencing next timeline tasks."}
              </p>
              <p className="font-semibold text-paper border-l border-[#D9381E] pl-3">
                {language === "vi" ? "Giới hạn thời gian 48 giờ:" : "48-Hour Auto-Proceed Clause:"}
              </p>
              <p>
                {language === "vi"
                  ? "Nếu sau 48 giờ kể từ khi gửi bản nháp Khách hàng không có phản hồi, Duy được phép coi như bản nháp đã mặc định duyệt để bảo toàn nhịp hoạt động chung của dự án."
                  : "If feedback remains silence for consecutive 48 hours, the team proceeds utilizing current draft assumptions to protect general calendar health."}
              </p>
              <p>
                {language === "vi"
                  ? "Các yêu cầu sửa đổi liên quan đến phần đã tự động duyệt sẽ được tính là một lượt sửa đổi phát sinh và có thể tính phụ phí."
                  : "Any structural modifications requested after auto-locks are processed as separate revisions and may influence overall quotation."}
              </p>
            </div>
          </div>

          {/* SECTION 03: REVISIONS LIMITS */}
          <div className="border-t border-paper/15 pt-8">
            <span className="font-mono text-[10px] text-brand tracking-[0.24em] block mb-2 font-black uppercase">
              SECTION 03
            </span>
            <h4 className="font-serif font-light text-xl italic text-[#F5F5F0] uppercase mb-4 tracking-normal">
              {language === "vi" ? "GIỚI HẠN CHỈNH SỬA" : "REVISION GUIDELINES"}
            </h4>
            <div className="space-y-4 text-sm text-[#F5F5F0]/80 font-light leading-relaxed">
              <ul className="pl-5 list-disc space-y-3">
                <li>
                  {language === "vi"
                    ? "Duy hoàn toàn sửa chữa miễn phí không giới hạn lỗi phát sinh từ kỹ thuật cá nhân Duy."
                    : "Complimentary unlimited corrections for technical anomalies originating from the edit desk."}
                </li>
                <li>
                  {language === "vi"
                    ? "Khách hàng có tối đa 3 vòng sửa miễn phí dựa theo Brief ban đầu đã thỏa thuận cấu trúc."
                    : "Client receives 3 complete revision loops bounded strictly within initial brief limits."}
                </li>
              </ul>
              <p className="font-semibold border-l border-[#D9381E] pl-3">
                {language === "vi" ? "Thế nào là một vòng sửa?" : "Definition of 1 Revision Loop:"}
              </p>
              <p>
                {language === "vi"
                  ? "Là một văn bản tổng hợp tất cả điểm cần chỉnh từ phía Khách hàng tại cột mốc đó. Sau 3 vòng sửa tương tác, Duy xin phép phụ thu từ 100.000đ – 200.000đ tùy khối lượng phát sinh."
                  : "One consolidated list of change requests submitted by the client for that specific timeline edit. Subsequent sweeps entail out-of-scope fees starting at 100k - 200k VND."}
              </p>
            </div>
          </div>

          {/* SECTION 04: CANCELLATIONS & PAYMENT */}
          <div className="border-t border-paper/15 pt-8">
            <span className="font-mono text-[10px] text-brand tracking-[0.24em] block mb-2 font-black uppercase">
              SECTION 04
            </span>
            <h4 className="font-serif font-light text-xl italic text-[#F5F5F0] uppercase mb-4 tracking-normal">
              {language === "vi" ? "THANH TOÁN BIÊN KHOẢN" : "PAYMENT POLICIES"}
            </h4>
            <div className="space-y-4 text-sm text-[#F5F5F0]/80 font-light leading-relaxed">
              <p>
                {language === "vi"
                  ? "Khoản cọc 50% ban đầu đóng vai trò giữ lịch bảo đảm cho tài nguyên sáng tạo của Duy và hoàn toàn không hoàn lại khi dự án đã kích hoạt."
                  : "The initial 50% reservation deposit guarantees editing calendar priority and is strictly non-refundable upon project launch."}
              </p>
              <p>
                {language === "vi"
                  ? "Nếu Khách hàng chấm dứt dự án giữa dòng, chi phi sẽ được đối soát và tính toán theo phần trăm công việc Duy đã triển khai thực tế."
                  : "In case of early cancellation, the final settlement is calculated proportionally depending on work completed up to that milestone."}
              </p>
              <p>
                {language === "vi"
                  ? "Trường hợp tiến độ phản hồi ngắt quãng quá 7 ngày liên tiếp từ phía Khách hàng, Duy xin phép tạm khóa dự án để điều phối cho đối tác khác."
                  : "Should reviews halt for longer than 7 consecutive days, projects are temporarily archived list-positions are rescheduled."}
              </p>
            </div>
          </div>

          {/* SECTION 05: SOURCE STORAGE */}
          <div className="border-t border-paper/15 pt-8">
            <span className="font-mono text-[10px] text-brand tracking-[0.24em] block mb-2 font-black uppercase">
              SECTION 05
            </span>
            <h4 className="font-serif font-light text-xl italic text-[#F5F5F0] uppercase mb-4 tracking-normal">
              {language === "vi" ? "LƯU TRỮ VÀ SOURCE FILES" : "PROJECT STORAGE"}
            </h4>
            <div className="space-y-4 text-sm text-[#F5F5F0]/80 font-light leading-relaxed">
              <p>
                {language === "vi"
                  ? "Sản phẩm bàn giao mặc định là video thành phẩm gốc cao nhất (gồm master file .mp4, .mov)."
                  : "Staged handoffs include high-fidelity final master renders as standard master files."}
              </p>
              <p>
                {language === "vi"
                  ? "Nếu Khách hàng có nhu cầu bàn giao toàn bộ source project gốc (Premiere/After Effects), Duy xin phép tính thêm 30% tổng chi phí hợp đồng cho giá trị chất xám sắp xếp hệ thống file."
                  : "Delivery of unedited source material packs or timeline project configuration files involves an additional 30% contract payload fee."}
              </p>
              <p className="font-semibold text-brand">
                {language === "vi"
                  ? "Thời hạn lưu trữ dữ liệu an toàn mặc định là 30 ngày kể từ ngày bàn giao cuối cùng."
                  : "We guarantee safe archive retention of asset staging files for exactly 30 calendar days."}
              </p>
            </div>
          </div>

          {/* SECTION 06: SURPLUS RAW POLICIES */}
          <div className="border-t border-paper/15 pt-8">
            <span className="font-mono text-[10px] text-[#D9381E] tracking-[0.24em] block mb-2 font-black uppercase">
              SECTION 06
            </span>
            <h4 className="font-serif font-light text-xl italic text-[#F5F5F0] uppercase mb-4 tracking-normal">
              {language === "vi" ? "GIỚI HẠN NGUYÊN LIỆU THÔ" : "FOOTAGE PARAMS"}
            </h4>
            <div className="space-y-4 text-sm text-[#F5F5F0]/80 font-light leading-relaxed font-sans">
              <p>
                {language === "vi"
                  ? "Mỗi khung báo giá đều ấn định dung lượng thô phù hợp để bảo vệ chất lượng thời gian xem duyệt và phân loại."
                  : "Quoted positions carry structured bounds of raw footage processing to preserve editor analytical focus."}
              </p>
              <div className="bg-[#F5F5F0]/[0.015] p-5 border border-paper/15 rounded-none">
                <span className="block font-mono text-[10px] text-[#D9381E] font-black tracking-[0.18em] uppercase mb-1">SHORT-FORM</span>
                <p>
                  {language === "vi"
                    ? "Dưới 60 phút dung lượng thô. Sửa đổi vượt định mức thô tính +40.000đ / mỗi 30 phút ròng."
                    : "Limits apply to 60 mins of raw materials. Surplus ingestion logs process at +40,000 VND / 30 raw mins."}
                </p>
              </div>
              <div className="bg-[#F5F5F0]/[0.015] p-5 border border-paper/15 rounded-none">
                <span className="block font-mono text-[10px] text-[#D9381E] font-black tracking-[0.18em] uppercase mb-1">LONG-FORM</span>
                <p>
                  {language === "vi"
                    ? "Dưới 3 tiếng thô. Biên tập vượt mức ghi nhận +100.000đ / mỗi tiếng thô cộng thêm."
                    : "Setup counts up to 3 raw camera hours. Extra hours calculated at +100,000 VND / raw hour."}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 07: BULK ORDER DISCOUNTS */}
          <div className="border-t border-paper/15 pt-8">
            <span className="font-mono text-[10px] text-[#D9381E] tracking-[0.24em] block mb-2 font-black uppercase">
              SECTION 07
            </span>
            <h4 className="font-serif font-light text-xl italic text-[#F5F5F0] uppercase mb-4 tracking-normal">
              {language === "vi" ? "SỐ LƯỢNG LỚN (BULK)" : "BULK PACKS"}
            </h4>
            <div className="space-y-4 text-sm text-[#F5F5F0]/80 font-light leading-relaxed">
              <p>
                {language === "vi"
                  ? "Nhằm hỗ trợ dòng nội dung ổn định đều đặn cho đối tác bền chặt lâu dài, Duy áp dụng chiết khấu:"
                  : "We celebrate persistent pipelines and consistent series production layouts with volume billing discounts:"}
              </p>
              <ul className="pl-5 list-disc space-y-2 text-[#D9381E] font-medium font-mono text-sm tracking-wide">
                <li>5 – 10 video: {language === "vi" ? "Chiết khấu 5%" : "5% discount rate"}</li>
                <li>11 – 20 video: {language === "vi" ? "Chiết khấu 8%" : "8% discount rate"}</li>
                <li>21+ video: {language === "vi" ? "Chiết khấu 10%" : "10% discount rate"}</li>
              </ul>
              <p>
                {language === "vi"
                  ? "Quy định thanh toán số lượng lớn yêu cầu thanh toán nguyên gốc, nếu tất toán nửa vời, các video đã hoàn tất trước đó sẽ hồi về mức biểu giá đơn lẻ chuẩn."
                  : "Discounts require initial project bundle locks. Terminating early resets cleared deliverables back to base tier billing."}
              </p>
            </div>
          </div>

        </div>

        {/* SECTION 08: ASSET AND COPYRIGHT CONDITIONS */}
        <div className="border-t border-paper/15 pt-16">
          <div className="mb-10">
            <span className="font-mono text-[10px] text-[#D9381E] tracking-[0.24em] block mb-2 font-black uppercase">
              SECTION 08
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#F5F5F0] font-light italic uppercase tracking-normal">
              {language === "vi" ? "QUY ĐỊNH BẢN QUYỀN VÀ TÀI NGUYÊN" : "INTELLECTUAL PROPERTY & ASSETS"}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans text-sm text-[#F5F5F0]/80 font-light leading-relaxed">
            <div className="space-y-4">
              <p className="font-semibold text-[#F5F5F0] uppercase font-mono text-[10px] tracking-widest">
                {language === "vi" ? "Tài nguyên Khách hàng bảo đảm:" : "Client Provided Assets:"}
              </p>
              <ul className="pl-5 list-disc space-y-2 text-[#F5F5F0]/70">
                <li>{language === "vi" ? "Tất cả raw footage gốc, kịch bản, âm thoại chính." : "All original raw video reels, main voice lines."}</li>
                <li>{language === "vi" ? "Tập tin logo vector chính xác và bảng hướng dẫn thương hiệu." : "Original clean vector logos and graphic branding guidelines."}</li>
                <li>{language === "vi" ? "Hình ảnh tĩnh liên quan của thiết kế gốc." : "Bespoke images related to layout instructions."}</li>
              </ul>
              <p className="mt-4 text-[#F5F5F0]/65">
                {language === "vi"
                  ? "Nếu Khách hàng không có tài nguyên bổ trợ, Duy sẽ chủ động kết hợp thư viện hiệu ứng, âm thanh, typographic sẵn có trong bộ sưu tập tác quyền hợp lý làm việc cá nhân nhằm tối ưu hóa chất lượng."
                  : "If decorative elements are omitted, Duy utilizes personal library licenses, soundtracks, and custom typography frameworks to drive maximum story impact."}
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-semibold text-[#F5F5F0] font-mono text-[10px] tracking-widest uppercase">
                {language === "vi"
                  ? "Chất lượng nét cao của video thành phẩm phụ thuộc sống còn vào chất lượng thô đầu vào mà Khách hàng bàn giao."
                  : "Final video resolution quality completely relies on the organic lens quality and focus of raw footage supplied."}
              </p>
              <p className="italic text-[#D9381E] font-semibold text-sm bg-[#D9381E]/5 p-4 border-l border-[#D9381E]">
                {language === "vi"
                  ? "Duy hoàn toàn từ chối và không mang bất kể trách nhiệm pháp lý nào về tranh chấp bản quyền tác quyền đối với tài liệu thô do Khách hàng gửi."
                  : "Duy assumes zero administrative liability related to copyright disputes or licensing boundaries regarding client-submitted raw materials."}
              </p>
            </div>
          </div>
        </div>

      </div>


    </section>
  );
}
