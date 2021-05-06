let Game = require('./game.js');
let HumanPlayer = require('./humanPlayer');
let ComputerPlayer = require('./ComputerPlayer');

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let game = new Game(reader, new HumanPlayer, new ComputerPlayer);

let playAgain = () => {
  reader.question(`Would you like to play again? (yes or no)`, replay => {
    if(replay === 'yes') {
      let newGame = new Game(reader, new HumanPlayer, new ComputerPlayer);
      newGame.run(playAgain);
    } else {
      console.log("Thanks for playing!")
      reader.close();
    }
  });
}



game.run(playAgain);
