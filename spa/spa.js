var app = document.querySelector('#app')

function criarNav() {
    console.log('CriarNav sendo chamado')
    var nav = document.createElement('nav')

    nav.innerHTML = `
    <h1>Arroz</h1>
    <p>Batata</p>`

    app.appendChild(nav)
}

criarNav()


