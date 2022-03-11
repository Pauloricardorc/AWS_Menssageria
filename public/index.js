function GoToCadastro() {
    window.location.href = "./cadastro.html"
}


function CreatedAccount(e) {
    e.preventDefault()

    let email = document.getElementById('email-address').value
    let confirmEmail = document.getElementById('confirm-address').value
    let password = document.getElementById('password')

    if (!confirmEmail && !email) {
        let incorrect_login = document.getElementById('incorrect_login')

        incorrect_login.style.color = "#a33"
        incorrect_login.innerHTML = "Esse email não existe"

        return
    }
    if (email != confirmEmail) {
        let incorrect_login = document.getElementById('incorrect_login')

        incorrect_login.style.color = "#a33"
        incorrect_login.innerHTML = "Os dois email não corresponde"

        return
    }
    console.log(password.value.length)
    if (password.value.length < 6) {
        let incorrect_login = document.getElementById('incorrect_login')

        incorrect_login.style.color = "#a33"
        incorrect_login.innerHTML = "Sua senha precisa ter mais de 6 digitos"

        return
    }
    // window.location.href = "./shop.html"
    var myHeaders = new Headers();

    let modal = document.getElementById('modal-id')

    let data = {
        email: email
    }
    console.log(data)
    axios({
        method: 'post',
        url: 'http://localhost:3333/subscribe',
        headers: { 'Content-Type': 'application/json' },
        data: {
            email: confirmEmail,
        }
    }).then(modal.classList.remove('invisible'));
}

async function modalNotification(e) {
    // e.preventDefault()

    let confirmEmail = document.getElementById('confirm-address').value

    console.log(e.value)

    if (e.value == 'nao') {
        alert('não')
        return
    }

    await axios({
        method: 'post',
        url: 'http://localhost:3333/notification',
        headers: { 'Content-Type': 'application/json' },
        data: {
            email: confirmEmail,
        }
    });

    window.location.href = './shop.html'
}