export class ResourcesNotFoundErrors extends Error {
    constructor() {
        super('Resource not found');
    }
}