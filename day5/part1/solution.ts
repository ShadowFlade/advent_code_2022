import * as path from "path";
import * as fs from "fs";
export default function sol51() {
	const filepath = path.resolve(__dirname, "./data.txt");
	const data = fs.readFileSync(filepath, { encoding: "utf8" }).split("\n\n");

	const cargo = data[0];
	const instructions = data[1];
	const cargoLines = cargo.split("\n");
	//lets work unser assumption that empty cargo space is 3chars long - 1 letter and 2 braces
	const cargoHorizontal = [];
	cargoLines.forEach((line) => {
		const cargoline = line.split("");
		const cargoArr = [];
		const startingPosition = 1;
		for (let i = startingPosition; i < cargoline.length - 1; i += 4) {
			if (!!i) {
				cargoArr.push(cargoline[i]);
			} else {
				cargoArr.push("");
			}
		}
		cargoHorizontal.push(cargoArr);
	});
	//small test
	const is = cargoHorizontal.every((line) => {
		return line.length === 9;
	});
	if (!is) {
		throw new Error("you are stupid all lines should be of length 9");
	}
	const cargoVertical = [];
	cargoHorizontal.forEach((cargoline, index) => {
		cargoline.forEach((cargoitem, index) => {
            if(!Number.isNaN(+cargoitem)){
                return;
            }
			if (typeof cargoVertical[index] != "object") {
				if (cargoitem !== " ") {
					cargoVertical[index] = [cargoitem];
				}
			} else {
				!!cargoitem && cargoVertical[index].push(cargoitem);
			}
		});
	});
    console.log(cargoVertical,'vertical')
}
