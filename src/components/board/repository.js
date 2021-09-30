let sequence = 0;

const boards = [];

const insertBoard = (board) => {

    sequence++;

    boards.push(
        {
            id: sequence,
            height : board.height,
            width : board.width,
            squares: board.squares,
            flags : board.flags

        });


    return getBoardById(sequence);

}


const getBoardById = (id) => {
    return boards.find( b => b.id == id);
}


const updateSquareModel = ( boardId , squareModel) => {
    const board = getBoardById(boardId);
    const squareIndex  = board.squares.findIndex( s => s.id == squareModel.id );
    board.squares[squareIndex] = squareModel;

}

const removeFlagsCounter = ( boardId) => {
    const board = getBoardById(boardId);
    board.flags --;
}

const addFlagCounter = ( boardId) => {
    const board = getBoardById(boardId);
    board.flags ++;
}


const revealBoard = ( boardId) => {
    const board = getBoardById(boardId);
    const revealedSquares = board.squares.map( s => ( {...s , revealed : true }) );
    board.squares = revealedSquares;
}





module.exports.insertBoard = insertBoard;
module.exports.getBoardById = getBoardById;
module.exports.updateSquareModel = updateSquareModel;
module.exports.removeFlagsCounter = removeFlagsCounter;
module.exports.addFlagCounter = addFlagCounter;
module.exports.revealBoard = revealBoard;