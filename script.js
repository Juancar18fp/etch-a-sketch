const board = document.querySelector(".board");
const buttons = document.querySelectorAll("button");
const sizeButtons = document.querySelectorAll(".size");
const midButton = document.querySelector(".medio");

let actualSize = "mid";
let rainbow = false;
let opacity = 0.1;

midButton.style.backgroundColor = "#81A1F3";
setMidBoard();

board.addEventListener("mouseover", (e) => {
	if (
		e.target.classList.contains("mid-pixel") ||
		e.target.classList.contains("small-pixel") ||
		e.target.classList.contains("big-pixel")
	) {
		if (rainbow) {
			const r = Math.floor(Math.random() * 256);
			const g = Math.floor(Math.random() * 256);
			const b = Math.floor(Math.random() * 256);
			e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
		} else {
			e.target.style.backgroundColor = "black";
			e.target.style.opacity = opacity;
			if (opacity <= 0.9) {
				opacity += 0.1;
			} else {
				opacity = 0.1;
			}
		}
	}
});

for (const button of buttons) {
	button.addEventListener("click", (e) => {
		if (e.target.matches(".size")) {
			handleSizeChange(e.target);
		} else if (e.target.matches(".reset")) {
			handleReset();
		} else if (e.target.matches(".rainbow")) {
			handleRainbowToggle(e.target);
		}
	});
}

function handleReset() {
	clearBoard();
	actualSize === "small"
		? setSmallBoard()
		: actualSize === "mid"
			? setMidBoard()
			: setBigBoard();
}

function handleRainbowToggle(target) {
	rainbow = !rainbow;
	if (rainbow) {
		target.style.backgroundColor = "#81A1F3";
	} else {
		target.style.backgroundColor = "#F38181";
	}
}

function handleSizeChange(target) {
	resetButtonFormat();
	actualSize = target.classList.contains("pequeño")
		? "small"
		: target.classList.contains("medio")
			? "mid"
			: "big";
	target.style.backgroundColor = "#81A1F3";
	actualSize === "small"
		? setSmallBoard()
		: actualSize === "mid"
			? setMidBoard()
			: setBigBoard();
}

function resetButtonFormat() {
	for (const button of sizeButtons) {
		button.style.backgroundColor = "#F38181";
	}
}

function clearBoard() {
	while (board.firstChild) {
		board.removeChild(board.firstChild);
	}
}

function setBoard(size, className) {
	clearBoard();
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size / 2; j++) {
			const pixel = document.createElement("div");
			pixel.classList.add(className);
			board.appendChild(pixel);
		}
	}
}

function setBigBoard() {
	setBoard(64, "small-pixel");
}

function setMidBoard() {
	setBoard(32, "mid-pixel");
}

function setSmallBoard() {
	setBoard(16, "big-pixel");
}
