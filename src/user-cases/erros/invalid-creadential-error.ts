
export class InvalidCrendtialsError extends Error{
    constructor(){
        super('username or password incorrect')
    }
}