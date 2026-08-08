import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { requireAuth, optionalAuth, AuthRequest } from "./src/middleware/auth.ts";
import { getOrCreateUser } from "./src/db/users.ts";
import { createAppointment, getUserAppointments, getAllAppointments } from "./src/db/appointments.ts";
import { createReview, getAllReviews } from "./src/db/reviews.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", async (req, res) => {
    res.json({ status: "ok", database: "Cloud SQL (PostgreSQL)" });
  });

  // Auth Sync endpoint - synchronizes Firebase user with Cloud SQL users table
  app.post("/api/auth/sync", requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || `${uid}@anonymous.com`;
      const displayName = req.body.displayName || req.user!.name || email.split('@')[0];

      const user = await getOrCreateUser(uid, email, displayName);
      res.json({ success: true, user });
    } catch (error: any) {
      console.error("Auth sync error:", error);
      res.status(500).json({ error: error.message || "Failed to sync user." });
    }
  });

  // GET appointments (user-specific or all)
  app.get("/api/appointments", optionalAuth, async (req: AuthRequest, res) => {
    try {
      if (req.user) {
        const dbUser = await getOrCreateUser(req.user.uid, req.user.email || `${req.user.uid}@anonymous.com`, req.user.name);
        const userAppts = await getUserAppointments(dbUser.id);
        return res.json({ appointments: userAppts });
      }
      const allAppts = await getAllAppointments();
      res.json({ appointments: allAppts });
    } catch (error: any) {
      console.error("Get appointments error:", error);
      res.status(500).json({ error: error.message || "Failed to fetch appointments." });
    }
  });

  // POST new appointment
  app.post("/api/appointments", optionalAuth, async (req: AuthRequest, res) => {
    try {
      const { patientName, phone, treatmentId, treatmentName, date, time, notes } = req.body;
      if (!patientName || !phone || !date || !time) {
        return res.status(400).json({ error: "Missing required appointment details." });
      }

      let userId: number | undefined;
      if (req.user) {
        const dbUser = await getOrCreateUser(req.user.uid, req.user.email || `${req.user.uid}@anonymous.com`, req.user.name);
        userId = dbUser.id;
      }

      const appointment = await createAppointment({
        userId,
        patientName,
        phone,
        treatmentId: treatmentId || 'general',
        treatmentName: treatmentName || 'Consultation',
        date,
        time,
        notes,
      });

      res.status(201).json({ success: true, appointment });
    } catch (error: any) {
      console.error("Create appointment error:", error);
      res.status(500).json({ error: error.message || "Failed to book appointment." });
    }
  });

  // GET reviews
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviewsList = await getAllReviews();
      res.json({ reviews: reviewsList });
    } catch (error: any) {
      console.error("Get reviews error:", error);
      res.status(500).json({ error: error.message || "Failed to fetch reviews." });
    }
  });

  // POST new review
  app.post("/api/reviews", optionalAuth, async (req: AuthRequest, res) => {
    try {
      const { patientName, treatmentName, rating, comment } = req.body;
      if (!patientName || !treatmentName || !comment) {
        return res.status(400).json({ error: "Missing required review fields." });
      }

      let userId: number | undefined;
      if (req.user) {
        const dbUser = await getOrCreateUser(req.user.uid, req.user.email || `${req.user.uid}@anonymous.com`, req.user.name);
        userId = dbUser.id;
      }

      const review = await createReview({
        userId,
        patientName,
        treatmentName,
        rating: rating || 5,
        comment,
      });

      res.status(201).json({ success: true, review });
    } catch (error: any) {
      console.error("Create review error:", error);
      res.status(500).json({ error: error.message || "Failed to submit review." });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer();
