import { BaseError } from "./BaseError";

export class FieldsNotFoundError extends BaseError{
    constructor(){
        super("Missing fields to complet",404)
    }
}