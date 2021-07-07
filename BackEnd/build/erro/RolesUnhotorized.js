"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesUnhotorized = void 0;
const BaseError_1 = require("./BaseError");
class RolesUnhotorized extends BaseError_1.BaseError {
    constructor() {
        super(" Just 'ADMIN' can use this endpoint", 401);
    }
}
exports.RolesUnhotorized = RolesUnhotorized;
//# sourceMappingURL=RolesUnhotorized.js.map