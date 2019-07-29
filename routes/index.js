var express = require('express');
const api = require('../api/clues');
const _ = require('lodash');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const boardData = api.boardData;
  let categories = [];
  let _clues = _.chunk(boardData, 5);
  let rows = [];
  
  _clues.forEach((chunk) => {
    chunk.sort((a, b) => {
      return a.value - b.value;
    });

    if (rows.length === 0) {
      rows = chunk;
    }
    categories.push(chunk[0].category);
    rows = rows.concat(chunk);
  });

  let row1 = takeFive(rows, 0);
  let row2 = takeFive(rows, 1);
  let row3 = takeFive(rows, 2);
  let row4 = takeFive(rows, 3);
  let row5 = takeFive(rows, 4);

  res.render('index', { 
    categories: categories,
    row1: row1,
    row2: row2,
    row3: row3,
    row4: row4,
    row5: row5
  });

});

function takeFive(boardData, idx) {
  return [boardData[idx], boardData[idx + 5], boardData[idx + 10], boardData[idx + 15], boardData[idx + 20]];
}

module.exports = router;
