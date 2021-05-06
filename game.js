let Board = require('./board');

class Game {
  constructor(reader, player1, player2) {
    this.board = new Board();
    this.reader = reader;
    this.players = [player1, player2];
    this.currentPlayer = player1;
  }

  run(completionCallback) {
  if (this.board.boardFull()) {
    console.log('Game ended in a tie.');
    completionCallback();
  } else if (!this.board.won()) {
    console.log(`It is ${this.currentPlayer.mark}'s turn.`);
    this.board.print();
    this.currentPlayer.promptMove(reader, this.board, move => {
      if (this.board.placeMark(move, this.currentPlayer.mark) === true) {
        this.switchPlayer();
      } else {
        console.log('This is not a valid move, please select again.')
      }
      this.run(completionCallback);
    });
  } else {
    this.switchPlayer();
      this.board.print();
      console.log(`Player ${this.currentPlayer.mark} wins!`);
      completionCallback();
    }
  }

  switchPlayer() {
    this.currentPlayer= this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
  }
}

module.exports = Game;