// Pega todas as div.op do jogo
// são no total 9
var ops = document.querySelectorAll('.op')

var h1 = document.querySelector('h1')
var vit = document.querySelector('#vit')
var der = document.querySelector('#der')
var emp = document.querySelector('#emp')
// A lista das jogadas efetuadas
var jogadas = []
var jogadasPreenchidas = 0

var jogadorX = 'X'
var jogadorO = 'O'

var compVScomp = confirm('Computador vs computador?')

// Define que o jogo já acabou ou não
var jogoAcabou = false


// Define o jogador inicial aleatoriamente
var aleatorio = Math.floor(Math.random() * 2)
var jogadorInicial
if (aleatorio)
    jogadorInicial = jogadorX
else
    jogadorInicial = jogadorO
    

// Faz com que cada div com .op tenha jogou(e) como função
// quando clicar
for (let i = 0; i < ops.length; i++) {
    ops[i].onclick = playerJogou
}


// Lê o placar do localStorage caso tenha
var empates = localStorage.getItem('emp')
var vitPlayer = localStorage.getItem('vit')
var vitComputador = localStorage.getItem('der')
if (empates) {
    emp.innerText = 'Empates:  ' + empates
    empates = Number.parseInt(empates)
}
if (vitPlayer) {
    vit.innerText = 'Vitórias: ' + vitPlayer
    vitPlayer = Number.parseInt(empates)
}
if (vitComputador) {
    der.innerText = 'Derrotas: ' + vitComputador
    vitComputador = Number.parseInt(vitComputador)
}


// Define que se clicar no título reseta o jogo
h1.onclick = function() {
    if (jogoAcabou)
        iniciarNovaPartida()
}


// Começa uma nova partida
iniciarNovaPartida()


/** Inicia um novo jogo */
function iniciarNovaPartida() {
    // Limpa o console
    console.clear()

    jogoAcabou = false
    jogadasPreenchidas = 0
    h1.innerText = 'Jogo da Velha'

    // Reseta as configurações (never-win.js)
    resetarNeverWin()

    // Remove a classe da vitória do player e do computador caso haja
    h1.classList.remove('op--player')
    h1.classList.remove('op--comp')

    // Faz com que a lista fique com 9 string vazias
    for (let i = 0; i < 9; i++) {
        jogadas[i] = ''
        ops[i].innerText = ''
        // Remove todos os estilos css que estiverem
        ops[i].classList.remove('op--player')
        ops[i].classList.remove('op--comp')
        ops[i].classList.remove('op--vit')
    }
    if (jogadorInicial === jogadorX) {
        // Define que o computador será o próximo primeiro jogador
        jogadorInicial = jogadorO
        // Se estiver no modo compVScomp o computador joga
        if (compVScomp) {
            setTimeout(() => jogadaComputador(jogadorX, jogadorO), 600)
        }
    }
    else {
        // Define que o player será o próximo primeiro jogador
        jogadorInicial = jogadorX
        // O computador faz uma jogada aleatória
        jogadaComputador(jogadorO, jogadorX)
    }
}


// Sempre que alguém faz uma jogada vem para essa função
function atribuirJogada(jogador, casa, descComp) {
    if (jogadas[casa] !== '')
        throw `Erro casa ${casa} já atribuída`

    
    jogadas[casa] = jogador
    ops[casa].innerText = jogador
    jogadasPreenchidas++
    if (descComp)
        descComp = ' - ' + descComp
    else
        descComp = ''
    console.log(`CASA ${casa} - ${jogador}${descComp}`)


    if (jogador === jogadorX) {
        // Define a classe css que aparecerá na div
        ops[casa].classList.add('op--player')
        // Verifica se o player venceu
        checarVitoriaPlayer()
        // Vai para a jogada do computador (se o jogo estiver em andamento)
        if (!jogoAcabou && jogadasPreenchidas < 9) {
            if (!compVScomp)
                jogadaComputador(jogadorO, jogadorX)
            else
                setTimeout(() => jogadaComputador(jogadorO, jogadorX), 600)
        }
    }
    else {
        // Define a classe css que aparecerá na div
        ops[casa].classList.add('op--comp')
        // Verifica se o computador venceu
        checarVitoriaComputador()
        // Se estiver compVScomp ele vai para a próxima jogada
        if (compVScomp && !jogoAcabou && jogadasPreenchidas < 9) {
            setTimeout(() => jogadaComputador(jogadorX, jogadorO), 600)
        }
    }
    // Define se empatou (caso ninguém tenha vencido)
    definirSeEmpatou()
}


/** Faz com que cada 'div.op' fique de acordo com a array 'jogadas' */
function definirSeEmpatou() {
    // Verifica se é empate
    if (jogadasPreenchidas >= 9 && !jogoAcabou) {
        h1.innerHTML = 'Empate!<br>Clique aqui para iniciar uma nova partida'
        jogoAcabou = true
        empates++
        localStorage.setItem('emp', vitComputador)
        emp.innerText = 'Empates:  ' + empates
    }
}


/**
 * Função executada quando clica em alguma das .op divs
 */
function playerJogou(e) {
    // Se o jogo já acabou, então sai da função
    if (jogoAcabou || compVScomp) {
        return
    }

    // Encontra qual foi a div clicada
    // o número dela fica salvo na variável i
    var i
    for (i = 0; i < ops.length; i++) {
        if (e.target === ops[i])
            break;
    }
    // se o texto da jogada estiver vazio
    // define que será X, ou seja, que o jogador
    // jogou nessa casa
    if (jogadas[i] === '') {
        // Atribui para a lista de jogadas a jogada do jogador
        atribuirJogada(jogadorX, i)
    }
}


/** Verifica se o jogador especificado pela variável jogador venceu */
function checarVitoria(jogador) {
    // Pega a lista de linhas dos arquivo jogada-obrigatoria
    // para fazer a checagem e pintar a linha da vitória
    for (let i = 0; i < listaLinhas.length; i++) {
        // Variável para saber cada parte que foi preenchida
        var preenchidos = 0
        // Trafega por cada parte dessa linha atual
        for (let j = 0; j < 3; j++) {
            if (jogadas[listaLinhas[i][j]] === jogador) {
                preenchidos++
            }
        }
        // Caso tenha 3 preenchidos com o jogador atual, define que é a linha
        // da vitória
        if (preenchidos === 3) {
            for (let j = 0; j < 3; j++) {
                ops[listaLinhas[i][j]].classList.add('op--vit')
            }
            return true
        }
    }
}


function jogadaComputador(compSimbol, rivalSimbol) {
    if (!compSimbol) {
        rivalSimbol = jogadorX
        compSimbol = jogadorO
    }
    // Executa a função do arquivo jogada-obrigatoria.js
    // para ver se é obrigado a jogar para não perder
    var jogadaObrigatoria = jogadaComputadorObrigatoria(compSimbol, rivalSimbol)
    if (jogadaObrigatoria !== false) {
        atribuirJogada(compSimbol, jogadaObrigatoria, 'obrigatória')
        return
    }

    var jogadaNeverWin = nerverWinVerify(rivalSimbol, compSimbol)
    if (jogadaNeverWin !== false) {
        atribuirJogada(compSimbol, jogadaNeverWin, 'never-win')
        return
    }

    // Pega as casas vazias disponíveis
    var casasVazias = []
    for (let i = 0; i < jogadas.length; i++) {
        if (jogadas[i] === '') {
            // Se a jogada está vazia, então adiciona o numero
            // da casa para a lista
            casasVazias.push(i)
        }
    }

    // Pega um número aleatorio dentro da lista
    var casaJogada = Math.floor(Math.random() * casasVazias.length)
    // Joga nesse número aleatório
    atribuirJogada(compSimbol, casasVazias[casaJogada], 'aleatória')
}


// Checa a vitória do computador
function checarVitoriaComputador() {
    if (checarVitoria(jogadorO)) {
        jogoAcabou = true
        vitComputador++
        localStorage.setItem('der', vitComputador)
        der.innerText = 'Derrotas: ' + vitComputador
        h1.classList.add('op--comp')
        h1.innerHTML = 'Você perdeu seu looser!!<br>Clique aqui para iniciar uma nova partida'
    }
}


// Checa a vitória do computador
function checarVitoriaPlayer() {
    if (checarVitoria(jogadorX)) {
        jogoAcabou = true
        vitPlayer++
        localStorage.setItem('vit', vitComputador)
        vit.innerText = 'Vitórias: ' + vitPlayer
        h1.innerHTML = 'Você venceu!<br>Clique aqui para iniciar uma nova partida'
        h1.classList.add('op--player')
    }
}