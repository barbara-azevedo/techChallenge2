import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EducaOnlineModule } from './educaonline/educaonline.module';
import { UsuarioModule } from './educaonline/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EducaOnlineModule,
    UsuarioModule,
    MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'postech' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
