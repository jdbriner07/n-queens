/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n, startRowPos) {
  var solution = [];
  var numPieces = 0;
  startRowPos = startRowPos || 0;
  var board = new Board({n: n});
  for (var row = startRowPos; row < n; row++) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, col);
      }
    }
  }
  for (var i = 0; i < n; i++ ) {
    solution.push(board.attributes[i]);
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  //build a board
  var board = new Board({n: n});

  var getRookSolution = function(countDown, rowIndex) {
    // Base case: if countDown === 0
    if (countDown <= 0) {
      solutionCount++;
      return;
    } else {
      // Loop through current row
      for (var i = 0; i < n; i++) {
        // Toggle current row/col
        board.togglePiece(rowIndex, i);
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(rowIndex, i);      
        } else {
          // Call getRookSolution(n - 1, rowIndex + 1)
          getRookSolution(countDown - 1, rowIndex + 1);
          // Toggle current row/col
          board.togglePiece(rowIndex, i);
        }
      }
    }
  };
  getRookSolution(n, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var board = new Board({n: n });
  var newBoard;
  var getQueensSolution = function(rowIndex) {
    if (rowIndex === n) {
      // newBoard = JSON.parse(JSON.stringify(board));
      console.log(board);
      return;
    } else {
      for (var col = 0; col < n; col++) {
        board.togglePiece(rowIndex, col);
        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(rowIndex, col);
        } else {
          getQueensSolution(rowIndex + 1);
          //board.togglePiece(rowIndex, col);
        }
      }
    }
  };
  getQueensSolution(0);

  for (var i = 0; i < n; i++ ) {
    solution.push(board.attributes[i]);
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n });
  //var numPieces = 0;
  var getQueensSolution = function(rowIndex) {
    if (rowIndex === n) {
      solutionCount++;
      return;
    } else {
      for (var col = 0; col < n; col++) {
        board.togglePiece(rowIndex, col);
        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(rowIndex, col);
        } else {
          getQueensSolution(rowIndex + 1);
          board.togglePiece(rowIndex, col);
        }
      }
    }
  };
  getQueensSolution(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};















// n/2 + 1
