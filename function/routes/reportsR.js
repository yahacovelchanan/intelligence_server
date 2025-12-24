import express from 'express'
import { addReport, deleteReport, getAllReports, getOneReportById, updateReport } from '../ctrls/reportsC.js'
import { validByUser } from '../middlewares/middlewares.js';
const router = express.Router();


router.get("/",validByUser, getAllReports)
router.get("/:id",validByUser, getOneReportById)
router.post("/",validByUser,addReport)
router.put("/:id",validByUser,updateReport)
router.delete("/:id",validByUser,deleteReport)







export default router;