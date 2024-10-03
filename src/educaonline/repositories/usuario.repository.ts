import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsuario } from 'src/educaonline/models/interfaces/usuario.interface';
import { Usuario } from 'src/educaonline/models/usuario.entities';
import { IUsuarioRepository } from './interfaces/usuario.interface.repository';

export class UsuarioRepository implements IUsuarioRepository {
  constructor(@InjectModel(Usuario.name) private userModel: Model<IUsuario>) {}
  async updateUser(user: IUsuario): Promise<void> {
    user.dtModificacao = new Date();
    await this.userModel.updateOne(user).exec();
  }

  getOneUser(user: IUsuario): Promise<IUsuario> {
    return this.userModel.findOne({ email: { $regex: user.email } }).exec();
  }

  async createUser(user: IUsuario): Promise<void> {
    user.dtCriacao = new Date();
    user.dtModificacao = new Date();
    const createUser = new this.userModel(user);

    const u = await this.getOneUser(user);

    if (u) throw new BadRequestException('User found');

    await createUser.save();
  }
}
