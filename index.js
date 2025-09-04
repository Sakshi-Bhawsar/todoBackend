const express = require("express");
const connectDB = require("./src/config/database");
const authRouter = require("./src/routes/auth");
const notesRouter = require("./src/routes/notes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const serverless = require("serverless-http"); // ✅ Import this

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.get("/", (req, res) => {
  res.send("Backend server is running on Vercel 🚀");
});

// ✅ Connect DB (will run on first request, not before export)
connectDB()
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log("DB connection failed", err));

// ❌ REMOVE app.listen()
// ✅ Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
