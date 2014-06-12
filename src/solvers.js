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

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

/*
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var allCols=[];

  for (var i=0; i<n; i++) {
    allCols.push(i);
  }

  var noMajorOrMinorConflict = function(board, r, c) {
    return board.hasMinorDiagonalConflictAt(c+r)===false && board.hasMajorDiagonalConflictAt(c-r)===false;
  }

  var findQueens = function(playsLeft, remainingCols, board) {
    // create board
    if (playsLeft===n) {
      board=new Board({n:n});
    } else {
      board=new Board(board.rows());
    }

    if (playsLeft>0) {
      var masterRow=board.get(n-playsLeft)
      //loop over and place piece
      for (var col=0; col<remainingCols.length; col++) {
        var column=remainingCols[col];
        row=masterRow.slice();
        row[column]=1;
        board.set(n-playsLeft, row);

        //copy columns and remove used column
        var newCols=remainingCols.slice();
        newCols.splice(col, 1);

        //check for conflicts and recurse
        if (noMajorOrMinorConflict(board, n-playsLeft, column)) {
          findQueens(playsLeft-1, newCols, board);
        }
      }

    } else if (playsLeft===0) {
      solutionCount++;
    }
  }

  findQueens(n, allCols);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
*/



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var allCols=[];

  for (var i=0; i<n; i++) {
    allCols.push(i);
  }

  var openMajorandMinor = function (majors, minors, r, c) {
    var maj=c-r;
    var min=c+r;
    return _.indexOf(majors, maj) === -1 && _.indexOf(minors, min)=== -1;
  }

  var findQueens = function(playsLeft, remainingCols, board, filledMaj, filledMin) {
    // create board
    if (playsLeft===n) {
      board=new Board({n:n});
    } else {
      board=new Board(board.rows());
    }

    if (playsLeft>0) {
      //loop over and place piece
      for (var col=0; col<remainingCols.length; col++) {
        var column=remainingCols[col];

        //check to see if diagonals are open before placing
        if (openMajorandMinor (filledMaj, filledMin, n-playsLeft, column)) {
          var row=board.get(n-playsLeft);

          row[column]=1;
          board.set(n-playsLeft, row);

          //copy columns and remove used column
          var newCols=remainingCols.slice();
          newCols.splice(col, 1);

          //update newly filled diagonals
          var newMaj=filledMaj.slice();
          newMaj.push(column-(n-playsLeft));
          
          var newMin=filledMin.slice();
          newMin.push(column+(n-playsLeft));

          findQueens(playsLeft-1, newCols, board, newMaj, newMin);
        }

      }

    } else if (playsLeft===0) {
      solutionCount++;
    }
  }

  findQueens(n, allCols, undefined, [], []);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};




