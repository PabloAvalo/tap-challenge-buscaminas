var express = require('express');
var board = require('./components/board/routes');

const app = express();

app.use(express.json());

app.use('/boards', board);

const port = 8080;

app.listen(  port , () => {
    console.log(`Listening on port ${port}`);
})