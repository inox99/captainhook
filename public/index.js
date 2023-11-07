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

function createBoard() {
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.classList.add("game-board");
  gameBoardContainer.style.backgroundColor = "pink";

  gamesBoardContainer.append(gameBoardContainer);
}

createBoard();
flipButton.addEventListener("click", flip);
