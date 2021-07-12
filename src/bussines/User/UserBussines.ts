import { UserDatabase } from "../../data/UserDatabase";
import { FieldsNotFoundError } from "../../erro/FieldsNotFoundError";
import { MissingToken } from "../../erro/MissingToken";
import { LoginInputDTO, UserInputDTO } from "../../model/User";
import { Authenticator } from "../../services/Authenticator";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/IdGenerator";
import { Transporter } from "../../services/Transporter";
import sendEmailToNewPass from "./resetPass";

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

    async resetPass(email: string): Promise<string> {

        if (!email) {
            throw new FieldsNotFoundError();
        }

        const emailA = new UserDatabase();
        const emailAlreadExist = await emailA.getUser(email);

        const newPass = "teste123";

        const newHash = await this.hashmanager.hashCreate(newPass);
        await emailA.upadteNewPass(newHash, emailAlreadExist.getEmail());

        await sendEmailToNewPass(newPass, emailAlreadExist.getEmail(), emailAlreadExist.getName());

        return `Enviamos uma nova senha para '${email}'`;
    }

    async getPersonFollows(token: string) {
        if (!token) {
            throw new MissingToken()
        }

        const resultToken = this.authenticator.getData(token);
        if (!resultToken) {
            throw new Error()
        }

        const personFollows = new UserDatabase();

        const allPersonsFollows = await personFollows.getAllPersonFollows(resultToken.id);

        return allPersonsFollows;
    }


    async getpersonProfile(token:string, id:string){
        if (!token) {
            throw new MissingToken()
        }

        const resultToken = this.authenticator.getData(token);
        if (!resultToken) {
            throw new Error()
        }

        const personProfile = new UserDatabase();

        const profile = await personProfile.getPerson(id);
        const profile_photos = await personProfile.getPersonPhotos(id)

        console.log(profile);
        console.log(profile_photos);
        
        return [profile[0],profile_photos];
    }

    async getAllPerson(token: string) {
        if (!token) {
            throw new MissingToken()
        }

        const resultToken = this.authenticator.getData(token);
        if (!resultToken) {
            throw new Error()
        }

        const feeds = new UserDatabase();

        const allPersons = await feeds.getAllPerson(resultToken.id);

        return allPersons;
    }

    async getFeed(token: string) {

        if (!token) {
            throw new MissingToken()
        }

        const resultToken = this.authenticator.getData(token);
        if (!resultToken) {
            throw new Error()
        }

    
        const feeds = new UserDatabase();

        const allFeeds = await feeds.getFeeds(resultToken.id);

        return [allFeeds,resultToken.id];
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