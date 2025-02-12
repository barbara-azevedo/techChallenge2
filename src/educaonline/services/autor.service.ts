import { Injectable, NotFoundException } from '@nestjs/common';
import { IAutor } from '../models/interfaces/autor.interface';
import { IAutorRepository } from '../repositories/interfaces/autor.interface.repository';

@Injectable()
export class AutorService {
  constructor(private readonly autorRepository: IAutorRepository) {}

  async getAllAutor(limit: number, page: number) {
    return this.autorRepository.getAllAutor(limit, page);
  }

  async getAutorId(autorId: string) {
    const autor = await this.autorRepository.getOneAutor(autorId);
    if (!autor) throw new NotFoundException('autor not found');
    return autor;
  }

  async getAutor(autorId: string) {
    const autor = await this.autorRepository.getOneAutor(autorId);
    if (!autor) throw new NotFoundException('autor not found');
    return autor;
  }

  async createAutor(autor: IAutor) {
    autor.dtCriacao = new Date();
    autor.dtModificacao = new Date();
    return this.autorRepository.createAutor(autor);
  }

  async updateAutor(autorId: string, autor: IAutor) {
    return this.autorRepository.updateAutor(autorId, autor);
  }

  async deleteAutor(autorId: string) {
    return this.autorRepository.deleteAutor(autorId);
  }

  async getAllAutorSearch(search: string) {
    return this.autorRepository.getAllAutorSearch(search);
  }

  async getFindAutorSearch(search: string) {
    return this.autorRepository.getFindAutorSearch(search);
  }
}
