var express = require('express');
const { createBoard, getBoard, postActionOnSquare , getBoardGraph } = require('./service');

var router = express.Router()

router.get('/:id', function ({ params }, res) {
  try {
    const board = getBoard(params.id);
    res.status(200).send(board);
  }
  catch (error) {
    res.status(error.statusCode).send(error.message)
  }

});


//es un post por comodidad para jugar en el postman ( lo definiria como un get)
router.post('/:id/graph', function ({ params }, res) {
  try {
    const board = getBoardGraph(params.id);
    res.status(200).send(board);
  }
  catch (error) {
    res.status(error.statusCode).send(error.message)
  }

});

router.post('/', function ({ body }, res) {
  try {
    const board = createBoard(body);
    res.status(201).send(board);
  }
  catch (error) {
    res.status(error.statusCode).send(error.message)
  }
});

router.post('/:id/squares/:squareId', function ({ body, params }, res) {
  try{
  const board = postActionOnSquare(params.id, params.squareId, body.option);
  res.status(200).send(board);
  }
  catch(error){
    res.status(error.statusCode).send(error.message);
  }
});



module.exports = router