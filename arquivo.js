function criarPessoa(nome, age, lastName) {
    return {
        nome: nome,
        age: age,
        lastName: lastName,
        falar: function () {
            console.log('Oi ' + this.nome)
        }
    }
}

function criarDiv(pessoa) {
    return `
    <div>
        <span>${pessoa.nome}</span><br>
        <span>${pessoa.lastName}</span><br>
        <span>${pessoa.age}</span><br>
    </div>`
}







