function enviar() {

    axios({
        method: 'POST',
        url: 'http://localhost:3333/subscribe',
        data: email,
        headers: { 'Content-Type': 'application/json' }
    })
}