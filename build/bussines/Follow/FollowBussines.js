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
Object.defineProperty(exports, "__esModule", { value: true });
const FollowDatabase_1 = require("../../data/FollowDatabase");
const FieldsNotFoundError_1 = require("../../erro/FieldsNotFoundError");
const MissingToken_1 = require("../../erro/MissingToken");
const Authenticator_1 = require("../../services/Authenticator");
class FollowBussines {
    constructor(authenticator) {
        this.authenticator = authenticator;
    }
    followPerson(token, idFollow) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!idFollow) {
                throw new FieldsNotFoundError_1.FieldsNotFoundError();
            }
            if (!token) {
                throw new MissingToken_1.MissingToken();
            }
            const resultToken = this.authenticator.getData(token);
            if (!resultToken) {
                throw new Error();
            }
            const followDatabase = new FollowDatabase_1.FollowDatabase();
            yield followDatabase.insertFollow(resultToken.id, idFollow);
            return "Follow sucessefully";
        });
    }
    UnfollowPerson(token, idUnFollow) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!idUnFollow) {
                throw new FieldsNotFoundError_1.FieldsNotFoundError();
            }
            if (!token) {
                throw new MissingToken_1.MissingToken();
            }
            const resultToken = this.authenticator.getData(token);
            if (!resultToken) {
                throw new Error();
            }
            const followDatabase = new FollowDatabase_1.FollowDatabase();
            yield followDatabase.removeFollow(resultToken.id, idUnFollow);
            return "UnFollow Person sucessefully";
        });
    }
}
exports.default = new FollowBussines(new Authenticator_1.Authenticator);
//# sourceMappingURL=FollowBussines.js.map