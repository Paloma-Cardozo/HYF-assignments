function getRenderedGame(position) {
  let output = "*******\n";

  for (let i = 0; i < 3; i++) {
    output += "*";
    for (let j = 0; j < 3; j++) {
      let cell = position[i][j] || "";
      output += cell + "*";
    }
    output += "\n";
  }

  output += "*******";
  return output;
}

function getGameInfo(position) {
  const winner = getWinner(position);
  let nextPlayer = null;

  if (!winner && !isBoardFull(position)) {
    nextPlayer = countMoves(position) % 2 === 0 ? "X" : "O";
  }

  return {
    winner: winner || undefined,
    loser: winner ? (winner === "X" ? "O" : "X") : undefined,
    hasEnded: winner !== null,
    nextPlayer: nextPlayer,
  };
}

function countMoves(position) {
  let count = 0;
  for (let row of position) {
    for (let cell of row) {
      if (cell === "X" || cell === "O") count++;
    }
  }

  return count;
}

function getWinner(position) {
  const lines = [
    [position[0][0], position[0][1], position[0][2]],
    [position[1][0], position[1][1], position[1][2]],
    [position[2][0], position[2][1], position[2][2]],

    [position[0][0], position[1][0], position[2][0]],
    [position[0][1], position[1][1], position[2][1]],
    [position[0][2], position[1][2], position[2][2]],

    [position[0][0], position[1][1], position[2][2]],
    [position[0][2], position[1][1], position[2][0]],
  ];

  for (let line of lines) {
    if (line[0] && line[0] === line[1] && line[1] === line[2]) {
      return line[0];
    }
  }

  return null;
}

function isBoardFull(position) {
  return position.every((row) => row.every((cell) => cell !== ""));
}

let position = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let currentPlayer = "X";

function playPrompt() {
  while (true) {
    console.log(getRenderedGame(position));
    console.log("Turn: " + currentPlayer);

    let row = parseInt(prompt("Enter row (0, 1 o 2):"));
    let col = parseInt(prompt("Enter column (0, 1 o 2):"));

    if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2) {
      console.log("Invalid coordinates.");
      continue;
    }

    if (position[row][col] !== "") {
      console.log("That cell is already occupied.");
      continue;
    }

    position[row][col] = currentPlayer;

    if (getWinner(position)) {
      console.log(getRenderedGame(position));
      console.log("Winner: " + currentPlayer);
      return;
    } else if (isBoardFull(position)) {
      console.log(getRenderedGame(position));
      console.log("Draw.");
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

playPrompt();
