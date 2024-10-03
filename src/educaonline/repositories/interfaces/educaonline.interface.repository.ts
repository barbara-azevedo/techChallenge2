import { IAutor } from 'src/educaonline/models/interfaces/autor.interface';
import { IEducaOnline } from '../../models/interfaces/educaonline.interface';

export abstract class IEducaOnlineRepository {
  abstract getAllPost(
    limit: number,
    page: number,
  ): Promise<IEducaOnline[] & IAutor>;
  abstract getOnePost(postId: string): Promise<IEducaOnline>;
  abstract getOnePostAndAutor(autor: IAutor): Promise<IEducaOnline[]>;
  abstract getAllPostSearch(search: string): Promise<IEducaOnline[]>;
  abstract createPost(post: IEducaOnline): Promise<void>;
  abstract updatePost(postId: string, post: IEducaOnline): Promise<void>;
  abstract deletePost(postId: string): Promise<void>;
}
