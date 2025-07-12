
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function setupVite(app) {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configFile: path.resolve(__dirname, "../vite.config.js"),
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);
}

export function serveStatic(app) {
  const distPath = path.resolve(__dirname, "../dist/public");
  
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the frontend build! Expected to find it at ${distPath}, but it was not there. Make sure to run the 'build' script before starting the server.`
    );
  }

  app.use(express.static(distPath));
  
  // Serve index.html for all non-API routes (SPA fallback)
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(distPath, "index.html"));
    }
  });
}
