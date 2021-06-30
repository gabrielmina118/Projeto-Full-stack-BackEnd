export class Image {
    constructor(
        private id: string,
        private subtitle: string,
        private author: string,
        private data_criacao: Date,
        private file_photo: string
    ) { }

    getId() {
        return this.id;
    }

    getSubtitle() {
        return this.subtitle
    }

    getAuthor() {
        return this.author
    }

    getData_criacao() {
        return this.data_criacao;
    }

    getFile_photo() {
        return this.file_photo;
    }

    static toImageModel(image: any): Image {
        return new Image(image.id, image.subtitle, image.author, image.data_criacao, image.file_photo);
    }
}

export interface ImageInputDTO {
    subtitle: string,
    data_criacao: Date,
    file_photo: string,
    tags_name:string
}