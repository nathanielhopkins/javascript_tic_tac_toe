class Board {
  constructor() {
    this.grid = [[[],[],[]],[[],[],[]],[[],[],[]]]
    this.marks = ['x','o'];
  }

  print() {
    console.log(JSON.stringify(this.grid[0]));
    console.log(JSON.stringify(this.grid[1]));
    console.log(JSON.stringify(this.grid[2]));
  }

  validMove(pos) {
    if(!isNaN(pos[0]) && !isNaN(pos[1])) {
      if ((pos[0] <= 2) && (pos[1] <= 2)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  empty(pos) {
    if (!this.validMove(pos)) {
      return false;
    }
    if(this.grid[pos[0]][pos[1]].length === 0) {
      return true;
    } else {
      return false;
    }
  }

  placeMark(pos, mark) {
    if(this.empty(pos) === true) {
      this.grid[pos[0]][pos[1]] = mark;
      return true;
    } else {
      return false;
    }
  }

  won() {
    if(this.wonHorizontal() || this.wonVertical() || this.wonDiagonal()) {
      return true;
    } else {
      return false;
    }
  }

  boardFull() {
    let full = true;
    for(let i=0; i<3; i++) {
      for(let j=0; j<3; j++) {
        if(this.empty([i,j])) {
          full = false;
        }
      }
    }
    return full;
  }

  winner() {
    if(this.wonHorizontal()) {
      return this.wonHorizontal();
    } else if (this.wonVertical()) {
      return this.wonVertical();
    } else if (this.wonDiagonal()) {
      return this.wonDiagonal();
    } else {
      return false;
    }
  }

  wonHorizontal() {
    let wonHorz = false;
    this.grid.forEach(row => {
      if(row[0] === row[1] && row[0] === row[2]) {
        wonHorz = row[0];
      }
    })
    return wonHorz;
  }

  wonVertical() {
    let wonVert = false;
    for (let i = 0; i < 3; i++) {
      if (this.grid[0][i] === this.grid[1][i] && this.grid[1][i] === this.grid[2][i]) {
        wonVert = this.grid[0][i];
      }
    }
    return wonVert;
  }

  wonDiagonal() {
    let wonDiag = false;
    if(this.grid[0][0] === this.grid[1][1] && this.grid[1][1] === this.grid[2][2]){
      wonDiag = this.grid[0][0];
    } else if(this.grid[0][2] === this.grid[1][1] && this.grid[1][1] === this.grid[2][0]) {
      wonDiag = this.grid[0][2];
    }
    return wonDiag;
  }
}

module.exports = Board;