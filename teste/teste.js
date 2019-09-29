var h1 = document.querySelector('h1')
var bOkay = document.querySelector('a')


var arroz = {
    feijao: 3,
    batata: 'essa variavel é a batata'
}

var batata = {
    feijao: 3,
    batata: 'essa variavel é a batata'
}

console.log(bOkay);

bOkay.onclick = function () {
    // window.open('https://google.com', '_self')    
    if (bOkay.className === '') {
        bOkay.classList.add('selecionado')
    }
    else {
        bOkay.classList.remove('selecionado')
    }
}




function sabao() {
    alert('Você chamou a função sabão!')
}