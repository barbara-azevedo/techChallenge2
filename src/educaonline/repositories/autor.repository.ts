import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Autor } from '../models/autor.entities';
import { IAutor } from '../models/interfaces/autor.interface';
import { IAutorRepository } from './interfaces/autor.interface.repository';

export class AutorRepository implements IAutorRepository {
  constructor(@InjectModel(Autor.name) private autorModel: Model<IAutor>) {}
  getFindAutorSearch(search: string): Promise<IAutor[]> {
    return this.autorModel.find({ nome: search });
  }

  getAllAutorSearch(search: string): Promise<IAutor[]> {
    return this.autorModel.find({ nome: { $regex: search } });
  }

  getAllAutor(limit: number, page: number): Promise<IAutor[]> {
    const offset = (page - 1) * limit;
    return this.autorModel.find().skip(offset).limit(limit).exec();
  }

  getOneAutor(id: string): Promise<IAutor> {
    return this.autorModel.findById({ _id: id }).exec();
  }

  async createAutor(autor: IAutor): Promise<void> {
    autor.dtCriacao = new Date();
    const createUser = new this.autorModel(autor);
    await createUser.save();
  }

  async updateAutor(autorId: string, autor: IAutor): Promise<void> {
    autor.dtModificacao = new Date();
    autor.id = autorId;
    await this.autorModel
      .updateOne(
        { _id: autorId },
        {
          nome: autor.nome,
        },
      )
      .exec();
  }

  async deleteAutor(autorId: string): Promise<void> {
    await this.autorModel.deleteOne({ _id: autorId }).exec();
  }
}
