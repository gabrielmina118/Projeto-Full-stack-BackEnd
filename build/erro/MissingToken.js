"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingToken = void 0;
const BaseError_1 = require("./BaseError");
class MissingToken extends BaseError_1.BaseError {
    constructor() {
        super("TOKEN MUST BE PASS", 404);
    }
}
exports.MissingToken = MissingToken;
//# sourceMappingURL=MissingToken.js.map