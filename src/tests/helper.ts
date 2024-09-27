
export async function sigingJWT() {

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

    const token = await response.text();
    const tokenJwt = JSON.parse(token)

    return tokenJwt.token;

}