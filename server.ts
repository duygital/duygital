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

    const record = {
      id: "sub_" + Math.random().toString(36).substring(2, 11),
      ...incoming,
      receivedAt: getHanoiTimeString(),
    };

    submissions.push(record);

    let logsToGoogleSheets = false;
    let sheetError = null;

    // Check if Google Apps Script URL is configured in context (either from client-side payload or server environment)
    const googleAppsScriptUrl = incoming.appsScriptUrl || process.env.GOOGLE_APPS_SCRIPT_URL;
    if (googleAppsScriptUrl) {
      try {
        console.log(`Forwarding intake record to Apps Script: ${googleAppsScriptUrl}`);
        
        // Google Web Apps (Apps Script) return a 302 redirect. Brand-new Node.js fetch (based on undici)
        // automatically follows 302 redirects by changing the method from POST to GET and dropping the body payload.
        // We bypass this limitation by using 'redirect: "manual"', reading the target URL, and manually forwarding the POST.
        let currentUrl = googleAppsScriptUrl;
        let response: Response | null = null;
        let attempts = 0;
        const maxAttempts = 5;

        while (attempts < maxAttempts) {
          console.log(`[Apps Script POST Attempt ${attempts + 1}] Target: ${currentUrl}`);
          response = await fetch(currentUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(record),
            redirect: "manual",
          });

          // Check for redirect status codes (301, 302, 303, 307, 308)
          if (response.status >= 300 && response.status < 400) {
            const redirectLocation = response.headers.get("location");
            if (redirectLocation) {
              currentUrl = new URL(redirectLocation, currentUrl).toString();
              attempts++;
              continue;
            }
          }
          break;
        }

        if (response && response.ok) {
          console.log("Apps Script response succeeded.");
          logsToGoogleSheets = true;
        } else if (response) {
          const text = await response.text();
          console.warn("Apps Script returned non-OK status:", response.status, text);
          sheetError = `Status ${response.status}: ${text}`;
        } else {
          sheetError = "Failed to establish route to Google Apps Script endpoint after redirection.";
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
