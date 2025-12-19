import express from "express";
import {ping} from '../controllers/ping.js'

const router = express.Router();

//Routes for savings api
router.get("/ping",ping);
export default router;