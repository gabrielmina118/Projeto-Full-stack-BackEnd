import { UserDatabase } from "../../data/UserDatabase";
import { FieldsNotFoundError } from "../../erro/FieldsNotFoundError";
import { MissingToken } from "../../erro/MissingToken";
import { LoginInputDTO, UserInputDTO } from "../../model/User";
import { Authenticator } from "../../services/Authenticator";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/IdGenerator";

class UserBussines {
    constructor(
        private idGenerator: IdGenerator,
        private hashmanager: HashManager,
        private authenticator: Authenticator
    ) { }

    async createUser(input: UserInputDTO) {

        if (!input.name || !input.nickname || !input.email || !input.password || !input.role) {
            throw new FieldsNotFoundError()
        }

        const password = await this.hashmanager.hashCreate(input.password);
        const id = this.idGenerator.generate();

        const userData = new UserDatabase();
        await userData.createUser(id, input.name, input.nickname, input.email, password, input.role)

        const acessToken = this.authenticator.generateToken({ id, role: input.role })

        return acessToken;
    }

    async followPerson(token: string, followPerson: string) {
        
        if (!token) {
            throw new MissingToken()
        }

        const resultToken = this.authenticator.getData(token);
        const followToken = this.authenticator.getData(followPerson);
        if (!resultToken) {
            throw new Error()
        }
        console.log(resultToken.id);
        console.log(followToken.id);
        
        
    }

    async loginUser(input: LoginInputDTO) {


        if (!input.emailNick || !input.password) {
            throw new FieldsNotFoundError();
        }

        const loginUser = new UserDatabase();
        const userDB = await loginUser.getUser(input.emailNick);

        const correcPass = await this.hashmanager.compare(input.password, userDB.getPassword());

        if (!correcPass) {
            throw new Error("Invalid Password!");
        }

        const acessToken = this.authenticator.generateToken({ id: userDB.getId(), role: userDB.getRole() })

        return acessToken;
    }
}
export default new UserBussines(new IdGenerator, new HashManager, new Authenticator)