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
exports.FollowController = void 0;
const FollowBussines_1 = __importDefault(require("../../bussines/Follow/FollowBussines"));
const BaseDatabse_1 = require("../../data/BaseDatabse");
class FollowController {
    follow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const idFollow = req.body.idFollow;
                const message = yield FollowBussines_1.default.followPerson(token, idFollow);
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
    UnFollow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const idUnFollow = req.body.idUnFollow;
                const message = yield FollowBussines_1.default.UnfollowPerson(token, idUnFollow);
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
}
exports.FollowController = FollowController;
//# sourceMappingURL=FollowController.js.map