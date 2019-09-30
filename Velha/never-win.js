// Os locais dos cantos
var diagonais = [0, 2, 6, 8]
// Os locais dos não cantos
var naoDiagonais = [1, 3, 5, 7]
// Os locais dos cantos inversos
var diagonaisInversas = [8, 6, 2, 0]
// Os locais dos cantos laterais
var diagonaisLaterais = [[2, 6], [0, 8], [0, 8], [2, 6]]
// Os locais que não são cantos e estão próximos
var espacosProximos = [[1, 3], [1, 5], [3, 7], [5, 7]]
// Os locais que não são cantos e estão distantes
var espacosDistantes = [[5, 7], [3, 7], [1, 5], [1, 3]]
// Variável do ponto futuro que garantirá a vitória
var vitDeterminada = null

var inicioMeio = false

var naoJogarDiagonais = false


function resetarNeverWin() {
    vitDeterminada = null
    inicioMeio = false
    naoJogarDiagonais = false
}


/** Verificação para determinar um local que o jogador não irá vencer nunca */
function nerverWinVerify(rivalSimbol, compSimbol) {
    // Verifica se é o inicio do jogo
    var jogadasJogador = []
    var jogadasComp = []

    if (vitDeterminada) {
        console.log('Executando vitória pré-determinada')
        return vitDeterminada
    }

    if (naoJogarDiagonais) {
        console.log('Não jogando em diagonal')
        // 50 tentativas de random para não jogar na diagonal
        // para evitar um loop infinito
        for (let i = 0; i < 50; i++) {
            var localJogar = Math.floor(Math.random() * 4)
            naoJogarDiagonais = false
            if (jogadas[naoDiagonais[localJogar]] === '')
                return naoDiagonais[localJogar]
        }
        // Caso ainda seja obrigado a não jogar em uma diagonal
        // ele joga aleatorio
        return false
    }
    
    // Loop para verificar se realmente é o inicio do jogo
    for (let i = 0; i < 9; i++) {
        if (jogadas[i] === rivalSimbol) {
            jogadasJogador.push(i)
        }
        else if (jogadas[i] === compSimbol) {
            jogadasComp.push(i)
        }
    }

    // Se for o inicio do jogo, ele joga em uma das diagonais
    // ou no meio
    if (jogadasComp.length == 0 && jogadasJogador.length == 0) {
        localJogar = Math.floor(Math.random() * 5)
        if (localJogar === 4) {
            inicioMeio = true
            return 4 // Jogada no meio
        }
        return diagonais[localJogar]
    }

    
    var cantoJogadorJogou = null
    // Loop para verificar se o jogador jogou em um canto
    for (let i = 0; i < 4; i++) {
        if (jogadasJogador[0] === diagonais[i]) {
            cantoJogadorJogou = i
        }
    }

    // Se o computador jogou primeiro
    if (jogadasComp.length == 1 && jogadasJogador.length == 1) {
        // Caso o inicio tenha sido no meio
        if (inicioMeio) {
            return computadorIniciouMeio(cantoJogadorJogou, jogadasJogador[0])
        }
        // Se o jogador jogou em um canto
        if (cantoJogadorJogou !== null)
            return ataqueJogadorNoCanto(cantoJogadorJogou, jogadasComp[0])
        // Se o jogador jogou no meio
        if (jogadasJogador[0] === 4) {
            return jogadorJogouNoMeio(jogadasComp[0])
        }
    }
    // Se o jogador jogou primeiro
    else if (jogadasJogador.length == 1 && jogadasComp.length == 0) {
        // Se o jogador jogou no meio, joga em uma diagonal
        if (jogadasJogador[0] == 4) {
            var localJogar = Math.floor(Math.random() * 4)
            return diagonais[localJogar]
        }
        
        // Se o jogador jogou em uma diagonal, sempre joga no meio
        if (cantoJogadorJogou !== null) {
            naoJogarDiagonais = true
            return 4
        }

        // Se o jogador não jogou em uma diagonal, e nem no meio
        // ele joga no meio
        return 4
    }

    return false
}


// Função que ocorre quando o compudor jogou primeiro
// e o jogador jogou em alguma das laterais
function ataqueJogadorNoCanto(cantoJogadorJogou, jogadaComp) {
    // Verifica se o jogador jogou no canto inverso
    // ao que o computador jogou
    // Se sim, jogará em um canto lateral
    if (jogadaComp == diagonaisInversas[cantoJogadorJogou]) {
        // Número aleatório para jogar em um canto lateral
        var localJogar = Math.floor(Math.random() * 2)
        // Condição ternária que define o ponto futuro que garantirá
        // a vitória para o computador
        vitDeterminada = localJogar == 1 ? diagonaisLaterais[cantoJogadorJogou][0] : diagonaisLaterais[cantoJogadorJogou][1]
        return diagonaisLaterais[cantoJogadorJogou][localJogar]
    }
    else {
        // Faz um calculo random para determinar se irá jogar no canto
        // inverso ou lateral
        var localJogar = Math.floor(Math.random() * 2)
        if (localJogar == 0) {
            // Jogará no canto inverso e determinará a vitória para
            // o canto inverso ao que o jogador jogou
            if (diagonaisLaterais[cantoJogadorJogou][0] !== jogadaComp) {
                vitDeterminada = diagonaisLaterais[cantoJogadorJogou][0]
            }
            else {
                vitDeterminada = diagonaisLaterais[cantoJogadorJogou][1]
            }
            console.log('Jogada no canto inverso, vitDeterminada: ', vitDeterminada)
            return diagonaisInversas[cantoJogadorJogou]
        }
        else {
            // Jogará no canto lateral e determinará a vitória para
            // o canto inverso ao que o jogador jogou
            vitDeterminada = diagonaisInversas[cantoJogadorJogou]
            console.log('Jogada na canto lateral ao que o jogador jogou', vitDeterminada)
            if (diagonaisLaterais[cantoJogadorJogou][0] !== jogadaComp) {
                return diagonaisLaterais[cantoJogadorJogou][0]
            }
            else {
                return diagonaisLaterais[cantoJogadorJogou][1]
            }
        }
    }
}


function jogadorJogouNoMeio(jogadaComp) {
    console.log('Jogador jogou no meio')
    var cantoCompJogou = null
    // Loop para verificar qual canto que o computador jogou
    // para jogar no canto inverso
    for (let i = 0; i < 4; i++) {
        if (jogadaComp === diagonais[i]) {
            cantoCompJogou = i
            break
        }
    }

    return diagonaisInversas[cantoCompJogou]
}


function computadorIniciouMeio(cantoJogadorJogou, jogadaJogador) {
    if (cantoJogadorJogou !== null) {
        var localJogar = Math.floor(Math.random() * 2)
        // Joga sempre em um canto lateral ao que o jogador jogou
        // Não há vitória determinada nesse caso, dependerá do jogador
        return diagonaisLaterais[cantoJogadorJogou][localJogar]
    }
    else {
        // O jogador não jogou em nenhum canto, o computador é obrigado
        // a jogar em um canto para vencer
        // Então ele joga aleatóriamente em alguma diagonal
        var localJogar = Math.floor(Math.random() * 4)

        // var diagonalJogada = diagonais[localJogar]
        // A lateral oposta a jogada do jogador é a vitória determinada
        // if (jogadaJogador === 1) {
            
        // }
        return diagonais[localJogar]
    }
}