import * as fs from "fs";
import * as path from "path";
const filePath = path.resolve(__dirname, "./data.txt");
let data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");
console.log(data,' data');
const alphabet = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

function calcPriority(letter: string): number {
	const isUpperCase =
		alphabet.includes(letter.toLowerCase()) && !alphabet.includes(letter);
	const index =
		alphabet.indexOf(isUpperCase ? letter.toLowerCase() : letter) + 1;
	const upperCaseMult = isUpperCase ? 26 : 0;
	return index + upperCaseMult;
}
let sum = 0;
for (const i in data) {
	let repeatingLetter = "";
    data[i]
}
