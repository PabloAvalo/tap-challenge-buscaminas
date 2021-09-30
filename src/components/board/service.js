const { generateBoardModel, mapToGraph } = require("./functions");
const { HttpClientError } = require('./models/Errors')
const { insertBoard, getBoardById, updateSquareModel,
    removeFlagsCounter, addFlagCounter, revealBoard } = require('./repository');

const createBoard = ( { height = 10 , width = 10 }) => {

    const boardModel = generateBoardModel(height , width);

    const newBoard = insertBoard(boardModel);

    return newBoard

}


const getBoard = (id) => {
    const board = getBoardById(id);

    if (!board)
        return createBoard();

    return board;

}


const getBoardGraph = (id) => {
    const board = getBoardById(id);
    if (!board) throw new HttpClientError(404, 'No se encontro el tablero');
    return mapToGraph(board);
}


const postActionOnSquare = (boardId, squareId, option = 'reveal') => {
    const board = getBoardById(boardId);

    if (!board) throw new HttpClientError(404, 'No se encontro el juego');

    const { squares, flags } = board;

    const square = squares.find(s => s.id == squareId);

    if (!square) throw new HttpClientError(404, 'No se encontro el casillero indicado en el tablero');

    if (square.revealed) throw new HttpClientError(400, 'El casillero ya ha sido revelado');

    if (option == 'reveal') revealSquare(boardId, square);

    if (option == 'flag') {
        
        if (!flags) throw new HttpClientError(400, 'No hay mas banderas');

        if (!square.hasFlag) putFlagOnSquare(boardId, square);
    }
   

    return {
        status: getBoardStatus(boardId),
        board: getBoardById(boardId),
    }

}

const revealSquare = (boardId, square) => {

    const squareModel = updateSquareModel(boardId, { ...square, revealed: true, hasFlag: false });

    if (square.hasFlag)
        addFlagCounter(boardId);

    if (square.isMine)
        revealBoard(boardId);

    return squareModel;

}

const putFlagOnSquare = (boardId, square) => {

    removeFlagsCounter(boardId);

    const squareModel = updateSquareModel(boardId, { ...square, hasFlag: true });

    return squareModel;
}

const getBoardStatus = (boardId) => {
    const board = getBoardById(boardId);

    const minesRevealed = board.squares.filter(s => s.revealed && s.isMine).length;

    if (minesRevealed) return 'Perdiste';

    const totalSquares = board.squares.length;
    const totalRevealed = board.squares.filter(s => s.revealed && !s.isMine).length;
    const totalMines = board.squares.filter(s => s.isMine);

    if (totalSquares == totalRevealed + totalMines) return 'Ganaste';

    return 'En Juego';

}




module.exports.createBoard = createBoard;
module.exports.getBoard = getBoard;
module.exports.postActionOnSquare = postActionOnSquare;
module.exports.getBoardGraph = getBoardGraph;