import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { HelpCircle, RefreshCw, X, Link, Check, AlertTriangle, Layers, Settings, FileSpreadsheet } from "lucide-react";
import { fetchSpreadsheetTabs, extractSpreadsheetId } from "../data";

interface CMSConfigProps {
  onClose: () => void;
  onConfigSaved: (sheetUrl: string | null) => void;
  currentSheetUrl: string | null;
}

export default function CMSConfig({ onClose, onConfigSaved, currentSheetUrl }: CMSConfigProps) {
  const [sheetUrl, setSheetUrl] = useState(currentSheetUrl || "");
  const [appsScriptUrl, setAppsScriptUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [errorDetails, setErrorDetails] = useState("");

  // Retrieve any existing saved Webhook URL on launch
  useEffect(() => {
    const savedWebhook = localStorage.getItem("duygital_apps_script_url") || "";
    setAppsScriptUrl(savedWebhook);
  }, []);

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sheetUrl.trim()) {
      handleClear();
      return;
    }

    const spreadsheetId = extractSpreadsheetId(sheetUrl);
    if (!spreadsheetId) {
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
        // Save the spreadsheet URL
        onConfigSaved(sheetUrl);
        // Save the Apps Script Webhook URL if provided
        if (appsScriptUrl.trim()) {
          localStorage.setItem("duygital_apps_script_url", appsScriptUrl.trim());
        } else {
          localStorage.removeItem("duygital_apps_script_url");
        }
      } else {
        throw new Error("Spreadsheet parsed successfully but none of the required tabs ('projects', 'pricing', 'faq', 'workflow') were found.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorDetails(
        err.message || "Failed to query the Google Sheet tabs. Ensure your sheet is shared with 'Anyone with the link can view' so the web app can read the tabs."
      );
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
        <div className="p-6 space-y-6">
          <div className="space-y-2 text-paper/70 font-sans text-xs">
            <p className="font-semibold text-paper mb-1">Direct Google Sheets CMS Integration</p>
            <ol className="list-decimal list-inside space-y-1.5 pl-1 font-sans text-paper/60 leading-relaxed">
              <li>Open your project index spreadsheet in Google Sheets.</li>
              <li>Make sure your sheet is shared: <span className="text-brand font-mono">[ Share &rarr; General access: Anyone with the link (Viewer) ]</span>.</li>
              <li>Ensure the sheet contains matching tabs named: <strong className="text-paper">projects</strong>, <strong className="text-paper">pricing</strong>, <strong className="text-paper">faq</strong>, <strong className="text-paper">workflow</strong>, and <strong className="text-paper font-semibold">leads</strong>.</li>
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
                  Apps Script Webhook URL (Optional):
                </label>
                <span className="text-[10px] text-paper/30 lowercase italic">for writing leads</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={appsScriptUrl}
                  onChange={(e) => setAppsScriptUrl(e.target.value)}
                  className="w-full bg-paper/5 border border-paper/10 focus:border-brand rounded px-3 py-2 focus:outline-none placeholder-paper/20 text-[11px] font-mono leading-normal transition-all"
                />
              </div>
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
                  className="font-mono text-[10px] text-brand hover:text-motion transition-colors cursor-pointer uppercase"
                >
                  [ Remove Spreadsheet Link ]
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
                  className="bg-brand hover:bg-motion text-paper px-4 py-1.5 rounded text-[10px] font-semibold transition-all cursor-pointer font-mono"
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
