import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabse";

export class UserDatabase extends BaseDatabase {

    private static TABLE_NAME = "USUARIO_ECOMMERCE";

    public async createUser(
        id: string,
        name: string,
        nickname: string,
        email: string,
        password: string,
        role: string,
        image:string
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    name,
                    nickname,
                    email,
                    password,
                    role,
                    photo_profile: image
                })
                .into(UserDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getFeeds(token: string): Promise<[]> {
        try {
            const result = await this.getConnection().raw(`
                select USUARIO_ECOMMERCE.nickname  , USUARIO_IMAGE.file_photo , USUARIO_ECOMMERCE.photo_profile from FOLLOW inner join USUARIO_ECOMMERCE on FOLLOW.person_followed_id = USUARIO_ECOMMERCE.id
                inner join USUARIO_IMAGE on USUARIO_ECOMMERCE.id = USUARIO_IMAGE.author
                where person_follow_id = "${token}";
            `)
            return result[0]

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async upadteNewPass(pass: string, email: string): Promise<void> {
        try {
            await this.getConnection().raw(`
                UPDATE ${UserDatabase.TABLE_NAME} SET password = "${pass}" WHERE email = "${email}"
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getAllPersonFollows(id: string): Promise<any> {
        try {
            const result = await this.getConnection().raw(`
            select person_followed_id , USUARIO_ECOMMERCE.photo_profile from FOLLOW  inner join
            USUARIO_ECOMMERCE on FOLLOW.person_followed_id = USUARIO_ECOMMERCE.id
            where person_follow_id='${id}';
            `)
            return result[0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getPerson(id: string): Promise<any> {
        try {
            const result = await this.getConnection().raw(`
            select USUARIO_ECOMMERCE.name , USUARIO_ECOMMERCE.nickname , USUARIO_ECOMMERCE.photo_profile from USUARIO_ECOMMERCE
            WHERE USUARIO_ECOMMERCE.id ='${id}';
            `)
            return result[0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getPersonPhotos(id: string): Promise<any> {
        try {
            const result = await this.getConnection().raw(`
            select USUARIO_IMAGE.file_photo from USUARIO_ECOMMERCE
            inner join USUARIO_IMAGE on
            USUARIO_IMAGE.author ='${id}' and USUARIO_ECOMMERCE.id ='${id}';
            `)
            return result[0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async updateImage(photo:string,id:string):Promise<void>{
        try {
            await this.getConnection().raw(`
             UPDATE USUARIO_ECOMMERCE SET photo_profile= '${photo}' WHERE id='${id}';
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getAllPerson(id: string): Promise<any> {
        try {
            const result = await this.getConnection().raw(`
                select id,nickname , photo_profile from USUARIO_ECOMMERCE WHERE id <> '${id}';
            `)
            return result[0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getUser(emailNick: string): Promise<User> {

        try {
            const result = await this.getConnection()
                .select("*")
                .from(UserDatabase.TABLE_NAME)
                .where({ nickname: emailNick })
                .orWhere({ email: emailNick })

            if (!result[0]) {
                throw new Error(` Couldn't find user with this '${emailNick}' `)
            }

            return User.toUserModel(result[0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

}