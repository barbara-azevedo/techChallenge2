import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as supertest from 'supertest';
import { EducaOnlineModule } from '../src/educaonline/educaonline.module';
import { IEducaOnline } from '../src/educaonline/models/interfaces/educaonline.interface';

describe('EducaOnlineController', () => {
  let app: NestExpressApplication;

  const apiClient = () => {
    return supertest(app.getHttpServer());
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'test' }),
        EducaOnlineModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>();
    await app.listen(3333);
  });

  afterEach(async () => {
    await (app.get(getConnectionToken()) as Connection).db.dropDatabase();
    await app.close();
  });

  it('creates a post', async () => {
    await apiClient()
      .post('/post/create')
      .send({
        titulo: 'Teste 5',
        conteudo: 'Teste teste teste',
        relationAutorId: '1',
      })
      .expect(201);
    const posts: IEducaOnline[] = (await apiClient().get('/post/all')).body;
    expect(posts[0].titulo).toBe('Teste 5');
  });
});
