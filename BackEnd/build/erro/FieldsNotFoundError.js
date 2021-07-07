"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsNotFoundError = void 0;
const BaseError_1 = require("./BaseError");
class FieldsNotFoundError extends BaseError_1.BaseError {
    constructor() {
        super("Missing fields to complet", 400);
    }
}
exports.FieldsNotFoundError = FieldsNotFoundError;
//# sourceMappingURL=FieldsNotFoundError.js.map