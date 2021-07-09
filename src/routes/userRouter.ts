import express from "express";
import { UserController } from "../controller/User/UserController";


export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signup);
userRouter.post("/resetpass", userController.resetPass);
userRouter.post("/login", userController.login);
userRouter.get("/feed", userController.feed);
userRouter.get("/personFollow", userController.personFollow);
userRouter.get("/all", userController.feedAll);
userRouter.get("/getPersonProfile", userController.personProfile);

