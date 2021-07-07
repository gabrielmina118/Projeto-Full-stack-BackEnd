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
exports.ImageDatabase = void 0;
const BaseDatabse_1 = require("./BaseDatabse");
class ImageDatabase extends BaseDatabse_1.BaseDatabase {
    createImage(id, subtitle, author, data_criacao, file_photo, tags_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id,
                    subtitle,
                    author,
                    data_criacao,
                    file_photo,
                    tags_name
                })
                    .into(ImageDatabase.TABLE_IMAGE);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getTag(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select("id")
                    .from(ImageDatabase.TABLE_TAG)
                    .where('tag_name', `${name}`);
                if (!result) {
                    throw new Error(`cant not found tag like '${name}'`);
                }
                return result[0].id;
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    createTag(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id,
                    tag_name: name
                })
                    .into(ImageDatabase.TABLE_TAG);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getAllPhotoTags(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select("USUARIO_IMAGE.file_photo")
                    .from("USUARIO_IMAGE")
                    .innerJoin("TAGS", "USUARIO_IMAGE.tags_name", "=", "TAGS.id")
                    .where("TAGS.tag_name", `${name}`);
                if (!result.length) {
                    throw new Error(`cant not found tag like '${name}'`);
                }
                return result;
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
exports.ImageDatabase = ImageDatabase;
ImageDatabase.TABLE_IMAGE = "USUARIO_IMAGE";
ImageDatabase.TABLE_TAG = "TAGS";
//# sourceMappingURL=ImageDatabase.js.map