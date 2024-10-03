import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';
import { z } from 'zod';
import { UsuarioService } from '../services/usuario.service';

const createUserSchema = z.object({
  email: z.string().email(),
  senha: z.string(),
});

type UserParse = z.infer<typeof createUserSchema>;

@UseInterceptors(LoggingInterceptor)
@Controller('user')
export class UsuarioController {
  constructor(private readonly userService: UsuarioService) {}

  @UsePipes(new ZodValidationPipe(createUserSchema))
  @Get()
  async getToken(@Body() { email, senha }) {
    return this.userService.getOneUser({ email, senha });
  }

  @UsePipes(new ZodValidationPipe(createUserSchema))
  @Post('create')
  async createUsuario(@Body() { email, senha }: UserParse) {
    const hashedPassword = await hash(senha, 8);
    return this.userService.createUser({ email, senha: hashedPassword });
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createUserSchema))
  @Put('update')
  async updateUsuario(@Body() { email, senha }: UserParse) {
    const hashedPassword = await hash(senha, 8);
    return this.userService.updateUser({ email, senha: hashedPassword });
  }
}
