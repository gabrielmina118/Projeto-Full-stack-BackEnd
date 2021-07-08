import { FollowDatabase } from "../../data/FollowDatabase";
import { FieldsNotFoundError } from "../../erro/FieldsNotFoundError";
import { MissingToken } from "../../erro/MissingToken";
import { Authenticator } from "../../services/Authenticator";

class FollowBussines {

    constructor(
        private authenticator: Authenticator
    ) { }

    async followPerson(token: string, idFollow: string) {

        if(!idFollow){
            throw new FieldsNotFoundError()
        }

        if (!token) {
            throw new MissingToken()
        }

        const resultToken = this.authenticator.getData(token);

        if (!resultToken) {
            throw new Error()
        }

        const followDatabase = new FollowDatabase()
        await followDatabase.insertFollow(resultToken.id, idFollow)

        return "Follow sucessefully";
    }

    async UnfollowPerson(token:string,idUnFollow:string){
        if(!idUnFollow){
            throw new FieldsNotFoundError()
        }

        if (!token) {
            throw new MissingToken()
        }

        const resultToken = this.authenticator.getData(token);

        if (!resultToken) {
            throw new Error()
        }

        const followDatabase = new FollowDatabase()
        await followDatabase.removeFollow(resultToken.id, idUnFollow)

        return "UnFollow Person sucessefully"
    }
}
export default new FollowBussines(new Authenticator)
