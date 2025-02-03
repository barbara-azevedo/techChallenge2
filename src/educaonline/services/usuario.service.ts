import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { IUsuario } from '../models/interfaces/usuario.interface';
import { IUsuarioRepository } from '../repositories/interfaces/usuario.interface.repository';

@Injectable()
export class UsuarioService {
  jwtOptions: { secret: string; verify: { algorithms: string[] } };
  constructor(private readonly userRepository: IUsuarioRepository) {
    this.jwtOptions = {
      secret: 'postech',
      verify: { algorithms: ['HS256'] },
    };
  }

  async getTokenUser(user: IUsuario) {
    const findUser = await this.userRepository.getOneUser(user);
    const doesPasswordMath = await compare(user.senha, findUser.senha);

    if (!doesPasswordMath) {
      throw new UnauthorizedException();
    }
    const jwtService = new JwtService();
    const token = await jwtService.signAsync(
      {},
      {
        secret: 'postech',
        expiresIn: '5h',
        jwtid: uuidv4(),
      },
    );

    return { token };
  }

  async getOneUser(user: IUsuario) {
    let findUser = await this.userRepository.getOneUser(user);
    findUser.senha='';
    return { findUser };
  }

  async createUser(user: IUsuario) {
    return this.userRepository.createUser(user);
  }

  async updateUser(user: IUsuario) {
    return this.userRepository.updateUser(user);
  }

  async getAllUsers(tipoAcesso: any, limit: number, page: number) {
    return this.userRepository.getAllUsers(tipoAcesso, limit, page);
  }
}
