

import assert from 'assert';
import mockAxios from 'jest-mock-axios';
import { sigingJWT } from './helper';
export default mockAxios;

jest.mock('axios');

let token: '';

beforeAll(async () => {
  token = await sigingJWT();
});

test("POST /post status 201", async () => {
  const resCreatePost = await fetch("http://localhost:" + 3000 + "/post/create", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      titulo: "IA-10",
      conteudo: "teste teste teste",
      id_autor: 1
    })
  });

  assert.deepStrictEqual(resCreatePost.status, 201);
});

test("GET / findAll post", async () => {
  const resCreatePost = await fetch("http://localhost:" + 3000 + "/post/all");
  assert.deepStrictEqual(resCreatePost.status, 200);
});

test("GET / findBy Id post", async () => {
  const resFindByOnePost = await fetch("http://localhost:" + 3000 + "/post/" + 2);
  if (resFindByOnePost.status === 400) {
    console.log('Id do post nao exist na base');
    assert.deepStrictEqual(resFindByOnePost.status, 400);
  }
  else
    assert.deepStrictEqual(resFindByOnePost.status, 200);
});

test("PUT /post status 200", async () => {
  const resUpdatePost = await fetch("http://localhost:" + 3000 + "/post/update/" + 1, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      titulo: "IA-10",
      conteudo: "teste teste teste 2",
      id_autor: 1
    })
  });
  if (resUpdatePost.status === 400) {
    console.log('Id do post nao exist na base');
    assert.deepStrictEqual(resUpdatePost.status, 400);
  }
  else
    assert.deepStrictEqual(resUpdatePost.status, 200);
});

test("DELETE /post status 200", async () => {
  const resRemovePost = await fetch("http://localhost:" + 3000 + "/post/remove/" + 5, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (resRemovePost.status === 400) {
    console.log('Id do post nao exist na base');
    assert.deepStrictEqual(resRemovePost.status, 400);
  }
  else
    assert.deepStrictEqual(resRemovePost.status, 200);
});