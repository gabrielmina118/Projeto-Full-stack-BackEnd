import * as bcrypt from 'bcryptjs'

export class HashManager{

    public async hashCreate(pass:string):Promise<string>{
        const rounds = 12;
        const salt = await bcrypt.genSalt(rounds);
        const result = await bcrypt.hash(pass, salt);
        return result;
    }

    public async compare(text: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(text, hash);
    }
}