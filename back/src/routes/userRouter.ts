import { Router } from "express";
import {
  getAllUsersController,
  getUsersByIdController,
  createUserController,
  loginUserController,
  deleteUserController,
} from "../controllers/UserController";

const userRouter: Router = Router();

userRouter.get("/", getAllUsersController);
userRouter.get("/:id", getUsersByIdController);
userRouter.post("/register", createUserController);
userRouter.post("/login", loginUserController);
userRouter.delete("/delete/:id", deleteUserController);

export default userRouter;
