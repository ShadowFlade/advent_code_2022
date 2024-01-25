import * as fs from "fs";
import * as path from "path";

export default function main() {
	const filepath = path.resolve(__dirname, "./data.txt");
	const data = fs.readFileSync(filepath, { encoding: "utf8" }).split("\n");
	let currentDirectory = "";
	const directories = {};
	for (let i = 0; i < data.length - 1; i++) {
		if (data[i][0] == "$") {
			const parsed = data[i].match(/$ (.*) (.*)/);
			const command = parsed[1];
			switch (command) {
				case "cd":
					if (currentDirectory == "..") {
						currentDirectory = directories[parsed[2]].prev;
					} else if (parsed[2] == "/") {
						directories["/"] = {};
						currentDirectory = "/";
					} else {
						const newDirectory = {
							prev: directories[currentDirectory],
						};
						directories[currentDirectory][parsed[2]] = newDirectory;
						directories[parsed[2]] = newDirectory;
					}

					currentDirectory = parsed[2];
					break;
				case "ls":
					const nextCommandIndex = data.findIndex(
						(item, index) => index > i && item[0] == "$"
					);
					const filesAndDirectories = data.slice(i, nextCommandIndex);
					//redundant copying, we can just filter out indexes and give calc function links to objects but whatever im lazy
					const files = [];
					const localDirectories = [];
					filesAndDirectories.forEach((item) => {
						if (item.slice(0, 3) != "dir") {
							files.push(item);
						} else {
							localDirectories.push(item);
						}
					});

					i += nextCommandIndex;
					const dirWeight = calcDirectoryWeight(files);
					directories[currentDirectory] += dirWeight;
					break;
			}
		}
	}
}

function calcDirectoryWeight(files) {
	let sum = 0;
	for (let i = 0; i < files.length - 1; i++) {
		const fileSize = +files.match(/\d+/)[0];
		sum += fileSize;
	}
	return sum;
}
