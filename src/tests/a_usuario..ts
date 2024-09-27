
jest.mock('axios');

import assert from 'assert';
import mockAxios from 'jest-mock-axios';
export default mockAxios;

describe("Create user and get JWT", () => {

  it("POST /create or not create (exist usuario) 200/302", async () => {
    const response = await fetch("http://localhost:" + 3000 + "/usuario", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: "postech@teste.com",
        senha: "1234"
      })
    });

    if (response.status === 302)
      assert.deepStrictEqual(response.status, 302);
    else
      assert.deepStrictEqual(response.status, 200);
  });

  it("POST /get JWT returns status 200", async () => {
    const response = await fetch("http://localhost:" + 3000 + "/usuario/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: "postech@teste.com.br",
        senha: "1234"
      })
    });
    assert.deepStrictEqual(response.status, 200);
  });
});