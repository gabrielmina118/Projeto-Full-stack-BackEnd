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
exports.UserController = void 0;
const UserBussines_1 = __importDefault(require("../../bussines/User/UserBussines"));
const BaseDatabse_1 = require("../../data/BaseDatabse");
const User_1 = require("../../model/User");
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    name: req.body.name,
                    email: req.body.email,
                    nickname: req.body.nickname,
                    password: req.body.password,
                    role: User_1.User.stringToUserRole(req.body.role)
                };
                const token = yield UserBussines_1.default.createUser(input);
                res.status(200).send({ token });
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ error: error.message });
            }
            finally {
                yield BaseDatabse_1.BaseDatabase.destroyConnection();
            }
        });
    }
    resetPass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const message = yield UserBussines_1.default.resetPass(email);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ error: error.message });
            }
            finally {
                yield BaseDatabse_1.BaseDatabase.destroyConnection();
            }
        });
    }
    feed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const feeds = yield UserBussines_1.default.getFeed(token);
                res.status(200).send({ feeds });
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ error: error.message });
            }
            finally {
                yield BaseDatabse_1.BaseDatabase.destroyConnection();
            }
        });
    }
    feedAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const allPersons = yield UserBussines_1.default.getAllPerson(token);
                res.status(200).send({ allPersons });
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ error: error.message });
            }
            finally {
                yield BaseDatabse_1.BaseDatabase.destroyConnection();
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let email = "";
                let nickname = "";
                const emailOrNick = req.body.emailOrNick;
                if (!(emailOrNick.indexOf("@") === -1)) {
                    email = emailOrNick;
                }
                else {
                    nickname = emailOrNick;
                }
                const emailNick = (email || nickname);
                const input = {
                    emailNick,
                    password: req.body.password
                };
                const token = yield UserBussines_1.default.loginUser(input);
                res.status(200).send({ token });
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ error: error.message });
            }
            finally {
                yield BaseDatabse_1.BaseDatabase.destroyConnection();
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map