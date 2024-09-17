import { EducaOnline } from "@/entities/educa.online.entities";
import { EducaOnlineRepo } from "@/repositories/educa.repo";

export class CreateEducaOnlineUseCase {

    constructor(private repo: EducaOnlineRepo) { }
    async handler(post: EducaOnline): Promise<EducaOnline | undefined> {
        return this.repo.create(post);
    }
}

export class UpdateEducaOnlineUseCase {

    constructor(private repo: EducaOnlineRepo) { }
    async handler(post: EducaOnline): Promise<EducaOnline | undefined> {
        return this.repo.update(post);
    }
}