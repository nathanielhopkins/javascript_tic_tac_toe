class HumanPlayer {
  constructor() {
    this.mark = 'x';
  }

  promptMove(reader, board, callback) {
    reader.question("Where would you like to place your ${this.mark}? :  ", answer => {
      let pos = [parseInt(answer[0]), parseInt(answer[2])];
      callback(pos);
    })
  }
}

module.exports = HumanPlayer;