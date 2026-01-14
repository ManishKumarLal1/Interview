import express from "express";
import path from "path";
import cors from "cors";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

/* ---------- PATH SETUP (FIXED, NO CWD BUG) ---------- */

const __dirname = path.resolve();


/* ---------- MIDDLEWARES ---------- */
app.use(express.json());
app.use(cors());

/* ---------- API ROUTES ---------- */
app.get("health", (req, res) => {
  res.json({ msg: "API is up and running" });
});

app.get("/test", (req, res) => {
  res.json({ msg: "Tested successfully" });
});




app.use("/api/inngest", serve({ client: inngest, functions }));
/* ---------- STATIC FRONTEND (PRODUCTION) ---------- */
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  app.get("/{*any}", (req,res)=>{
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
  })
}


/* ---------- START SERVER ---------- */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`);
      console.log("NODE_ENV =", ENV.NODE_ENV);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
};

startServer();
