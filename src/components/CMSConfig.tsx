import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { RefreshCw, X, Check, AlertTriangle, Settings } from "lucide-react";
import { fetchSpreadsheetTabs, extractSpreadsheetId } from "../data";

interface CMSConfigProps {
  onClose: () => void;
  onConfigSaved: (sheetUrl: string | null) => void;
  currentSheetUrl: string | null;
}

const APPS_SCRIPT_CODE = `// Google Apps Script source code

// =========================================================================
// HƯỚNG DẪN KÍCH HOẠT NHẬN THÔNG BÁO QUA TELEGRAM & GMAIL LƯU LEAD MỚI:
// 
// 1. CẤU HÌNH GỬI THÔNG BÁO QUA TELEGRAM (KHUYÊN DÙNG - KHÔNG THỂ BỊ LỖI QUYỀN):
//    - Nhắn tin cho @BotFather trên Telegram để tạo một Bot mới. Sao chép 'Token'.
//    - Điền 'Token' của Bot vào biến TELEGRAM_BOT_TOKEN ở dòng bên dưới.
//    - Nhắn tin cho @userinfobot hoặc các bot tương tự trên Telegram để lấy 'Chat ID' của bạn.
//    - Điền 'Chat ID' của bạn vào biến TELEGRAM_CHAT_ID ở dòng bên dưới.
// 
// 2. CẤU HÌNH GMAIL BÁO CÁO NHƯ CŨ (KHÔNG BẮT BUỘC):
//    - Ở thanh công cụ trên cùng của Apps Script, chọn hàm "testSendEmailAlert" và nhấn "Chạy" (Run).
//    - Chấp nhận toàn bộ quyền truy cập (Nhấn Xem quyền -> Chọn tài khoản -> Nâng cao -> Đi tiếp).
// 
// 3. TRIỂN KHAI WEB APP:
//    - Click "Triển khai" (Deploy) -> "Triển khai mới" (New deployment).
//    - Chọn kiểu triển khai: "Ứng dụng khách" (Web App).
//    - Cấu hình: "Chạy dưới danh nghĩa: Tôi (Me)", "Ai có quyền truy cập: Mọi người (Anyone)".
//    - Nhấn "Triển khai" và sao chép link Web App dán vào cài đặt CMS của Portfolio nhé!
// =========================================================================

// BIẾN CẤU HÌNH NHẬN TIN NHẮN TELEGRAM (ĐIỀN VÀO ĐÂY ĐỂ HOẠT ĐỘNG NGAY)
var TELEGRAM_BOT_TOKEN = ""; // Ví dụ: "123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
var TELEGRAM_CHAT_ID = "";   // Ví dụ: "987654321"

// BIẾN CHỈ ĐỊNH EMAIL NHẬN THÔNG BÁO BẰNG GMAIL (KHÔNG BẮT BUỘC, NẾU MUỐN NHẬN SONG SONG THÌ KHÔNG CẦN SỬA)
var RECIPIENT_EMAIL = "";    // Ví dụ: "dangtruongduy.moi1@gmail.com" (để trống sẽ tự động gửi về Email chủ Google Sheets)

// -------------------------------------------------------------------------

// HÀM CHẠY THỬ ĐỂ KÍCH HOẠT VÀ CẤP QUYỀN GỬI THƯ TRÊN GMAIL
function testSendEmailAlert() {
  try {
    var recipient = RECIPIENT_EMAIL;
    try {
      if (!recipient) {
        recipient = SpreadsheetApp.getActiveSpreadsheet().getOwner().getEmail();
      }
    } catch (e) {}
    
    if (!recipient) {
      recipient = Session.getEffectiveUser().getEmail() || Session.getActiveUser().getEmail();
    }
    
    if (!recipient) {
      Logger.log("CHƯA CÓ EMAIL: Vui lòng điền email nhận vào biến RECIPIENT_EMAIL nhé!");
      return;
    }
    
    Logger.log("Đang tiến hành gửi email thử nghiệm tới: " + recipient);
    
    var subject = "🔥 [Duygital CMS] KÍCH HOẠT EMAIL THÔNG BÁO THÀNH CÔNG!";
    var body = "Chúc mừng bạn!\\n\\nEmail này xác nhận bạn đã cấp quyền thành công cho Google Apps Script gửi thư thông báo mỗi khi có khách hàng điền form trên Duygital Portfolio của bạn.\\n\\nTừ bây giờ, hệ thống sẽ tự động gửi email báo cáo chi tiết khi có lead mới đăng ký!\\n\\nTrân trọng,\\nDuygital CMS System";
      
    MailApp.sendEmail(recipient, subject, body);
    Logger.log("Gửi mail thành công! Hãy kiểm tra hòm thư Gmail của bạn.");
  } catch (err) {
    Logger.log("Lỗi cấp quyền / gửi thử email: " + err.toString());
  }
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    // Ghi nhận vào sheet có tên là "leads"
    var sheet = ss.getSheetByName("leads");
    if (!sheet) {
      sheet = ss.insertSheet("leads");
      sheet.appendRow([
        "Timestamp", "Name", "Email", "Zalo", "Client Type", 
        "Video Type", "Platform", "Feeling", "Pacing", "Amount", "Budget", "Description"
      ]);
    }
    
    // Đọc dữ liệu gửi từ website
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ 
        "status": "warning", 
        "message": "Do bạn đang bấm nút Chạy (Run) trực tiếp trong Google Apps Script Editor nên không có dữ liệu thực tế từ Website. Hãy chạy hàm 'testSendEmailAlert' để kiểm tra cấp quyền nhé!" 
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Lấy thông tin các cột tiêu đề ở dòng 1
    var headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
    if (headers.length === 0 || !headers[0]) {
      headers = [
        "Timestamp", "Name", "Email", "Zalo", "Client Type", 
        "Video Type", "Platform", "Feeling", "Pacing", "Amount", "Budget", "Description"
      ];
      sheet.appendRow(headers);
    }
    
    // Điền dữ liệu khớp theo tiêu đề cột một cách linh hoạt
    var newRow = [];
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i].toString().trim().toLowerCase();
      var val = "";
      
      if (header === "timestamp" || header === "received at" || header === "submitted at" || header === "thời gian" || header === "received_at" || header === "submitted_at") {
        val = data.submittedAt || data.receivedAt || new Date().toISOString();
      } else if (header === "name" || header === "full name" || header === "họ tên" || header === "họ và tên" || header === "fullname") {
        val = data.fullName || "";
      } else if (header === "email" || header === "địa chỉ email") {
        val = data.email || "";
      } else if (header === "zalo" || header === "zalo_whatsapp" || header === "zalo / whatsapp" || header === "contact method" || header === "whatsapp" || header === "số liên hệ" || header === "contactmethod") {
        val = data.contactMethod || "";
      } else if (header === "client type" || header === "nhóm đối tượng" || header === "đối tượng" || header === "clienttype") {
        val = data.clientType || "";
      } else if (header === "video type" || header === "project type" || header === "thể loại" || header === "dự án" || header === "the loai" || header === "projecttype") {
        val = data.projectType || "";
      } else if (header === "platform" || header === "nền tảng" || header === "main platform" || header === "mainplatform") {
        val = data.mainPlatform || "";
      } else if (header === "feeling" || header === "cảm quan" || header === "cảm hứng" || header === "feeling_pacing_budget" || header === "cảm quan chủ đạo") {
        val = data.referenceLinks || "";
      } else if (header === "pacing" || header === "nhịp độ" || header === "expected timeline" || header === "timelinemongmuon") {
        val = data.expectedTimeline || "";
      } else if (header === "amount" || header === "số lượng" || header === "so luong" || header === "estimated quantity" || header === "soluongvideo") {
        val = data.estimatedQuantity || "";
      } else if (header === "budget" || header === "ngân sách" || header === "kinh phí" || header === "dự kiến chi phí" || header === "ngansach") {
        val = data.budget || "";
      } else if (header === "description" || header === "project description" || header === "mô tả" || header === "projectdescription") {
        val = data.projectDescription || "";
      } else {
        val = data[headers[i]] || data[headers[i].toString().trim()] || "";
      }
      newRow.push(val);
    }
    
    sheet.appendRow(newRow);
    
    // 1. TỰ ĐỘNG GỬI TIN NHẮN TELEGRAM (KHUYÊN DÙNG VÌ KHÔNG LO HẾT QUOTA ĐỊNH ĐỨT CÁP)
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        var msg = "🔥 [Duygital CMS] CÓ LEAD MỚI ĐĂNG KÝ FORM!\\n" +
                  "-----------------------------------------\\n" +
                  "• Họ tên: " + (data.fullName || "N/A") + "\\n" +
                  "• Email: " + (data.email || "N/A") + "\\n" +
                  "• Zalo/Phone: " + (data.contactMethod || "N/A") + "\\n" +
                  "• Nhóm: " + (data.clientType || "N/A") + "\\n" +
                  "• Thể loại: " + (data.projectType || "N/A") + "\\n" +
                  "• Nền tảng: " + (data.mainPlatform || "N/A") + "\\n" +
                  "• Tiến độ (Pacing): " + (data.expectedTimeline || "N/A") + "\\n" +
                  "• Số lượng video (Amount): " + (data.estimatedQuantity || "N/A") + "\\n" +
                  "• Ngân sách (Budget): " + (data.budget || "N/A") + "\\n" +
                  "• Cảm quan: " + (data.referenceLinks || "N/A") + "\\n" +
                  "• Ý tưởng: " + (data.projectDescription || "N/A") + "\\n" +
                  "-----------------------------------------\\n" +
                  "Thời gian nhận: " + (data.submittedAt || new Date().toLocaleString()) + "\\n\\n" +
                  "👉 Hãy truy cập Google Sheets của bạn để quản lý chi tiết.";
        
        var payloadDesc = {
          "method": "post",
          "contentType": "application/json",
          "payload": JSON.stringify({
            "chat_id": TELEGRAM_CHAT_ID,
            "text": msg
          }),
          "muteHttpExceptions": true
        };
        UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage", payloadDesc);
      } catch (tgErr) {
        Logger.log("Err sending Telegram message: " + tgErr.toString());
      }
    }
    
    // 2. TỰ ĐỘNG GỬI EMAIL NẾU ĐƯỢC CẤP QUYỀN VÀ TRÁNH QUOTA LỖI
    try {
      var recipient = RECIPIENT_EMAIL;
      try {
        if (!recipient) {
          recipient = SpreadsheetApp.getActiveSpreadsheet().getOwner().getEmail();
        }
      } catch (e) {}
      if (!recipient) {
        recipient = Session.getEffectiveUser().getEmail() || Session.getActiveUser().getEmail();
      }
      
      if (recipient) {
        var subject = "🔥 [Duygital CMS] Có Lead mới từ " + (data.fullName || "Khách hàng");
        var mailBody = "Chào bạn,\\n\\nHệ thống vừa ghi nhận một lead mới đăng ký trên form Duygital của bạn!\\n\\n" +
          "Chi tiết thông tin đăng ký:\\n" +
          "-----------------------------------------\\n" +
          "• Họ & Tên: " + (data.fullName || "N/A") + "\\n" +
          "• Email: " + (data.email || "N/A") + "\\n" +
          "• Số liên hệ (Zalo / Phone): " + (data.contactMethod || "N/A") + "\\n" +
          "• Nhóm đối tượng: " + (data.clientType || "N/A") + "\\n" +
          "• Thể loại video mong muốn: " + (data.projectType || "N/A") + "\\n" +
          "• Nền tảng chính: " + (data.mainPlatform || "N/A") + "\\n" +
          "• Cảm quan chủ đạo (Feeling): " + (data.referenceLinks || "N/A") + "\\n" +
          "• Nhịp độ (Pacing): " + (data.expectedTimeline || "N/A") + "\\n" +
          "• Số lượng video (Amount): " + (data.estimatedQuantity || "N/A") + "\\n" +
          "• Ngân sách dự kiến (Budget): " + (data.budget || "N/A") + "\\n" +
          "• Mô tả ý tưởng: " + (data.projectDescription || "N/A") + "\\n" +
          "-----------------------------------------\\n" +
          "Thời gian nhận (Giờ Hà Nội): " + (data.submittedAt || new Date().toLocaleString()) + "\\n\\n" +
          "👉 Vui lòng truy cập Google Sheet của bạn để xem đầy đủ danh sách.\\n\\nChúc bạn một ngày tràn đầy năng lượng!\\nTrân trọng,\\nDuygital Portfolio System";
        
        MailApp.sendEmail(recipient, subject, mailBody);
      }
    } catch (mailErr) {
      Logger.log("Lỗi gửi email: " + mailErr.toString());
    }
    
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "success", 
      "message": "Ghi nhận dữ liệu thành công." 
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "error", 
      "message": error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
`;

export default function CMSConfig({ onClose, onConfigSaved, currentSheetUrl }: CMSConfigProps) {
  const [sheetUrl, setSheetUrl] = useState(currentSheetUrl || "");
  const [appsScriptUrl, setAppsScriptUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [errorDetails, setErrorDetails] = useState("");
  const [showScript, setShowScript] = useState(false);
  const [copied, setCopied] = useState(false);

  // Retrieve any existing saved Webhook URL on launch
  useEffect(() => {
    const savedWebhook = localStorage.getItem("duygital_apps_script_url") || "";
    setAppsScriptUrl(savedWebhook);
  }, []);

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sheetUrl.trim()) {
      if (appsScriptUrl.trim()) {
        setStatus("success");
        localStorage.setItem("duygital_apps_script_url", appsScriptUrl.trim());
        onConfigSaved(null);
      } else {
        handleClear();
      }
      return;
    }

    const spreadsheetId = extractSpreadsheetId(sheetUrl);
    if (!spreadsheetId) {
      if (appsScriptUrl.trim()) {
        setStatus("success");
        localStorage.setItem("duygital_apps_script_url", appsScriptUrl.trim());
        onConfigSaved(null);
        setErrorDetails("Note: Google Sheet URL was invalid, but your Apps Script Webhook for Leads has been successfully saved!");
        return;
      }
      setStatus("error");
      setErrorDetails(
        "Invalid Google Sheet URL format. Please paste a standard Google Sheets sharing link or a valid Google Spreadsheet ID."
      );
      return;
    }

    setStatus("testing");
    setErrorDetails("");

    try {
      const data = await fetchSpreadsheetTabs(sheetUrl);
      const activeTabs = [];
      if (data.projects) activeTabs.push("projects");
      if (data.pricing) activeTabs.push("pricing");
      if (data.faq) activeTabs.push("faq");
      if (data.workflow) activeTabs.push("workflow");

      if (activeTabs.length > 0) {
        setStatus("success");
        onConfigSaved(sheetUrl);
        if (appsScriptUrl.trim()) {
          localStorage.setItem("duygital_apps_script_url", appsScriptUrl.trim());
        } else {
          localStorage.removeItem("duygital_apps_script_url");
        }
      } else {
        if (appsScriptUrl.trim()) {
          setStatus("success");
          onConfigSaved(sheetUrl);
          localStorage.setItem("duygital_apps_script_url", appsScriptUrl.trim());
          setErrorDetails("Note: Spreadsheet was linked, but none of the required CMS tabs ('projects', 'pricing', 'faq', 'workflow') were found. Your Apps Script Webhook for Leads has been successfully saved!");
        } else {
          throw new Error("Spreadsheet parsed successfully but none of the required tabs ('projects', 'pricing', 'faq', 'workflow') were found.");
        }
      }
    } catch (err: any) {
      console.error(err);
      if (appsScriptUrl.trim()) {
        setStatus("success");
        localStorage.setItem("duygital_apps_script_url", appsScriptUrl.trim());
        onConfigSaved(null); // Save webhook only, clear invalid spreadsheet state
        setErrorDetails("Note: Spreadsheet connection was not completed, but your Apps Script Webhook for Leads was successfully saved!");
      } else {
        setStatus("error");
        setErrorDetails(
          err.message || "Failed to query the Google Sheet tabs. Ensure your sheet is shared with 'Anyone with the link can view' so the web app can read the tabs."
        );
      }
    }
  };

  const handleClear = () => {
    setSheetUrl("");
    setAppsScriptUrl("");
    setStatus("idle");
    localStorage.removeItem("duygital_apps_script_url");
    onConfigSaved(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-bg border border-paper/10 rounded-lg overflow-hidden shadow-2xl font-mono text-xs text-paper"
      >
        {/* Top bar header */}
        <div className="bg-bg px-5 py-4 border-b border-paper/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-brand" />
            <span className="font-semibold tracking-wider text-brand font-mono uppercase">
              GOOGLE SHEETS INTEGRATION
            </span>
          </div>
          <button onClick={onClose} className="text-paper/40 hover:text-brand cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="space-y-2 text-paper/70 font-sans text-xs">
            <p className="font-semibold text-paper mb-1">Direct Google Sheets CMS Integration</p>
            <ol className="list-decimal list-inside space-y-1.5 pl-1 font-sans text-paper/60 leading-relaxed">
              <li>Open your project index spreadsheet in Google Sheets.</li>
              <li>Make sure your sheet is shared: <span className="text-brand font-mono">[ Share &rarr; Anyone with the link (Viewer) ]</span>.</li>
              <li>Ensure the sheet contains matching tabs named: <strong className="text-paper">projects</strong>, <strong className="text-paper">pricing</strong>, <strong className="text-paper">faq</strong>, <strong className="text-paper font-semibold">leads</strong>.</li>
              <li>Copy your spreadsheet browser link and paste it below.</li>
            </ol>
          </div>

          <form onSubmit={handleTestAndSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] text-brand tracking-widest uppercase font-mono">
                Google Sheet Sharing Link or ID:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://docs.google.com/spreadsheets/d/SpreadsheetId/edit"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  className="w-full bg-paper/5 border border-paper/10 focus:border-brand rounded px-3 py-2 focus:outline-none placeholder-paper/20 text-[11px] font-mono leading-normal transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5 border-t border-paper/5 pt-4">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] text-brand tracking-widest uppercase font-mono">
                  Apps Script Webhook URL:
                </label>
                <span className="text-[10px] text-paper/30 lowercase italic">for writing leads</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={appsScriptUrl}
                  onChange={(e) => setAppsScriptUrl(e.target.value)}
                  className="w-full bg-paper/5 border-2 border-paper/15 focus:border-brand rounded px-3 py-2.5 focus:outline-none placeholder-paper/20 text-[11px] font-mono leading-normal transition-all"
                />
              </div>
            </div>

            {/* Apps Script Code accordion helper as requested */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowScript(!showScript)}
                className="w-full text-left py-2 px-3.5 bg-paper/5 hover:bg-paper/10 border border-brand/20 hover:border-brand rounded flex items-center justify-between text-[10px] font-mono tracking-widest transition-colors cursor-pointer text-brand"
              >
                <span>[ {showScript ? "ẨN MÃ APPS SCRIPT" : "XEM MÃ APPS SCRIPT ĐỂ SAO CHÉP"} ]</span>
                <span className="text-paper/40 font-bold">{showScript ? "▲" : "▼"}</span>
              </button>

              {showScript && (
                <div className="mt-2.5 bg-paper/5 border border-paper/10 rounded p-3.5 space-y-3 font-sans text-[11px] leading-relaxed text-paper/70">
                  <p className="font-semibold text-brand font-mono">Các bước thực hiện nhanh:</p>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Nhấn nút <strong className="text-brand">SAO CHÉP MÃ</strong> bên dưới.</li>
                    <li>Mở Google Sheet của bạn &rarr; chọn <strong className="text-paper">Tiện ích mở rộng &gt; Apps Script</strong>.</li>
                    <li>Xóa hết code cũ, dán mã mới vừa copy vào.</li>
                    <li>Chọn hàm <strong className="text-[#FF5A00]">testSendEmailAlert</strong> ở cạnh nút Chạy rồi bấm Chạy để cấp quyền Gmail nhé.</li>
                    <li>Bấm <strong className="text-paper">Triển khai &gt; Triển khai mới &gt; Ứng dụng Web</strong> (đặt quyền Mọi người) rồi dán Link nhận được vào ô Webhook bên trên!</li>
                  </ol>
                  
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(APPS_SCRIPT_CODE);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="absolute top-2 right-2 px-3 py-1 bg-brand hover:bg-[#FF5A00] text-paper rounded font-mono text-[9px] font-black transition-all cursor-pointer shadow-md select-none uppercase"
                    >
                      {copied ? "ĐÃ SAO CHÉP ✓" : "SAO CHÉP MÃ"}
                    </button>
                    <pre className="p-3 bg-zinc-950 border border-paper/10 rounded overflow-x-auto text-[9px] font-mono text-paper/70 leading-normal max-h-52 select-all whitespace-pre">
                      {APPS_SCRIPT_CODE}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Status box feedback */}
            {status === "testing" && (
              <div className="bg-motion/5 border border-motion/20 p-3 rounded text-motion flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                <span>Checking Google Sheets tabs connection...</span>
              </div>
            )}

            {status === "success" && (
              <div className="bg-green-950/20 border border-green-500/20 p-3 rounded text-green-400 font-mono text-[11px] space-y-1">
                <div className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>SPREADSHEET LINKED SUCCESSFULLY</span>
                </div>
                <p className="font-sans text-[10px] text-paper/55 leading-relaxed">
                  We successfully extracted active tabs! Your website portfolio layout has been updated dynamically from Google Sheets.
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="bg-brand/5 border border-brand/20 p-3 rounded text-brand font-mono text-[11px] space-y-1">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>CONNECTION FAILED</span>
                </div>
                <p className="font-sans text-[10px] text-paper/70 leading-relaxed">
                  {errorDetails}
                </p>
              </div>
            )}

            {/* Direct action panel */}
            <div className="flex justify-between items-center pt-3 border-t border-paper/10">
              {currentSheetUrl ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="font-mono text-[10px] text-brand hover:text-motion transition-colors cursor-pointer uppercase font-black"
                >
                  [ Gỡ bỏ đồng bộ ]
                </button>
              ) : (
                <span className="text-paper/20">[ Database: Default Data ]</span>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-paper/15 text-paper/60 hover:text-paper px-3 py-1.5 rounded text-[10px] transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={status === "testing"}
                  className="bg-brand hover:bg-motion text-paper px-4 py-1.5 rounded text-[10px] font-black transition-all cursor-pointer font-mono"
                >
                  SAVE & SYNC
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
