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
const ImageDatabase_1 = require("../../data/ImageDatabase");
const FieldsNotFoundError_1 = require("../../erro/FieldsNotFoundError");
const MissingToken_1 = require("../../erro/MissingToken");
const Authenticator_1 = require("../../services/Authenticator");
const IdGenerator_1 = require("../../services/IdGenerator");
class ImageBussines {
    constructor(idGenerator, authenticator) {
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
    }
    createImage(input, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.data_criacao || !input.file_photo || !input.subtitle || !input.tags_name) {
                throw new FieldsNotFoundError_1.FieldsNotFoundError();
            }
            if (!token) {
                throw new MissingToken_1.MissingToken();
            }
            const resultToken = this.authenticator.getData(token);
            if (!resultToken) {
                throw new Error();
            }
            const id = this.idGenerator.generate();
            const autor = resultToken.id;
            const imageDatabase = new ImageDatabase_1.ImageDatabase();
            const tag = yield imageDatabase.getTag(input.tags_name);
            yield imageDatabase.createImage(id, input.subtitle, autor, input.data_criacao, input.file_photo, tag);
        });
    }
    createTag(name, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name) {
                throw new FieldsNotFoundError_1.FieldsNotFoundError();
            }
            if (!token) {
                throw new MissingToken_1.MissingToken();
            }
            const resultToken = this.authenticator.getData(token);
            if (!resultToken) {
                throw new Error();
            }
            const id = this.idGenerator.generate();
            const imageDatabase = new ImageDatabase_1.ImageDatabase();
            yield imageDatabase.createTag(id, name);
        });
    }
    getTags(name, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name) {
                throw new FieldsNotFoundError_1.FieldsNotFoundError();
            }
            if (!token) {
                throw new MissingToken_1.MissingToken();
            }
            const resultToken = this.authenticator.getData(token);
            if (!resultToken) {
                throw new Error();
            }
            const imageDatabase = new ImageDatabase_1.ImageDatabase();
            const tagsPhoto = yield imageDatabase.getAllPhotoTags(name);
            return tagsPhoto;
        });
    }
}
exports.default = new ImageBussines(new IdGenerator_1.IdGenerator, new Authenticator_1.Authenticator);
//# sourceMappingURL=ImageBussines.js.map