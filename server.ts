import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Memory buffer for transient submissions storage
  const submissions: any[] = [];

  // API routes FIRST
  app.post("/api/submissions", async (req, res) => {
    const incoming = req.body;
    console.log("=== DUYGITAL CHRONOLOGY: INTAKE SUBMISSION RECEIVED ===");
    console.log(JSON.stringify(incoming, null, 2));

    const record = {
      id: "sub_" + Math.random().toString(36).substring(2, 11),
      ...incoming,
      receivedAt: new Date().toISOString(),
    };

    submissions.push(record);

    let logsToGoogleSheets = false;
    let sheetError = null;

    // Check if Google Apps Script URL is configured in context (either from client-side payload or server environment)
    const googleAppsScriptUrl = incoming.appsScriptUrl || process.env.GOOGLE_APPS_SCRIPT_URL;
    if (googleAppsScriptUrl) {
      try {
        console.log(`Forwarding intake record to Apps Script: ${googleAppsScriptUrl}`);
        const response = await fetch(googleAppsScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        });

        if (response.ok) {
          console.log("Apps Script response succeeded.");
          logsToGoogleSheets = true;
        } else {
          const text = await response.text();
          console.warn("Apps Script returned non-OK status:", response.status, text);
          sheetError = `Status ${response.status}: ${text}`;
        }
      } catch (err: any) {
        console.error("Failed to forward submission to Google Sheets Apps Script:", err);
        sheetError = err.message || String(err);
      }
    } else {
      console.log("GOOGLE_APPS_SCRIPT_URL is not set. Data saved to standard in-memory ledger and local client backup.");
    }

    res.status(201).json({
      status: "success",
      message: "Creative request received and successfully logged in background ledger.",
      googleSheetsSynced: logsToGoogleSheets,
      sheetError,
      record,
    });
  });

  app.get("/api/submissions", (req, res) => {
    res.json(submissions);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server booting... Listening on port ${PORT}`);
  });
}

startServer();
