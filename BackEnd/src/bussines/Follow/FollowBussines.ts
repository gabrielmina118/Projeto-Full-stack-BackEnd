import { FollowDatabase } from "../../data/FollowDatabase";
import { MissingToken } from "../../erro/MissingToken";
import { Authenticator } from "../../services/Authenticator";

class FollowBussines {

    constructor(
        private authenticator: Authenticator
    ) { }

    async followPerson(token: string, idFollow: string) {

        if (!token || !idFollow) {
            throw new MissingToken()
        }

        const resultToken = this.authenticator.getData(token);

        if (!resultToken) {
            throw new Error()
        }

        const followDatabase = new FollowDatabase()
        await followDatabase.insertFollow(resultToken.id, idFollow)

    }
}
export default new FollowBussines(new Authenticator)
