import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connect } from "./db/db.js"
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import cors from "cors";

// 1. Initialize App and Config FIRST
const app = express();
dotenv.config();

// 2. CORS Configuration (Must be before routes)
app.use(cors({
  origin: 'https://paisa-tracker-frontend.vercel.app', // Ensure this matches your Vercel URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 3. Import Routes
import transroutes from './routes/transactions.js'
import authroutes from './routes/auth.js';
import savingroutes from './routes/savings.js';
import billsRoutes from './routes/bills.js';
import mailroutes from './routes/sendEmail.js'
import userroutes from './routes/user.js';
import grouproutes from './routes/groups.js'
import friendroutes from './routes/friends.js'
import pingRoutes from './routes/ping.js'

// 4. Middleware
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// 5. Routes
app.use("/api/bills", billsRoutes)
app.use("/api/transactions", transroutes)
app.use("/api/savings", savingroutes)  
app.use("/api/auth", authroutes)
app.use("/api/mail", mailroutes) 
app.use("/api/user", userroutes)  
app.use("/api/group", grouproutes)
app.use("/api/friend", friendroutes)
app.use("/api/health", pingRoutes)

// 6. Error Handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    console.log(err);
    return res.status(status).json({
        success: false,
        status,
        message,
    })
})

// 7. Start Server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    connect() // Database connection
    console.log(`Server running on port ${PORT}`);
})