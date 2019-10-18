var spans = document.querySelectorAll('span')
var pessoas = 0


var h2 = document.querySelector('h2')

spans[0].onclick=function () {
    if(pessoas >= 15){
        h2.innerText = "lotado"
    }
    else {
        pessoas++
        h2.innerText = 'pessoas: ' + pessoas
    }
}
spans[1].onclick=function () {
    if(pessoas <= 0) {
        h2.innerText = 'limite minimo'
    }
    else {
        pessoas--
        h2.innerText = 'pessoas: ' + pessoas
    }
}


