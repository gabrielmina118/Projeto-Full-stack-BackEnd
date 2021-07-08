"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/User/UserController");
exports.userRouter = express_1.default.Router();
const userController = new UserController_1.UserController();
exports.userRouter.post("/signup", userController.signup);
exports.userRouter.post("/resetpass", userController.resetPass);
exports.userRouter.post("/login", userController.login);
exports.userRouter.get("/feed", userController.feed);
exports.userRouter.get("/all", userController.feedAll);
//# sourceMappingURL=userRouter.js.map