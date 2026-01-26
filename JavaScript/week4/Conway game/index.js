const rows = 10;
const columns = 10;

let grid = [];

for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < columns; j++) {
    row.push(Math.random() < 0.3 ? 1 : 0);
  }
  grid.push(row);
}

function countNeighbors(grid, x, y) {
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      var rowNe = x + i;
      var columnNe = y + j;

      if (
        rowNe >= 0 &&
        rowNe < grid.length &&
        columnNe >= 0 &&
        columnNe < grid[0].length
      ) {
        count += grid[rowNe][columnNe];
      }
    }
  }

  return count;
}

function nextGeneration(grid) {
  let newGrid = [];

  for (let i = 0; i < grid.length; i++) {
    let newRow = [];
    for (let j = 0; j < grid[i].length; j++) {
      newRow.push(grid[i][j]);
    }
    newGrid.push(newRow);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let neighbors = countNeighbors(grid, i, j);

      if (grid[i][j] === 1) {
        if (neighbors < 2 || neighbors > 3) {
          newGrid[i][j] = 0;
        } else {
          if (neighbors === 3) {
            newGrid[i][j] = 1;
          }
        }
      }
    }
  }

  return newGrid;
}

function printBoard(grid) {
  for (let i = 0; i < grid.length; i++) {
    let line = "";
    for (let j = 0; j < grid[i].length; j++) {
      line += grid[i][j] === 1 ? "X" : ".";
    }

    console.log(line);
  }
}

let generations = 10;
console.log("Initial board:");
printBoard(grid);

for (let g = 0; g < generations; g++) {
  grid = nextGeneration(grid);
  console.log("Generation " + g + ":");
  printBoard(grid);
}
