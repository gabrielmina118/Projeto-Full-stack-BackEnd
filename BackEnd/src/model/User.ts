export class User {
    constructor(
        private id: string,
        private name: string,
        private nickname: string,
        private email: string,
        private password: string,
        private role: string
    ) { }

    getId() {
        return this.id;
    }

    getName() {
        return this.name
    }

    getNickName() {
        return this.nickname
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getRole() {
        return this.role;
    }

    static stringToUserRole(input: string): UserRole {
        switch (input) {
            case "NORMAL":
                return UserRole.NORMAL;
            case "ADMIN":
                return UserRole.ADMIN;
            default:
                throw new Error("Invalid user role, must be 'NORMAL' or 'ADMIN' with uppercase");
        }
    }

    static toUserModel(user: any): User {
        
        return new User(user.id, user.name, user.nickname, user.email, user.password, User.stringToUserRole(user.role));
    }
}
export interface UserInputDTO {
    name: string;
    email: string;
    nickname: string;
    password: string;
    role: string;
}

export interface LoginInputDTO {
    emailNick:string;
    password: string;
}

export enum UserRole {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}