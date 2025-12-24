import express from 'express'
import { addUser, deleteUser, getAllUsers, updateUser } from '../ctrls/usersC.js'
import { validByUser } from '../middlewares/middlewares.js';

const router = express.Router();
router.get("/",validByUser,getAllUsers)
router.post("/",validByUser,addUser)
router.put("/:username",validByUser,updateUser)
router.delete("/username",validByUser,deleteUser)



export default router