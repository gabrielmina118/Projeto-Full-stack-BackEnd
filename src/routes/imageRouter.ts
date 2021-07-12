import express from "express";
import { ImageController } from "../controller/Image/ImageController";



export const imageRouter = express.Router();

const imageController = new ImageController();

imageRouter.post("/createTag",imageController.createTag)
imageRouter.post("/createImage",imageController.createImage)
imageRouter.get("/allTags/:nomeTags",imageController.getTags)
imageRouter.get("/allTags",imageController.getAllTags)