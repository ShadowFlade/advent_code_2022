import * as fs from "fs";
import * as path from "path";

export default function solution61() {
	const filepath = path.resolve(__dirname, "./data.txt");
	const data = fs.readFileSync(filepath, { encoding: "utf8" });
	let tempStr = "";
	let counter = 0;
	for (let i = 0; i < data.length - 1; i++) {
        counter += 1;
		if (tempStr.includes(data[i])) {
            const pos = tempStr.indexOf(data[i]);
			tempStr = tempStr.slice(pos + 1);
            tempStr += data[i];
		} else {
			tempStr += data[i];
		}
		if (tempStr.length == 4) {
			break;
		}
	}
	return counter;
}
