var dogList = document.querySelector('#dog-list')
var busca = document.querySelector('#busca')
var limpar = document.querySelector('#limpar')

console.log(dogList)


function criarCard(dog) {
    var novaDiv = document.createElement('div')


    novaDiv.className = 'card-dog'


    novaDiv.innerHTML = `<div class="img-dog">
    <img src="imagens/${dog.img}">
</div>
<div class="info-dog">
    <span>Raça: ${dog.raca}</span>
    <span>Idade: ${dog.idade}</span>
    <span>Valor: R$ ${dog.valor.toFixed(2)}</span>
</div>`


    dogList.appendChild(novaDiv)
}


limpar.onclick = function() {
    dogList.innerHTML = ''

    for (let i = 0; i < listDogs.length; i++) {
        criarCard(listDogs[i])
    }
    limpar.disabled = true
    busca.value = ''

}


busca.oninput = function() {
    dogList.innerHTML = ''

    if (busca.value === '') {
        limpar.disabled = true
        for (let i = 0; i < listDogs.length; i++) {
            criarCard(listDogs[i])
        }
    }
    else {
        limpar.disabled = false
        var filtro = listDogs.filter(dog => {
            return dog.raca.toLowerCase().includes(busca.value.toLowerCase())
        })
        
        for (let i = 0; i < filtro.length; i++) {
            criarCard(filtro[i])
        }
    }
}



for (let i = 0; i < listDogs.length; i++) {
    criarCard(listDogs[i])
}