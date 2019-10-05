var listamoda = document.querySelector('#listamoda')
var busca = document.querySelector('#busca')
var limpar = document.querySelector('#limpar')

function criarCard(moda) {
    var novaDiv = document.createElement('div')


    novaDiv.className = 'card-moda'


    novaDiv.innerHTML = `<div class="lista-moda">
    <img src="imagens/${moda.img}">
</div>
<div class="info-moda">
    <span>item: R$ ${dog.item}</span>
    <span>item2: R$ ${dog.item2}</span>
    <span>item3: R$ ${dog.item3}</span>
    <span>Valor conjunto: R$ ${dog.valor,conjunto.toFixed(2)}</span>
</div>`


    listamoda.appendChild(novaDiv)
}


limpar.onclick = function() {
    listamoda.innerHTML=''

    for (let i = 0; i < listamoda.length; i++) {
        criarCard(listamoda[i])
    }
    limpar.disabled = true
    busca.value = ''

}

busca.oninput = function() {
    dogList.innerHTML = ''

    if (busca.value === '') {
        limpar.disabled = true
        for (let i = 0; i < moda.length; i++) {
            criarCard(moda[i])
        }
    }
    else {
        limpar.disabled = false
        var filtro = moda.filter(moda => {
            return moda.item.toLowerCase().includes(busca.value.toLowerCase())
        })
        
        for (let i = 0; i < filtro.length; i++) {
            criarCard(filtro[i])
        }
    }
}



for (let i = 0; i < listamoda.length; i++) {
    criarCard(listamoda[i])
}