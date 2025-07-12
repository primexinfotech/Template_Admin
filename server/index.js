
import express from "express";
import session from "express-session";
import MemoryStore from "memorystore";
import { registerRoutes } from "./routes.js";
import { setupVite, serveStatic } from "./vite.js";

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory storage for demo
const memoryStore = MemoryStore(session);

// Session configuration with memory store
app.use(
  session({
    store: new memoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET || "fallback-secret-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

// Middleware
app.use(express.json());

// API routes
registerRoutes(app);

// Serve static files and setup Vite in development
if (process.env.NODE_ENV === "development") {
  await setupVite(app);
} else {
  serveStatic(app);
}

// Start server
app.listen(PORT, "0.0.0.0", () => {
  const mode = process.env.NODE_ENV || "development";
  console.log(`🚀 Server running on port ${PORT} in ${mode} mode`);
});
