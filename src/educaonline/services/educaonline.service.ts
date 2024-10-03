import { Injectable, NotFoundException } from '@nestjs/common';
import { IAutor } from '../models/interfaces/autor.interface';
import { IEducaOnline } from '../models/interfaces/educaonline.interface';
import { IEducaOnlineRepository } from '../repositories/interfaces/educaonline.interface.repository';

@Injectable()
export class EducaOnlineService {
  constructor(private readonly postRepository: IEducaOnlineRepository) {}

  async getAllPost(limit: number, page: number) {
    return this.postRepository.getAllPost(limit, page);
  }

  async getPost(postId: string) {
    const post = await this.postRepository.getOnePost(postId);
    if (!post) throw new NotFoundException('post not found');
    return post;
  }

  async getPostAndAutor(autor: IAutor) {
    const post = await this.postRepository.getOnePostAndAutor(autor);
    if (!post) throw new NotFoundException('post not found');
    return post;
  }

  async createPost(post: IEducaOnline) {
    return this.postRepository.createPost(post);
  }

  async updatePost(postId: string, post: IEducaOnline) {
    return this.postRepository.updatePost(postId, post);
  }

  async deletePost(postId: string) {
    return this.postRepository.deletePost(postId);
  }

  async getAllPostSearch(search: string) {
    return this.postRepository.getAllPostSearch(search);
  }
}
