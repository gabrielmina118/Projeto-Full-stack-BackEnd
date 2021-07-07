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
const UserDatabase_1 = require("../../data/UserDatabase");
const FieldsNotFoundError_1 = require("../../erro/FieldsNotFoundError");
const MissingToken_1 = require("../../erro/MissingToken");
const Authenticator_1 = require("../../services/Authenticator");
const HashManager_1 = require("../../services/HashManager");
const IdGenerator_1 = require("../../services/IdGenerator");
const resetPass_1 = __importDefault(require("./resetPass"));
class UserBussines {
    constructor(idGenerator, hashmanager, authenticator) {
        this.idGenerator = idGenerator;
        this.hashmanager = hashmanager;
        this.authenticator = authenticator;
    }
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.name || !input.nickname || !input.email || !input.password || !input.role) {
                throw new FieldsNotFoundError_1.FieldsNotFoundError();
            }
            const password = yield this.hashmanager.hashCreate(input.password);
            const id = this.idGenerator.generate();
            const userData = new UserDatabase_1.UserDatabase();
            yield userData.createUser(id, input.name, input.nickname, input.email, password, input.role);
            const acessToken = this.authenticator.generateToken({ id, role: input.role });
            return acessToken;
        });
    }
    resetPass(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                throw new FieldsNotFoundError_1.FieldsNotFoundError();
            }
            const emailA = new UserDatabase_1.UserDatabase();
            const emailAlreadExist = yield emailA.getUser(email);
            const newPass = "teste123";
            const newHash = yield this.hashmanager.hashCreate(newPass);
            yield emailA.upadteNewPass(newHash, emailAlreadExist.getEmail());
            yield resetPass_1.default(newPass, emailAlreadExist.getEmail(), emailAlreadExist.getName());
            return `Enviamos uma nova senha para '${email}'`;
        });
    }
    getFeed(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new MissingToken_1.MissingToken();
            }
            const resultToken = this.authenticator.getData(token);
            if (!resultToken) {
                throw new Error();
            }
            const feeds = new UserDatabase_1.UserDatabase();
            const allFeeds = yield feeds.getFeeds(resultToken.id);
            return allFeeds;
        });
    }
    loginUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.emailNick || !input.password) {
                throw new FieldsNotFoundError_1.FieldsNotFoundError();
            }
            const loginUser = new UserDatabase_1.UserDatabase();
            const userDB = yield loginUser.getUser(input.emailNick);
            const correcPass = yield this.hashmanager.compare(input.password, userDB.getPassword());
            if (!correcPass) {
                throw new Error("Invalid Password!");
            }
            const acessToken = this.authenticator.generateToken({ id: userDB.getId(), role: userDB.getRole() });
            return acessToken;
        });
    }
}
exports.default = new UserBussines(new IdGenerator_1.IdGenerator, new HashManager_1.HashManager, new Authenticator_1.Authenticator);
//# sourceMappingURL=UserBussines.js.map