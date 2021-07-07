import { BaseError } from "./BaseError";

export class MissingToken extends BaseError{
    constructor(){
        super("TOKEN MUST BE PASS",404)
    }
}