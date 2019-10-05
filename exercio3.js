var exibe = document.querySelector('#exibe')
var entrada = document.querySelector('#entrada')


exibe.innerText = localStorage.getItem('VariavelInterna')
entrada.value = localStorage.getItem('VariavelInterna')


entrada.oninput = function () {
    localStorage.setItem('VariavelInterna', entrada.value)
}