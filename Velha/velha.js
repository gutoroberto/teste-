// Pega todas as div.op do jogo
// são no total 9
var ops = document.querySelectorAll('.op')

var h1 = document.querySelector('h1')
var vit = document.querySelector('#vit')
var der = document.querySelector('#der')
var emp = document.querySelector('#emp')
// A lista das jogadas efetuadas
var jogadas = []

// Define que o jogo já acabou ou não
var jogoAcabou = false
var empates = 0
var vitPlayer = 0
var vitComputador = 0

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

    // Remove a classe da vitória do player e do computador caso haja
    h1.classList.remove('op--player')
    h1.classList.remove('op--comp')

    // Faz com que a lista fique com 9 string vazias
    for (let i = 0; i < 9; i++) {
        jogadas[i] = ''
        // Remove todos os estilos css que estiverem
        ops[i].classList.remove('op--player')
        ops[i].classList.remove('op--comp')
        ops[i].classList.remove('op--vit')
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
    // Verifica a quantidade de jogadas preenchidas para determinar se é empate
    var jogadasPreenchidas = 0

    // Define que cada espaço esteja de acordo com a array jogadas
    for (let i = 0; i < 9; i++) {
        ops[i].innerText = jogadas[i]
        if (jogadas[i] === 'X') {
            ops[i].classList.add('op--player')
            jogadasPreenchidas++
        }
        else if (jogadas[i] === 'O') {
            ops[i].classList.add('op--comp')
            jogadasPreenchidas++
        }
    }

    // Verifica se é empate
    if (jogadasPreenchidas === 9 && !jogoAcabou) {
        h1.innerHTML = 'Empate!<br>Clique aqui para iniciar uma nova partida'
        jogoAcabou = true
        empates++
        emp.innerText = 'Empates:  ' + empates
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
            vitPlayer++
            emp.innerText = 'Vitórias: ' + vitPlayer
            h1.innerHTML = 'Você venceu!<br>Clique aqui para iniciar uma nova partida'
            h1.classList.add('op--player')
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
        vitComputador++
        der.innerText = 'Derrotas: ' + vitComputador
        h1.classList.add('op--comp')
        h1.innerHTML = 'Você perdeu seu looser!!<br>Clique aqui para iniciar uma nova partida'
    }
}