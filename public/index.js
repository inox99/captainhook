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

document.getElementById("home-button").addEventListener("click", () => {
  hideAllDivs();
  document.getElementById("home").style.display = "block";
});

document.getElementById("headquarters-button").addEventListener("click", () => {
  hideAllDivs();
  document.getElementById("headquarters").style.display = "block";
});

document.getElementById("shop-button").addEventListener("click", () => {
  hideAllDivs();
  document.getElementById("shop").style.display = "block";
});

document.getElementById("options-button").addEventListener("click", () => {
  hideAllDivs();
  document.getElementById("options").style.display = "block";
});
