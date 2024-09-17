import { Person } from "@/entities/person.entities";
import { PersonRepo } from "@/repositories/person.repo";

export class CreatePersonUseCase {

    constructor(private repo: PersonRepo){}
    
    handler(person: Person) {
        return this.repo.create(person);
    }

}