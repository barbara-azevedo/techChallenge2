
jest.mock('axios');

import assert from 'assert';
import mockAxios from 'jest-mock-axios';
import { sigingJWT } from './helper';

export default mockAxios;

let token: '';

beforeAll(async () => {
  token = await sigingJWT();
});

test("POST /craete autor 201", async () => {
  const resCreatePost = await fetch("http://localhost:" + 3000 + "/autor/create", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      nome: "Teste"
    })
  });
  assert.deepStrictEqual(resCreatePost.status, 201);
});

test("GET / findAll autor 200", async () => {
  const resCreatePost = await fetch("http://localhost:" + 3000 + "/autor/all");
  assert.deepStrictEqual(resCreatePost.status, 200);
});

test("GET / findBy ID autor 200", async () => {
  const resCreatePost = await fetch("http://localhost:" + 3000 + "/autor/" + 2);
  assert.deepStrictEqual(resCreatePost.status, 200);
});

test("PUT / autor 201", async () => {
  const resUpdatePost = await fetch("http://localhost:" + 3000 + "/autor/update/" + 1, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      nome: "Teste 1"
    })
  });
  assert.deepStrictEqual(resUpdatePost.status, 200);
});

test("DELETE / autor 200", async () => {
  const resRemovePost = await fetch("http://localhost:" + 3000 + "/autor/remove/" + 5, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (resRemovePost.status === 200)
    assert.deepStrictEqual(resRemovePost.status, 200);
  else
    assert.deepStrictEqual(resRemovePost.status, 404);
});