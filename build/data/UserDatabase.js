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
exports.UserDatabase = void 0;
const User_1 = require("../model/User");
const BaseDatabse_1 = require("./BaseDatabse");
class UserDatabase extends BaseDatabse_1.BaseDatabase {
    createUser(id, name, nickname, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id,
                    name,
                    nickname,
                    email,
                    password,
                    role
                })
                    .into(UserDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getFeeds(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection().raw(`
                select USUARIO_ECOMMERCE.nickname  , USUARIO_IMAGE.file_photo from FOLLOW inner join USUARIO_ECOMMERCE on FOLLOW.person_followed_id = USUARIO_ECOMMERCE.id
                inner join USUARIO_IMAGE on USUARIO_ECOMMERCE.id = USUARIO_IMAGE.author
                where person_follow_id = "${token}";
            `);
                return result[0];
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    upadteNewPass(pass, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection().raw(`
                UPDATE ${UserDatabase.TABLE_NAME} SET password = "${pass}" WHERE email = "${email}"
            `);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getUser(emailNick) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select("*")
                    .from(UserDatabase.TABLE_NAME)
                    .where({ nickname: emailNick })
                    .orWhere({ email: emailNick });
                if (!result[0]) {
                    throw new Error(` Couldn't find user with this '${emailNick}' `);
                }
                return User_1.User.toUserModel(result[0]);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_NAME = "USUARIO_ECOMMERCE";
//# sourceMappingURL=UserDatabase.js.map