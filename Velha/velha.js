// Pega todas as div.op do jogo
// são no total 9
var ops = document.querySelectorAll('.op')

var h1 = document.querySelector('h1')
// A lista das jogadas efetuadas
var jogadas = []

// Define que o jogo já acabou ou não
var jogoAcabou = false

// Define o jogador inicial
var jogadorInicial = 'X'
    
// Faz com que cada div com .op tenha jogou(e) como função
// quando clicar
for (let i = 0; i < ops.length; i++) {
    ops[i].onclick = playerJogou
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
    jogoAcabou = false
    h1.innerText = 'Jogo da Velha'
    // Faz com que a lista fique com 9 string vazias
    for (let i = 0; i < 9; i++) {
        jogadas[i] = ''
    }
    if (jogadorInicial === 'X') {
        // Define que o computador será o próximo primeiro jogador
        jogadorInicial = 'O'
    }
    else {
        // Define que o player será o próximo primeiro jogador
        jogadorInicial = 'X'
        // O computador faz uma jogada aleatória
        jogadaComputadorAleatoria()
    }

    // Chama a função definirJogo
    definirJogo()

    // Limpa o console
    console.clear()
}


/** Faz com que cada 'div.op' fique de acordo com a array 'jogadas' */
function definirJogo() {
    for (let i = 0; i < 9; i++) {
        ops[i].innerText = jogadas[i]
    }
}


/**
 * Função executada quando clica em alguma das .op divs
 */
function playerJogou(e) {
    // Se o jogo já acabou, então sai da função
    if (jogoAcabou) {
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
        // Avisa no console o número da casa que jogou
        console.log('Jogou na casa ' + i)
        // Atribui para a lista de jogadas a jogada do jogador
        jogadas[i] = 'X'
        // Verifica se venceu para continuar ou não o jogo
        if (checarVitoria('X')) {
            jogoAcabou = true
            h1.innerText = 'Você venceu! Clique aqui para iniciar uma nova partida'
        }
        else {
            // Computador joga então
            jogadaComputadorAleatoria()
        }

        // Redesenha as divs para terem os valores corretos
        definirJogo()
    }
}


/** Verifica se o jogador especificado pela variável jogador venceu */
function checarVitoria(jogador) {
    if (jogadas[0] === jogador && jogadas[1] === jogador && jogadas[2] === jogador)
        return true
    if (jogadas[0] === jogador && jogadas[4] === jogador && jogadas[8] === jogador)
        return true
    if (jogadas[0] === jogador && jogadas[3] === jogador && jogadas[6] === jogador)
        return true
    if (jogadas[1] === jogador && jogadas[4] === jogador && jogadas[7] === jogador)
        return true
    if (jogadas[2] === jogador && jogadas[5] === jogador && jogadas[8] === jogador)
        return true
    if (jogadas[3] === jogador && jogadas[4] === jogador && jogadas[5] === jogador)
        return true
    if (jogadas[6] === jogador && jogadas[7] === jogador && jogadas[8] === jogador)
        return true
    if (jogadas[2] === jogador && jogadas[4] === jogador && jogadas[6] === jogador)
        return true
}


function jogadaComputadorAleatoria() {
    // Executa a função do arquivo jogada-obrigatoria.js
    // para ver se é obrigado a jogar para não perder
    var jogadaObrigatoria = jogadaComputadorObrigatoria()
    if (jogadaObrigatoria) {
        console.log('Jogada obrigatória', jogadaObrigatoria)
        jogadas[jogadaObrigatoria] = 'O'
        checarVitoriaComputador()
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
    jogadas[casasVazias[casaJogada]] = 'O'
    checarVitoriaComputador()
}


// Checa a vitória do computador
function checarVitoriaComputador() {
    if (checarVitoria('O')) {
        jogoAcabou = true
        h1.innerText = 'Você perdeu seu looser!! Clique aqui para iniciar uma nova partida'
    }
}