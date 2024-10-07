export async function sigingJWTHelper(apiClient) {
  await apiClient().post('/user/create').send({
    email: 'jose@teste.com',
    senha: '123',
  });

  const response = await apiClient().get('/user/').send({
    email: 'jose@teste.com',
    senha: '123',
  });

  const token = await response.text;
  const tokenJwt = JSON.parse(token);

  return tokenJwt.token;
}

export async function postHelper(apiClient, token) {
  await apiClient()
    .post('/autor/create')
    .set({ Authorization: `Bearer ${token}` })
    .set('Content-Type', 'application/json')
    .send({
      nome: 'postech 2',
    });

  const response = await apiClient().get('/autor/all/').send();

  const idAutor = await response.body[0]._id;
  return idAutor;
}
