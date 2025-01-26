import express from "express";
import { getLoanDetails, submitLoanRequest } from "../handlers/loan.handlers.js";
import { authenticate } from "../middlewares/userRef.middleware.js";

const router = express.Router();

router.get("/getUserLoanRequest", authenticate, getLoanDetails);
router.post("/getUserLoanRequest", authenticate, submitLoanRequest);

export default router;