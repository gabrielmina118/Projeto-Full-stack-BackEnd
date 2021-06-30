import { Request, Response } from "express";
import  ImageBussines  from "../../bussines/Image/ImageBussines";
import { BaseDatabase } from "../../data/BaseDatabse";
import { ImageInputDTO } from "../../model/Image";

class ImageController {

    async createImage(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;

            const input: ImageInputDTO = {
                subtitle: req.body.subtitle,
                data_criacao: req.body.data_criacao,
                file_photo: req.body.file_photo,
                tags_name:req.body.tags_name
            }
            await ImageBussines.createImage(input,token)
            res.status(200).send("Image created successfully")
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message });
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    async createTag(req:Request,res:Response){
        try {
            const token = req.headers.authorization as string;
            const name = req.body.name as string;

            await ImageBussines.createTag(name,token);

            res.status(200).send("Tag created successfully")
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message });
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }
    async getTags(req:Request,res:Response){
        try {
            const token = req.headers.authorization as string;
            const name = req.params.nomeTags as string;

            const tagsWihtPhoto = await ImageBussines.getTags(name,token);

            res.status(200).send({tagsWihtPhoto})
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message });
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }
}

export { ImageController }