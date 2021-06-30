import { Request, Response } from "express";
import  FollowBussines  from "../../bussines/Follow/FollowBussines";
import { BaseDatabase } from "../../data/BaseDatabse";


class FollowController {

    async follow(req: Request, res: Response){
        try {
            const token = req.headers.authorization as string;
            const idFollow = req.body.idFollow as string;

            await FollowBussines.followPerson(token,idFollow)

            res.status(200).send("Follow sucessefully")
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message });
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }


}
export {FollowController}