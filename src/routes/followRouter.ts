import express from "express";
import { FollowController } from "../controller/Follow/FollowController";


export const followRouter = express.Router();

const followController = new FollowController();

followRouter.post("/followPerson", followController.follow);
followRouter.post("/unFollowPerson", followController.UnFollow);

