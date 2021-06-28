import { BaseError } from "./BaseError";

export class RolesUnhotorized extends BaseError{
    constructor(){
        super(" Just 'ADMIN' can use this endpoint",401);
    }
}
