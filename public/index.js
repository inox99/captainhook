const socket = io("ws://localhost:3000");

socket.on("connect", () => {
  console.log("connected", socket);
});

// Funktion, um alle div-Elemente innerhalb von #body auszublenden
function hideAllDivs() {
  const divs = document.querySelectorAll("#body div");
  for (const div of divs) {
    div.style.display = "none";
  }
}

function hideActiveDiv() {
  if (document.getElementById("home").style.display === "block") {
    document.getElementById("home").style.display = "none";
  } else if (
    document.getElementById("headquarters").style.display === "block"
  ) {
    document.getElementById("headquarters").style.display = "none";
  } else if (document.getElementById("shop").style.display === "block") {
    document.getElementById("shop").style.display = "none";
  } else if (document.getElementById("options").style.display === "block") {
    document.getElementById("options").style.display = "none";
  }
}

document.getElementById("home-button").addEventListener("click", () => {
  hideActiveDiv();
  document.getElementById("home").style.display = "block";
});

document.getElementById("headquarters-button").addEventListener("click", () => {
  hideActiveDiv();
  document.getElementById("headquarters").style.display = "block";
});

document.getElementById("shop-button").addEventListener("click", () => {
  hideActiveDiv();
  document.getElementById("shop").style.display = "block";
});

document.getElementById("options-button").addEventListener("click", () => {
  hideActiveDiv();
  document.getElementById("options").style.display = "block";
});

// HEADQUARTERS
const optionContainer = document.querySelector(".option-container");
const flipButton = document.querySelector("#flip-button");
const gamesBoardContainer = document.querySelector("#gamesboard-container");
//================================
//ROTATE FUNCTION IN SHIPS CONTAINER
let angle = 0;
function flip() {
  const optionShips = Array.from(optionContainer.children);

  angle = angle === 0 ? 90 : 0;

  optionShips.forEach(
    (optionShip) => (optionShip.style.transform = `rotate(${angle}deg)`)
  );
}

//CREATE BOARDS
const width = 10;

function createBoard(color, user) {
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.classList.add("game-board");
  gameBoardContainer.style.backgroundColor = color;
  gameBoardContainer.id = user;

  for (let i = 0; i < width * width; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.id = i;
    gameBoardContainer.append(block);
  }
  gamesBoardContainer.append(gameBoardContainer);
}

createBoard("yellow", "player1");
createBoard("pink", "computer");
flipButton.addEventListener("click", flip);

//CREATE SHIPS

class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
}

const destroyer = new Ship("destroyer", 2);
const submarine = new Ship("submarine", 3);
const battleship = new Ship("battleship", 4);
const cruiser = new Ship("cruiser", 3);
const carrier = new Ship("carrier", 5);

const ships = [destroyer, submarine, battleship, cruiser, carrier];

function addShipPiece(ship) {
  const allBoardBlocks = document.querySelectorAll("#computer div");
  let randomBoolean = Math.random() < 0.5;
  let isHorizontal = randomBoolean;
  let randomStartIndex = Math.floor(Math.random() * width * width);
  console.log(randomStartIndex);

  let shipBlocks = [];

  let validStart =
    //check horizontal
    isHorizontal
      ? randomStartIndex <= width * width - ship.length
        ? randomStartIndex
        : width * width - ship.length
      : //check vertical
      randomStartIndex <= width * width - width * ship.length
      ? randomStartIndex
      : randomStartIndex - ship.length * width + width;

  for (let i = 0; i < ship.length; i++) {
    if (isHorizontal) {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i]);
    } else {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i * width]);
    }
  }

  if (isHorizontal) {
    shipBlocks.every(
      (_shipBlock, index) =>
        (valid =
          shipBlocks[0].id % width !==
          width - (shipBlocks.length - (index + 1)))
    );
  } else {
    shipBlocks.every(
      (_shipBlock, index) =>
        (valid = shipBlocks[0].id < 90 + (width * index + 1))
    );
  }

  const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'))

  if (valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add(ship.name);
      shipBlock.classList.add("taken");
    });
  } else {
    addShipPiece(ship);
  }
}

ships.forEach((ship) => {
  addShipPiece(ship);
});
