"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.User = void 0;
class User {
    constructor(id, name, nickname, email, password, role) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getNickName() {
        return this.nickname;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
    static stringToUserRole(input) {
        switch (input) {
            case "NORMAL":
                return UserRole.NORMAL;
            case "ADMIN":
                return UserRole.ADMIN;
            default:
                throw new Error("Invalid user role, must be 'NORMAL' or 'ADMIN' with uppercase");
        }
    }
    static toUserModel(user) {
        return new User(user.id, user.name, user.nickname, user.email, user.password, User.stringToUserRole(user.role));
    }
}
exports.User = User;
var UserRole;
(function (UserRole) {
    UserRole["NORMAL"] = "NORMAL";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
//# sourceMappingURL=User.js.map