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

createBoard("yellow", "player");
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
const cruiser = new Ship("cruiser", 2);
const carrier = new Ship("carrier", 5);

const ships = [destroyer, submarine, battleship, cruiser, carrier];
let notDropped;

function getValidity(allBoardBlocks, isHorizontal, startIndex, ship) {
  let validStart =
    //check horizontal
    isHorizontal
      ? startIndex <= width * width - ship.length
        ? startIndex
        : width * width - ship.length
      : //check vertical
      startIndex <= width * width - width * ship.length
      ? startIndex
      : startIndex - ship.length * width + width;

  let shipBlocks = [];

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

  const notTaken = shipBlocks.every(
    (shipBlock) => !shipBlock.classList.contains("taken")
  );

  return { shipBlocks, valid, notTaken };
}

function addShipPiece(user, ship, startId) {
  const allBoardBlocks = document.querySelectorAll(`#${user} div`);
  let randomBoolean = Math.random() < 0.5;
  let isHorizontal = user === "player" ? angle === 0 : randomBoolean;
  let randomStartIndex = Math.floor(Math.random() * width * width);

  let startIndex = startId ? startId : randomStartIndex;

  const { shipBlocks, valid, notTaken } = getValidity(
    allBoardBlocks,
    isHorizontal,
    startIndex,
    ship
  );

  if (valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add(ship.name);
      shipBlock.classList.add("taken");
    });
  } else {
    if (user === "computer") addShipPiece("computer", ship, startId);
    if (user === "player") notDropped = true;
  }
}

ships.forEach((ship) => {
  addShipPiece("computer", ship);
});

//DRAG FUNCTIONS FOR PLAYER SHIPS
let draggedShip;
const optionShips = Array.from(optionContainer.children);
optionShips.forEach((optionShip) =>
  optionShip.addEventListener("dragstart", dragStart)
);

const allPlayerBlocks = document.querySelectorAll("#player div");
allPlayerBlocks.forEach((playerBlock) => {
  playerBlock.addEventListener("dragover", dragOver);
  playerBlock.addEventListener("drop", dropShip);
});

function dragStart(e) {
  notDropped = false;
  console.log(e.target);
  draggedShip = e.target;
}

function dragOver(e) {
  e.preventDefault();
  const ship = ships[draggedShip.id];
  highlightArea(e.target.id, ship);
}

function dropShip(e) {
  const startId = e.target.id;
  const ship = ships[draggedShip.id];
  addShipPiece("player", ship, startId);
  if (!notDropped) {
    draggedShip.remove();
  }
}

// ADD HIGHLIGHTING
function highlightArea(startIndex, ship) {
  const allBoardBlocks = document.querySelectorAll("#player div");
  let isHorizontal = angle === 0;
  const { shipBlocks, valid, notTaken } = getValidity(
    allBoardBlocks,
    isHorizontal,
    startIndex,
    ship
  );

  if (valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add("hover-valid");
      setTimeout(() => shipBlock.classList.remove("hover-valid"), 500);
    });
  } else {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add("hover-taken");
      setTimeout(() => shipBlock.classList.remove("hover-taken"), 500);
    });
  }
}
