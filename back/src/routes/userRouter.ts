import { Router } from "express";
import {getUsers,getUsersById,createUser,loginUser} from "../controllers/UserController"

const router: Router = Router();

router.get("/",getUsers)
router.get("/:id", getUsersById)
router.post("/register", createUser)
router.post("/login", loginUser)

export default router;