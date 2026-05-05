import express from "express";
import dotenv from "dotenv";
import { connect } from "./db/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

// 1. Init
dotenv.config();
const app = express();

// 2. Allowed Origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3002",
  "https://paisa-vasooli--tu96.vercel.app",
  "https://paisa-tracker-frontend.vercel.app"
];

// 3. ✅ SINGLE cors middleware — no duplicate
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman, mobile apps etc.
    if (allowedOrigins.includes(origin)|| origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 4. Middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 5. Routes
import transroutes from './routes/transactions.js';
import authroutes from './routes/auth.js';
import savingroutes from './routes/savings.js';
import billsRoutes from './routes/bills.js';
import mailroutes from './routes/sendEmail.js';
import userroutes from './routes/user.js';
import grouproutes from './routes/groups.js';
import friendroutes from './routes/friends.js';
import pingRoutes from './routes/ping.js';

app.use("/api/bills", billsRoutes);
app.use("/api/transactions", transroutes);
app.use("/api/savings", savingroutes);
app.use("/api/auth", authroutes);
app.use("/api/mail", mailroutes);
app.use("/api/user", userroutes);
app.use("/api/group", grouproutes);
app.use("/api/friend", friendroutes);
app.use("/api/health", pingRoutes);

// 6. Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong"
  });
});

// 7. Start Server
const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Server running on port ${PORT}`);
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Failed:");
    console.error(error);
  }
});