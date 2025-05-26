export class Saper {
  constructor(cells, bombs) {
    this.cellsCount = cells;
    this.bombsCount = bombs;
    this.board = [];
  }

 _fillBoard() {
  for (let i = 0; i < this.cellsCount; i++) {
    const row = [];
    for (let j = 0; j < this.cellsCount; j++) {
      row.push(null);
    }
    this.board.push(row);
  }
}

  _setBombs() {
  let placedBombs = 0;

  while (placedBombs < this.bombsCount) {
    const randomIndex = Math.floor(Math.random() * this.cellsCount);
    const randomCell = Math.floor(Math.random() * this.cellsCount);

    if (this.board[randomIndex][randomCell] !== "B") {
      this.board[randomIndex][randomCell] = "B";
      placedBombs++;
    }
  }

  console.log(`Bombs were setted`);
}

   _setValues() {
    const size = this.board.length;
    
    for (let row = 0; row < size; row++) {
      for (let cell = 0; cell < size; cell++) {
        if (this.board[row][cell] === 'B') {
            continue;
        }
        let bombsCount = 0;
        
        const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [ 0, -1],          [ 0, 1],
        [ 1, -1], [ 1, 0], [ 1, 1],
      ];
        
        for (let [dx, dy] of directions) {
          const newRow = row + dx;
          const newCell = cell + dy;

          
          if (newRow >= 0 &&
              newRow < size &&
              newCell >= 0 &&
              newCell < size &&
              this.board[newRow][newCell] === 'B') {
            bombsCount++;
          }
        }
        
        this.board[row][cell] = bombsCount;
      }
    }
  }

  start() {
    console.log(`getting arguments: cells: ${this.cellsCount} | bombs: ${this.bombsCount}`);

    this._fillBoard();
    this._setBombs();
    this._setValues();
    console.log("done");

    console.log(this.board);
    return this.board;
  }
}
