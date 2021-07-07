"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const followRouter_1 = require("./routes/followRouter");
const imageRouter_1 = require("./routes/imageRouter");
const userRouter_1 = require("./routes/userRouter");
const app = express_1.default();
app.use(express_1.default.json());
app.use("/user", userRouter_1.userRouter);
app.use("/image", imageRouter_1.imageRouter);
app.use("/follow", followRouter_1.followRouter);
app.listen(3003, () => {
    console.log(`Servidor rodando em http://localhost:3003`);
});
//# sourceMappingURL=index.js.map