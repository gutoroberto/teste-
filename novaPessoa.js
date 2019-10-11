var nome = document.querySelector('#nome')
var age = document.querySelector('#age')
var lastName = document.querySelector('#lastName')
var salvarPessoa = document.querySelector('#salvar')
var exibe = document.querySelector('#exibe')

salvarPessoa.onclick = function() {
    var pessoa = {
        nome: nome.value,
        age: age.value,
        lastName: lastName.value,
    }
    listaPessoas.push(pessoa)

    localStorage.setItem('lista', JSON.stringify(listaPessoas))
    exiberLista()
}

function exiberLista() {
    var divs = ''
    for (var i = 0; i < listaPessoas.length; i++) {
        divs += criarDiv(listaPessoas[i])
    }
    exibe.innerHTML = divs
}

var listaPessoas = JSON.parse(localStorage.getItem('lista'))

exiberLista()
