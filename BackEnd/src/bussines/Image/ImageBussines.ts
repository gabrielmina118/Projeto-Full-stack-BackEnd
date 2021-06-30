import { ImageDatabase } from "../../data/ImageDatabase";
import { FieldsNotFoundError } from "../../erro/FieldsNotFoundError";
import { MissingToken } from "../../erro/MissingToken";
import { ImageInputDTO } from "../../model/Image";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";

class ImageBussines {

    constructor(
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createImage(input: ImageInputDTO, token: string) {
        if (!input.data_criacao || !input.file_photo || !input.subtitle || !input.tags_name) {
            throw new FieldsNotFoundError()
        }

        if (!token) {
            throw new MissingToken()
        }

        const resultToken = this.authenticator.getData(token);
        if (!resultToken) {
            throw new Error()
        }

        const id = this.idGenerator.generate();
        const autor = resultToken.id;


        const imageDatabase = new ImageDatabase();
        const tag:string = await imageDatabase.getTag(input.tags_name);
        
        await imageDatabase.createImage(id,input.subtitle,autor,input.data_criacao,input.file_photo,tag);
    }

    async createTag(name: string, token: string) {
        if (!name) {
            throw new FieldsNotFoundError()
        }

        if (!token) {
            throw new MissingToken()
        }

        const resultToken = this.authenticator.getData(token);
        if (!resultToken) {
            throw new Error()
        }

        const id = this.idGenerator.generate();

        const imageDatabase = new ImageDatabase()
        await imageDatabase.createTag(id,name);
    }
    async getTags(name:string,token:string){
        if (!name) {
            throw new FieldsNotFoundError()
        }

        if (!token) {
            throw new MissingToken()
        }

        const resultToken = this.authenticator.getData(token);
        if (!resultToken) {
            throw new Error()
        }

        const imageDatabase = new ImageDatabase()
        const tagsPhoto = await imageDatabase.getAllPhotoTags(name);

        return tagsPhoto;
    }

}
export default new ImageBussines(new IdGenerator, new Authenticator)