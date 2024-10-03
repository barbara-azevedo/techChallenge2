import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutorController } from './controllers/autor.controller';
import { EducaOnlineController } from './controllers/educaonline.controller';
import { Autor, AutorSchema } from './models/autor.entities';
import { EducaOnline, EducaOnlineSchema } from './models/educaonline.entities';
import { AutorRepository } from './repositories/autor.repository';
import { EducaOnlineRepository } from './repositories/educaonline.repository';
import { IAutorRepository } from './repositories/interfaces/autor.interface.repository';
import { IEducaOnlineRepository } from './repositories/interfaces/educaonline.interface.repository';
import { AutorService } from './services/autor.service';
import { EducaOnlineService } from './services/educaonline.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EducaOnline.name,
        schema: EducaOnlineSchema,
      },
      {
        name: Autor.name,
        schema: AutorSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: IEducaOnlineRepository,
      useClass: EducaOnlineRepository,
    },
    {
      provide: IAutorRepository,
      useClass: AutorRepository,
    },
    EducaOnlineService,
    AutorService,
  ],
  controllers: [EducaOnlineController, AutorController],
})
export class EducaOnlineModule {}
