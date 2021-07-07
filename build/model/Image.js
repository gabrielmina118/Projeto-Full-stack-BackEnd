"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
class Image {
    constructor(id, subtitle, author, data_criacao, file_photo) {
        this.id = id;
        this.subtitle = subtitle;
        this.author = author;
        this.data_criacao = data_criacao;
        this.file_photo = file_photo;
    }
    getId() {
        return this.id;
    }
    getSubtitle() {
        return this.subtitle;
    }
    getAuthor() {
        return this.author;
    }
    getData_criacao() {
        return this.data_criacao;
    }
    getFile_photo() {
        return this.file_photo;
    }
    static toImageModel(image) {
        return new Image(image.id, image.subtitle, image.author, image.data_criacao, image.file_photo);
    }
}
exports.Image = Image;
//# sourceMappingURL=Image.js.map