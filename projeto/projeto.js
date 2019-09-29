var dogList = document.querySelector('#dog-list')

console.log(dogList)

var listDogs = [
    {
        img: 'download.jpg',
        raca: 'Outro Husk',
        idade: '2 anos',
        valor: 500,
    },
    {
        img: 'images.jpg',
        raca: 'MEU DEUS',
        idade: '300 anos',
        valor: 1000000000000000
    },
    {
        valor:5000.00,
        img: 'download.jpg',
        raca: 'Outro Husk',
        idade: '2 anos'
    },
]


function criarCard(dog) {
    var novaDiv = document.createElement('div')


    novaDiv.className = 'card-dog'


    novaDiv.innerHTML = `<div class="img-dog">
    <img src="${dog.img}">
</div>
<div class="info-dog">
    <span>Raça: ${dog.raca}</span>
    <span>Idade: ${dog.idade}</span>
    <span>Valor: R$ ${dog.valor}</span>
</div>`


    dogList.appendChild(novaDiv)
}


for (let i = 0; i < listDogs.length; i++) {
    criarCard(listDogs[i])
}