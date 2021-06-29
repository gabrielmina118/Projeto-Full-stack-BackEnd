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
        role: string
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    name,
                    nickname,
                    email,
                    password,
                    role
                })
                .into(UserDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getUser(emailNick:string):Promise<User>{
        console.log(emailNick);
        
        const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({nickname:emailNick})
        .orWhere({email:emailNick})

        if (!result[0]) {
            throw new Error(` Couldn't find user with this '${emailNick}' `)
        }

        return User.toUserModel(result[0]);
    }

}