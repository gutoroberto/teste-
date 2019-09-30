// A lista de linhas que determina a vitória
var listaLinhas = [
    // Linhas horizontais
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Linhas verticais
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Linhas diagonais
    [0, 4, 8],
    [2, 4, 6],
]


/** Pega a joga que o computador deve jogar para não perder */
function jogadaComputadorObrigatoria(compSimbol, rivalSimbol) {
    // Trafega entre a lista de linhas para pegar a jogada
    // Caso seja o computador que irá vencer
    for (let i = 0; i < listaLinhas.length; i++) {
        var jogada = checarLinha(listaLinhas[i], compSimbol)
        if (jogada !== false)
            return jogada
    }
    // Trafega entre a lista de linhas para pegar a jogada
    // Caso seja o player que irá vencer
    for (let i = 0; i < listaLinhas.length; i++) {
        var jogada = checarLinha(listaLinhas[i], rivalSimbol)
        if (jogada !== false)
            return jogada
    }
    return false
}


/** Checa para ver se uma linha deverá ser jogada pelo jogador */
function checarLinha(linha, jogador) {
    // Quantas jogadas o jogador sendo verificado fez nessa linha
    var jogadasJogador = 0
    // O único espaço vazio (caso a linha tenha duas jogadas do jogador)
    var espacoVazio = null
    // Trafega entre os espaços dessa linha para ver se o jogador tem
    // duas jogadas nessa linha
    for (let i = 0; i < 3; i++) {
        // Caso o jogador tenha feito uma jogada
        // soma-se nas jogadasJogador
        if (jogadas[linha[i]] === jogador) {
            jogadasJogador++
        }
        // Caso o jogador rival do jogador sendo verificado
        // jogou nessa linha, então descarta essa linha
        else if (jogadas[linha[i]] !== '') {
            return false
        }
        else {
            // Caso seja um espaço vazio, é definido como variável espacoVazio
            // Para saber se é aonde ele irá jogar
            espacoVazio = linha[i]
        }
    }

    // Caso o jogador fez duas jogadas e há um espaço vazio
    // O espaço vazio é jogado
    if (jogadasJogador == 2 && espacoVazio != null)
        return espacoVazio
    return false
}