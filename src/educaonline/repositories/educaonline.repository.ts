import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducaOnline } from 'src/educaonline/models/educaonline.entities';
import { IEducaOnline } from 'src/educaonline/models/interfaces/educaonline.interface';
import { Autor } from '../models/autor.entities';
import { IAutor } from '../models/interfaces/autor.interface';
import { IEducaOnlineRepository } from './interfaces/educaonline.interface.repository';

export class EducaOnlineRepository implements IEducaOnlineRepository {
  constructor(
    @InjectModel(EducaOnline.name) private postModel: Model<IEducaOnline>,
  ) {}

  async getOnePostAndAutor(autor: IAutor): Promise<IEducaOnline[]> {
    return this.postModel.find({ autor: autor }).exec();
  }

  getAllPostSearch(search: string): Promise<IEducaOnline[]> {
    return this.postModel.find({ conteudo: { $regex: search } });
  }

  getAllPost(limit: number, page: number): Promise<IEducaOnline[] & IAutor> {
    const offset = (page - 1) * limit;
    return this.postModel
      .find()
      .populate('autor', null, Autor.name)
      .skip(offset)
      .limit(limit)
      .exec();
  }

  getOnePost(postId: string): Promise<IEducaOnline> {
    return this.postModel.findById(postId).exec();
  }

  async createPost(post: IEducaOnline): Promise<void> {
    post.dtCriacao = new Date();
    const createUser = new this.postModel(post);
    await createUser.save();
  }

  async updatePost(postId: string, post: IEducaOnline): Promise<void> {
    post.dtModificacao = new Date();
    post.id = postId;

    await this.postModel
      .updateOne(
        { _id: postId },
        {
          titulo: post.titulo,
          conteudo: post.conteudo,
          dtModificacao: post.dtModificacao,
          autor: post.autor,
        },
      )
      .exec();
  }

  async deletePost(postId: string): Promise<void> {
    await this.postModel.deleteOne({ _id: postId }).exec();
  }
}
