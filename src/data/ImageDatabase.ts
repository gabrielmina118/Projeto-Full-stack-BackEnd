import { Image } from "../model/Image";
import { BaseDatabase } from "./BaseDatabse";

export class ImageDatabase extends BaseDatabase {

    private static TABLE_IMAGE = "USUARIO_IMAGE";
    private static TABLE_TAG = "TAGS";


    public async createImage(
        id: string,
        subtitle: string,
        author: string,
        data_criacao: Date,
        file_photo: string,
        tags_name: string
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    subtitle,
                    author,
                    data_criacao,
                    file_photo,
                    tags_name
                })
                .into(ImageDatabase.TABLE_IMAGE)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getTag(name: string): Promise<any> {

        try {
            const result = await this.getConnection()
                .select("id")
                .from(ImageDatabase.TABLE_TAG)
                .where('tag_name', `${name}`)

            if (!result) {
                throw new Error(`cant not found tag like '${name}'`)
            }
            return result[0].id;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async createTag(
        id: string,
        name: string
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    tag_name: name
                })
                .into(ImageDatabase.TABLE_TAG);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async allTags(): Promise<any[]> {
        try {
            const result = await this.getConnection()
                .select("tag_name")
                .from(ImageDatabase.TABLE_TAG)

            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getAllPhotoTags(
        name: string
    ): Promise<any> {
        try {
            const result = await this.getConnection()
                .select("USUARIO_IMAGE.file_photo")
                .from("USUARIO_IMAGE")
                .innerJoin("TAGS", "USUARIO_IMAGE.tags_name", "=", "TAGS.id")
                .where("TAGS.tag_name", `${name}`)
            if (!result.length) {
                throw new Error(`cant not found tag like '${name}' or just created and there is no photo`)
            }
            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}