import express from 'express'
import { addAgent, deleteAgent, getAllAgents, getOneAgentsById, updateAgent } from '../ctrls/agentsC.js'
import { validByUser } from '../middlewares/middlewares.js';

const router = express.Router();


router.get("/",validByUser, getAllAgents)
router.get("/:id",validByUser, getOneAgentsById)
router.post("/",validByUser,addAgent)
router.put("/:id",validByUser,updateAgent)
router.delete("/:id",validByUser,deleteAgent)







export default router;