import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioController } from './controllers/usuario.controller';
import { Usuario, UsuarioSchema } from './models/usuario.entities';
import { IUsuarioRepository } from './repositories/interfaces/usuario.interface.repository';
import { UsuarioRepository } from './repositories/usuario.repository';
import { UsuarioService } from './services/usuario.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Usuario.name,
        schema: UsuarioSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: IUsuarioRepository,
      useClass: UsuarioRepository,
    },
    UsuarioService,
  ],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
