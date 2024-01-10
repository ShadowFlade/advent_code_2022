import * as fs from "fs";
import * as path from "path";
function solution32() {
	const filePath = path.resolve(__dirname, "./data.txt");
	let data = fs.readFileSync(filePath, { encoding: "utf8" }).split("\n");
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
	const elfGroups = [];
	let elfTempGroup = [];
	for (let i = 0; i < data.length; i++) {
		elfTempGroup.push(data[i]);
		if (elfTempGroup.length == 3) {
			elfGroups.push(elfTempGroup);
            elfTempGroup = [];
		}
	}
    console.log(elfGroups,' groups')
	function calcPriority(letter: string): number {
		const isUpperCase =
			alphabet.includes(letter.toLowerCase()) &&
			!alphabet.includes(letter);
		const index =
			alphabet.indexOf(isUpperCase ? letter.toLowerCase() : letter) + 1;
        console.log(index,' index');
		const upperCaseMult = isUpperCase ? 26 : 0;
		return index + upperCaseMult;
	}
	let sum = 0;
    let counter = 0;
    console.log(elfGroups.length,' length');
	for (const group of elfGroups) {
		let repeatingLetter = "";
		group[0].split("").forEach((letter: string) => {
			if (
				group[1].includes(letter) &&
				group[2].includes(letter) &&
				repeatingLetter == ""
			) {
				repeatingLetter = letter;
			}
		});
		const points = calcPriority(repeatingLetter);
        console.log(points,' points')
		sum += points;
		repeatingLetter = "";
        counter += 1;
	}
	console.log(sum, " smth");
    console.log(counter,' counter');
}
solution32();
export default solution32;
