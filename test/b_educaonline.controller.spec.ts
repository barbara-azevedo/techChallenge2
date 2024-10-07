import { CanActivate } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as supertest from 'supertest';
import { EducaOnlineModule } from '../src/educaonline/educaonline.module';
import { AuthGuard } from '../src/shared/guards/auth.guard';
import { postHelper, sigingJWTHelper } from './helper';

const MONGO_URI =
  'mongodb+srv://postech2024:Postech2024@postech.69tvz.mongodb.net/?retryWrites=true&w=majority&appName=postech';

describe('EducaOnlineController', () => {
  let app: NestExpressApplication;
  let token = '';
  let idAutor = '';

  const apiClient = () => {
    return supertest(app.getHttpServer());
  };

  beforeEach(async () => {
    const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(MONGO_URI, { dbName: 'test' }),
        EducaOnlineModule,
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleRef.createNestApplication<NestExpressApplication>();
    await app.listen(4002);
    token = await sigingJWTHelper(apiClient);
    idAutor = await postHelper(apiClient, token);
  });

  afterEach(async () => {
    await (app.get(getConnectionToken()) as Connection).db.dropDatabase();
    await app.close();
  });

  it('create autor', async () => {
    await apiClient()
      .post('/autor/create')
      .set({ Authorization: `Bearer ${token}` })
      .set('Content-Type', 'application/json')
      .send({
        nome: 'postech1',
      })
      .expect(201);
  });

  it('remove autor', async () => {
    await apiClient()
      .delete(`/autor/remove/${idAutor}`)
      .set({ Authorization: `Bearer ${token}` })
      .set('Content-Type', 'application/json')
      .send()
      .expect(200);
  });

  it('create post', async () => {
    idAutor = await postHelper(apiClient, token);
    await apiClient()
      .post('/post/create')
      .set({ Authorization: `Bearer ${token}` })
      .set('Content-Type', 'application/json')
      .send({
        titulo: 'postech1',
        conteudo: 'teste',
        relationAutorId: idAutor,
      })
      .expect(201);
  });

  it('delete post', async () => {
    await apiClient()
      .post('/post/create')
      .set({ Authorization: `Bearer ${token}` })
      .set('Content-Type', 'application/json')
      .send({
        titulo: 'postech1',
        conteudo: 'teste',
        relationAutorId: idAutor,
      });

    const response = await apiClient().get('/post/all').send();
    const idPost = await response.body[0]._id;
    await apiClient()
      .delete(`/post/remove/${idPost}`)
      .set({ Authorization: `Bearer ${token}` })
      .set('Content-Type', 'application/json')
      .send()
      .expect(200);
  });

  it('update post', async () => {
    await apiClient()
      .post('/post/create')
      .set({ Authorization: `Bearer ${token}` })
      .set('Content-Type', 'application/json')
      .send({
        titulo: 'postech1',
        conteudo: 'teste',
        relationAutorId: idAutor,
      });

    const response = await apiClient().get('/post/all').send();
    const idPost = await response.body[0]._id;
    await apiClient()
      .put(`/post/update/${idPost}`)
      .set({ Authorization: `Bearer ${token}` })
      .set('Content-Type', 'application/json')
      .send({
        titulo: 'postech1',
        conteudo: 'teste 2',
        relationAutorId: idAutor,
      })
      .expect(200);
  });
});
