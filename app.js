// Selections
const display = document.querySelector(".display");
const calcContainer = document.querySelector(".calc-container");

// Declaration
let result = "";
let prevValue = "";
let haveDot = false;
const operators = ["+", "-", "×", "÷"];
// Functionality
function calculate(btnValue) {
	// console.log(btnValue);
	result = display.value;
	// console.log(prevValue);
	console.log(btnValue);

	if (btnValue === '.' && !haveDot) {
		haveDot = true;
	}

	if (result === "" && ["=", "+", "×", "÷"].includes(btnValue)) return;

	if (operators.includes(prevValue) && operators.includes(btnValue)) {
		console.log(result);
		result = result.slice(0, -1); // remove the last operator from the result
	} else {
		if (btnValue === "=" && btnValue !== "") {
			try {
				result = result.replaceAll("÷", "/").replaceAll("×", "*");
				result = eval(result);
				if (result === Infinity || result === -Infinity) {
					throw new Error("Can't divide by 0");
				}
			} catch (err) {
				result = err.message;
			}
			console.log(result);
			// eval() is use for calculate string with operator. Example eval('100 + 50') = 150
		} else if (btnValue === "AC") {
			result = "";
		} else if (btnValue === "DEL") {
			result = result.slice(0, -1);
		} else {
			if (btnValue === "0" && result === "") return;
			if (btnValue === "." && prevValue === ".") return;
			if (btnValue === "0" && ['-','+'].includes(prevValue)) return;

			result += btnValue;
		}
		display.value = result;
		prevValue = btnValue;
	}
}

// Handlers
calcContainer.addEventListener("click", (e) => {
	if (e.target.classList.contains("btn")) {
		calculate(e.target.value);
	}
});

const btnMode = document.querySelector(".btn-mode");
const btns = document.querySelectorAll(".btn");

let night = true;
function changeMode() {
	const modeIcon = document.querySelector(".btn-mode > img");
	if (night) {
		modeIcon.src = "img/night-mode.png";
		night = false;
	} else {
		modeIcon.src = "img/day-mode.png";
		night = true;
	}
	document.querySelector("body").classList.toggle("day-mode");
	calcContainer.classList.toggle("calc-d-mode");
	btns.forEach((btn) => {
		btn.classList.toggle("btn-d-mode");
	});
}
btnMode.addEventListener("click", changeMode);
