import { BaseDatabase } from "./BaseDatabse";

export class FollowDatabase extends BaseDatabase {

    private static FOLLOW = "FOLLOW";

    public async insertFollow(
        token: string,
        idFollow: string
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    person_follow_id: token,
                    person_followed_id: idFollow
                })
                .into(FollowDatabase.FOLLOW)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async removeFollow(
        idToken: string,
        idFollow: string
    ): Promise<void> {
        try {
            await this.getConnection().raw(`
            delete from FOLLOW where person_followed_id = '${idFollow}' and person_follow_id = '${idToken}'
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

}