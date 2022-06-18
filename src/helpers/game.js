const fillMatrix = (n = 10) => {
  return Array(n)
    .fill()
    .map(() => Array(n).fill(0));
};

const fillMatrixToRemis = () => {
  return [
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    [2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    [2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
    [2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    [2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
    [2, 1, 2, 1, 2, 1, 2, 1, 0, 0],
  ];
};

const checkGame = (matrix) => {
  let winner = null;

  const checkHorizontally = () => {
    console.log("checkHorizontally!");
    for (var i = 0; i < matrix.length; i++) {
      var count_x = 0;
      var count_o = 0;
      for (var j = 1; j < matrix[i].length + 1; j++) {
        if (matrix[i][j] !== 0 && matrix[i][j - 1] === matrix[i][j]) {
          if (matrix[i][j] === 1) count_x++;
          else count_o++;
          if (count_x >= 4) {
            winner = 1;
            console.log("WINNER!");
          } else if (count_o >= 4) {
            winner = 2;
            console.log("WINNER!");
          }
        } else {
          count_x = 0;
          count_o = 0;
        }
      }
    }
  };

  const checkVertically = () => {
    console.log("checkVertically");
    const matrixT = matrix.map((_, index) => matrix.map((row) => row[index]));
    for (var i = 0; i < matrixT.length; i++) {
      var count_x = 0;
      var count_o = 0;
      for (var j = 1; j < matrixT[i].length + 1; j++) {
        if (matrixT[i][j] !== 0 && matrixT[i][j - 1] === matrixT[i][j]) {
          if (matrixT[i][j] === 1) count_x++;
          else count_o++;
          if (count_x >= 4) {
            winner = 1;
            console.log("WINNER!");
          } else if (count_o >= 4) {
            winner = 2;
            console.log("WINNER!");
          }
        } else {
          count_x = 0;
          count_o = 0;
        }
      }
    }
  };

  const checkDiagonally = (bottomToTop) => {
    console.log("checkDiagonally!");
    var Ylength = matrix.length;
    var Xlength = matrix[0].length;
    var maxLength = Math.max(Xlength, Ylength);
    var temp;
    for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
      temp = [];
      for (var y = Ylength - 1; y >= 0; --y) {
        var x = k - (bottomToTop ? Ylength - y : y);
        if (x >= 0 && x < Xlength) {
          temp.push(matrix[y][x]);
        }
      }
      if (temp.length > 0) {
        var count_x = 0;
        var count_o = 0;
        for (var i = 1; i < temp.length + 1; i++) {
          if (temp[i] !== 0 && temp[i - 1] === temp[i]) {
            if (temp[i] === 1) count_x++;
            else count_o++;
            if (count_x >= 4) {
              winner = 1;
              console.log("WINNER!");
            } else if (count_o >= 4) {
              winner = 2;
              console.log("WINNER!");
            }
          } else {
            count_x = 0;
            count_o = 0;
          }
        }
      }
    }
  };

  checkVertically();
  checkHorizontally();
  checkDiagonally(true);
  checkDiagonally(false);

  //tie
  if (!matrix.some((row) => row.includes(0)) && winner === null) {
    winner = 3;
  }

  return { gameOver: winner !== null, winner: winner };
};

async function randomMove(matrix) {
  if (matrix.some((row) => row.includes(0))) {
    let findResult = false;
    let min = 0;
    let max = Math.floor(matrix.length - 1);
    while (findResult === false) {
      let i = Math.floor(Math.random() * (max - min + 1)) + min;
      let j = Math.floor(Math.random() * (max - min + 1)) + min;
      let random = matrix[i][j];
      if (random === 0) {
        findResult = true;
        return { isTie: false, row: i, col: j };
      }
    }
  } else {
    return { isTie: true };
  }
}

export { fillMatrix, fillMatrixToRemis, checkGame, randomMove };
