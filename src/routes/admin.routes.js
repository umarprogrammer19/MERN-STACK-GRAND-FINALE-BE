import express from "express";
import { filterApplications, getAllApplications, scheduleAppointment, updateApplicationStatus } from "../handlers/admin.handlers.js";

const router = express.Router()

router.get('/getApp', getAllApplications);
router.put('/updateApp', updateApplicationStatus);
router.get('/filterApp', filterApplications);
router.post('/scheduleApp', scheduleAppointment);

export default router;