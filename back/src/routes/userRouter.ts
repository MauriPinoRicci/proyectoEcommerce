import { Router } from "express";
import {
  getUsersController,
  getUsersByIdController,
  createUserController,
  loginUserController,
  deleteUserController,
} from "../controllers/UserController";

const userRouter: Router = Router();

userRouter.get("/", getUsersController);
userRouter.get("/:id", getUsersByIdController);
userRouter.post("/register", createUserController);
userRouter.post("/login", loginUserController);
userRouter.delete("/delete/:id", deleteUserController);

export default userRouter;
