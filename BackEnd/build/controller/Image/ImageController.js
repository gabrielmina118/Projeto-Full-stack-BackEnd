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
exports.ImageController = void 0;
const ImageBussines_1 = __importDefault(require("../../bussines/Image/ImageBussines"));
const BaseDatabse_1 = require("../../data/BaseDatabse");
class ImageController {
    createImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const input = {
                    subtitle: req.body.subtitle,
                    data_criacao: req.body.data_criacao,
                    file_photo: req.body.file_photo,
                    tags_name: req.body.tags_name
                };
                yield ImageBussines_1.default.createImage(input, token);
                res.status(200).send("Image created successfully");
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ error: error.message });
            }
            finally {
                yield BaseDatabse_1.BaseDatabase.destroyConnection();
            }
        });
    }
    createTag(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const name = req.body.name;
                yield ImageBussines_1.default.createTag(name, token);
                res.status(200).send("Tag created successfully");
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ error: error.message });
            }
            finally {
                yield BaseDatabse_1.BaseDatabase.destroyConnection();
            }
        });
    }
    getTags(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const name = req.params.nomeTags;
                const tagsWihtPhoto = yield ImageBussines_1.default.getTags(name, token);
                res.status(200).send({ tagsWihtPhoto });
            }
            catch (error) {
                res.status(error.statusCode || 400).send({ error: error.message });
            }
            finally {
                yield BaseDatabse_1.BaseDatabase.destroyConnection();
            }
        });
    }
}
exports.ImageController = ImageController;
//# sourceMappingURL=ImageController.js.map