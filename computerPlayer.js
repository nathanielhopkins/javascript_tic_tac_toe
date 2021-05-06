let Board = require('./board');

class ComputerPlayer {
  constructor() {
    this.mark = 'o';
  }

  promptMove(reader, board, callback) {
    callback(this.bestMove(board));
  }
  
  possibleMoves(board) {
    let possMoves = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board.empty([i, j])) {
          possMoves.push([i, j]);
        }
      }
    }
    return possMoves;
  }
  
  cloneBoard(board) {
    let cloneGrid = [[],[],[]]
    for(let i=0; i<3; i++) {
      for(let j=0; j<3; j++) {
        cloneGrid[i].push(board.grid[i][j])
      }
    }

    let clone = new Board;
    clone.grid = cloneGrid;
    return clone;
  }

  winningMove(pos,board) {
    let cloneBoard = ai.cloneBoard(board);
    cloneBoard.placeMark(pos, this.mark)
    if(cloneBoard.winner() === this.mark) {
      return true;
    } else {
      return false;
    }
  }

  blockingMove(pos,board) {
    let cloneBoard = ai.cloneBoard(board);
    let opponent = this.mark === 'o' ? 'x' : 'o';
    cloneBoard.placeMark(pos, opponent);
    if (cloneBoard.winner() === opponent) {
      return true;
    } else {
      return false;
    }
  }

  anyWinners(moves, board) {
    let winners = [];
    moves.forEach(pos => {
      if(this.winningMove(pos, board)) {
        winners.push(pos);
      }
    })
    return this.randomMove(winners);
  }

  anyBlockers(moves, board) {
    let blockers = [];
    moves.forEach(pos => {
      if(this.blockingMove(pos, board)) {
        blockers.push(pos);
      }
    })
    return this.randomMove(blockers);
  }

  randomMove(moves) {
    let size = moves.length;
    let idx = Math.floor(Math.random() * size);
    return moves[idx];
  }

  bestMove(board) {
    let moves = this.possibleMoves(board);
    let bestMove;
    if(this.anyWinners(moves, board)) {
      bestMove = this.anyWinners(moves, board);
    } else if (this.anyBlockers(moves, board)) {
      bestMove = this.anyBlockers(moves, board);
    } else {
      bestMove = this.randomMove(moves);
    }
    return bestMove;
  }
}

let ai = new ComputerPlayer;
let emptyBoard = new Board;
let almostWon = new Board;
almostWon.grid = [['o','o',[]],[[],'o',[]],['o',[],[]]];
let almostLost = new Board;
almostLost.grid = [['x', 'x', []], [[], 'x', []], ['x', [], []]];


module.exports = ComputerPlayer;