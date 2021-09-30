const createRandomSquare = (x, y) => {
    const number = Math.random();
    
    return {
        id : `${x}${y}`,
        isMine : number > 0.7,
        revealed : false,
        hasFlag : false,
        row : x,
        column : y
    }

}

const generateBoardModel = (height = 10, width = 10) => {

    const squares = [];

    for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
            squares.push(createRandomSquare(row , column));            
        }
    }

    return { height , width , squares , flags : Math.floor(squares.length * 0.1)};

}


const mapToGraph = (board) => {

    const {squares} = board;

    let boardGraph = getSquareType(squares[0] , squares);

    for (let index = 1; index < board.squares.length; index++) {
        boardGraph +=  squares[index].row == squares[index - 1].row ? '\t' : '\n';
        boardGraph += getSquareType(squares[index] , squares);
        
    }

    return boardGraph;
}

const getSquareType = ( square , squares ) => {

    if ( square.hasFlag && !square.revealed) return '?'; // flag
    if ( !square.revealed ) return 'U'; //unrevealed    
    if ( square.isMine) return 'X'; // bomb
    
    return calculateNumberOfMinesAround( square.row , square.column , squares)
    
}

const calculateNumberOfMinesAround = (x, y , squares) => {
    const mines = squares.filter( s => s.isMine && Math.abs(s.row - x) <= 1 && Math.abs(s.column - y) <= 1);
    return mines.length.toString();                                

}


module.exports.createRandomSquare = createRandomSquare;
module.exports.generateBoardModel = generateBoardModel;
module.exports.mapToGraph = mapToGraph;