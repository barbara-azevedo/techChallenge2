import { CanActivate } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as supertest from 'supertest';
import { UsuarioModule } from '../src/educaonline/usuario.module';
import { AuthGuard } from '../src/shared/guards/auth.guard';

const MONGO_URI =
  'mongodb+srv://postech2024:Postech2024@postech.69tvz.mongodb.net/?retryWrites=true&w=majority&appName=postech';

describe('EducaOnlineController', () => {
  let app: NestExpressApplication;

  const apiClient = () => {
    return supertest(app.getHttpServer());
  };

  beforeEach(async () => {
    const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(MONGO_URI, { dbName: 'test' }),
        UsuarioModule,
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleRef.createNestApplication<NestExpressApplication>();
    await app.listen(4000);
  });

  afterEach(async () => {
    await (app.get(getConnectionToken()) as Connection).db.dropDatabase();
    await app.close();
  });

  it('creates a user', async () => {
    await apiClient()
      .post('/user/create')
      .send({
        email: 'jose@teste.com',
        senha: '123',
      })
      .expect(201);
  });

  it('not create a user', async () => {
    await apiClient()
      .post('/user/create')
      .send({
        email: 'jose',
        senha: '123',
      })
      .expect(400);
  });

  it('get token', async () => {
    await apiClient()
      .post('/user/create')
      .send({
        email: 'jose@teste.com',
        senha: '123',
      })
      .expect(201);

    await apiClient()
      .get('/user/')
      .send({
        email: 'jose@teste.com',
        senha: '123',
      })
      .expect(200);
  });
});
