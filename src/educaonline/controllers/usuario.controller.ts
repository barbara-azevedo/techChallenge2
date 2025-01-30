import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';
import { UsuarioService } from '../services/usuario.service';

const createUserSchema = z.object({
  email: z.string().email(),
  senha: z.string(),
  tipoAcesso: z.string()
});

const userGetTokenSchema = z.object({
  email: z.string().email(),
  senha: z.string()
});

type UserParse = z.infer<typeof createUserSchema>;

//@UseInterceptors(LoggingInterceptor)
@Controller('user')
export class UsuarioController {
  constructor(private readonly userService: UsuarioService) { }

  @UsePipes(new ZodValidationPipe(userGetTokenSchema))
  @Post('token')
  async getToken(@Body() { email, senha }) {
    return this.userService.getTokenUser({ email, senha });
  }

  @UsePipes(new ZodValidationPipe(createUserSchema))
  @Post('create')
  async createUsuario(@Body() { email, senha, tipoAcesso }: UserParse) {
    const hashedPassword = await hash(senha, 8);
    return this.userService.createUser({ email, senha: hashedPassword, tipoAcesso });
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createUserSchema))
  @Put('update')
  async updateUsuario(@Body() { email, senha, tipoAcesso }: UserParse) {
    const hashedPassword = await hash(senha, 8);
    return this.userService.updateUser({ email, senha: hashedPassword, tipoAcesso });
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async getAllUsers(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.userService.getAllUsers(limit, page);
  }

  @UseGuards(AuthGuard)
  @Post('findOne')
  async getAutor(@Body() { email, senha }) {
    return this.userService.getOneUser({ email, senha });
  }

}
