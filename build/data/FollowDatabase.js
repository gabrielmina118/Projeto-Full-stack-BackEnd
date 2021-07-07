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
exports.FollowDatabase = void 0;
const BaseDatabse_1 = require("./BaseDatabse");
class FollowDatabase extends BaseDatabse_1.BaseDatabase {
    insertFollow(token, idFollow) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    person_follow_id: token,
                    person_followed_id: idFollow
                })
                    .into(FollowDatabase.FOLLOW);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
exports.FollowDatabase = FollowDatabase;
FollowDatabase.FOLLOW = "FOLLOW";
//# sourceMappingURL=FollowDatabase.js.map