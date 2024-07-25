import { Router } from "express";
import { getUsersController, getUsersByIdController, createUserController } from '../controllers/UserController';

const userRouter: Router = Router();

userRouter.get("/",getUsersController)
userRouter.get("/:id", getUsersByIdController)
userRouter.post("/register", createUserController)
// userRouter.post("/login", loginUser)
// userRouter.delete("/delete", deleteUser)
// loginUser,deleteUser

export default userRouter;