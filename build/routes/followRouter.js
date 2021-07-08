"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRouter = void 0;
const express_1 = __importDefault(require("express"));
const FollowController_1 = require("../controller/Follow/FollowController");
exports.followRouter = express_1.default.Router();
const followController = new FollowController_1.FollowController();
exports.followRouter.post("/followPerson", followController.follow);
exports.followRouter.post("/unFollowPerson", followController.UnFollow);
//# sourceMappingURL=followRouter.js.map