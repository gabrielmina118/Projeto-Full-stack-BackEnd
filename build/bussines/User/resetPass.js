"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Transporter_1 = require("../../services/Transporter");
dotenv_1.default.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
function sendEmailToNewPass(pass, email, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = new Transporter_1.Transporter();
        yield transporter.transporter.sendMail({
            from: `<${process.env.NODEMAILER_USER}>`,
            to: email,
            subject: `Olá ${name} , Somos da INSTALAB e estamos enviando sua nova senha, como solicitado !`,
            text: `Esta é a sua nova senha : ${pass}. Use-a com cuidado`,
            html: `<p>Esta é a sua nova senha : <strong>${pass}</strong>. Use-a com cuidade .</p>`
        });
    });
}
exports.default = sendEmailToNewPass;
//# sourceMappingURL=resetPass.js.map