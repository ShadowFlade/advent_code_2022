const path = require("path");
const fs = require("fs");

const filePath = path.resolve(__dirname + "/.." + "/data.txt");
const data = fs.readFileSync(filePath, { encoding: "utf8" });
const rounds = data.split("\n");
const elfHandds = {
	A: "rock",
	B: "paper",
	C: "scissors",
};
const yourHands = {
	Y: "paper",
	X: "rock",
	Z: "scissors",
};

const outcomes = {
	Y: "draw",
	X: "loss",
	Z: "win",
};
const combinations = [
	["rock", "paper"],
	["paper", "scissors"],
	["scissors", "rock"],
];

const pointsForHand = {
	rock: 1,
	paper: 2,
	scissors: 3,
};
let myTotalPoints = 0;
function whoWon(round) {
	round = round.split(" ");
	const myOutcome = round[1];
	if (!myOutcome) {
		return;
	}
	const hisHand = elfHandds[round[0]];
	const myHand = decideHand(hisHand, outcomes[myOutcome]);
	const myPoints = pointsForHand[myHand];
	let pointsForResult =
		outcomes[myOutcome] === "draw"
			? 3
			: outcomes[myOutcome] == "win"
			? 6
			: 0;

	myTotalPoints += +myPoints + +pointsForResult;
}

for (const round of rounds) {
	whoWon(round);
}
function decideHand(elfHand, outcome) {
	let result;
	for (const comb of combinations) {
		if (
			outcome === "loss" &&
			comb.includes(elfHand) &&
			comb[1] == elfHand
		) {
			const neededIndex = comb.findIndex((item) => item == elfHand);
			result = comb.filter((item, index) => index != neededIndex)[0];
			break;
		} else if (
			outcome === "win" &&
			comb.includes(elfHand) &&
			comb[0] == elfHand
		) {
			result = comb[1];
		} else if (outcome === "draw" && comb.includes(elfHand)) {
			result = elfHand;

			break;
		}
	}
	return result;
}
