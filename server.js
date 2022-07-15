var letter = document.getElementById("letter");
var userData = document.getElementById("user");
var timer = document.getElementById("timer");
// function keepFocus() {
// 	setTimeout(() => {
// 		userData.focus();
// 	}, 5000);
// }
// userData.on("touchstart", keepFocus);
let bestScore = localStorage.getItem("bestScore");

if (bestScore) {
	document.getElementById("oldScore").innerHTML =
		"my best time : " +
		Math.floor(bestScore / 1000) +
		"." +
		(bestScore % 1000) +
		"s";
	+"s!";
}

userData.focus();
// userData.click();
letterList = [];
let second = 0;
let millisecond = 0;

let cron;

for (i = 0; i < 20; i++) {
	letterList.push(String.fromCharCode(parseInt(Math.random() * 26 + 65)));
}
var count = 1;
wrong = 0;
val = "";
letter.innerHTML = letterList[0];
function btn() {
	val += userData.value;
	if (letter.innerHTML === userData.value[userData.value.length - 1]) {
		count++;
		userData.innerHTML = val;
	} else {
		wrong++;
	}

	if (count < 20) {
		letter.innerHTML = letterList[count];
	} else {
		letter.innerHTML = "Success! &#128525";
	}
}
timerGame();

function timerGame() {
	const start = Date.now();

	const timeCount = setInterval(() => {
		const millis = Date.now() - start + wrong * 500;

		let second = "000";
		if (String(millis % 1000).length == 3) {
			second = millis % 1000;
		}
		timer.innerText =
			"Time : " + Math.floor(millis / 1000) + "." + second + "s";
		if (count >= 20) {
			if (bestScore && bestScore < millis) {
				localStorage.setItem("bestScore", bestScore);
			} else {
				localStorage.setItem("bestScore", millis);
			}
			clearInterval(timeCount);
		}
	}, 100);
}

function reset() {
	location.reload();
}
