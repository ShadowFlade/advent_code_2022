import * as fs from "fs";
import * as path from "path";
//we need to recursively update the weight of prev directories (parent directories)
export default function main() {
	const filepath = path.resolve(__dirname, "./data.txt");
	const data = fs.readFileSync(filepath, { encoding: "utf8" }).split("\n");
	let currentDirectory = "";
	const directories = {};
	let nextCommandIndex = 0;
	for (let i = 0; i < data.length - 1 && nextCommandIndex >= 0; i++) {
		if (data[i][0] == "$") {
			const parsed = data[i].match(/\$ (\w+)(?:$| (.+))/);
			const command = parsed[1];
			nextCommandIndex =
				data.findIndex((item, index) => index > i && item[0] == "$") -
				1 -
				+i;
			console.log(nextCommandIndex, " next command index");
			switch (command) {
				case "cd":
					if (parsed[2] == "..") {
						currentDirectory =
							directories[currentDirectory].prev.name;
					} else if (parsed[2] == "/") {
						directories["/"] = { weight: 0, name: "/" };
						currentDirectory = "/";
					} else {
						const newDirectory = {
							prev: directories[currentDirectory],
							weight: 0,
							name: parsed[2],
						};
						directories[currentDirectory][parsed[2]] = newDirectory;
						directories[parsed[2]] = newDirectory;
						currentDirectory = parsed[2];
					}
					break;
				case "ls":
					const filesAndDirectories = data.slice(
						i + 1,
						i + nextCommandIndex
					);
					//redundant copying, we can just filter out indexes and give calc function links to objects but whatever im lazy
					const files = [];
					console.log(filesAndDirectories, " files and directories");
					filesAndDirectories.forEach((item) => {
						if (item.slice(0, 3) != "dir") {
							console.log(item.slice(0, 3), " not dir?");
							files.push(item);
						} else if (item.slice(0, 3) == "dir") {
							const newDir = {};
							directories[item.slice(5)] = newDir;
							directories[currentDirectory][item.slice(5)] =
								newDir;
						}
					});
					console.log(files, " calcing files");
					const dirWeight = calcDirectoryWeight(files);
					directories[currentDirectory].weight += +dirWeight;
					break;
			}

			i += nextCommandIndex;
		}
	}
	let dirSum = 0;
	Object.keys(directories).forEach((item) => {
		if (item == "/") {
			return;
		} else {
			const newWeight: number = +directories[item].weight;

			if (
				typeof newWeight == "number" &&
				!isNaN(newWeight) &&
				newWeight <= 100_000
			) {
				dirSum += newWeight;
			}
		}
	});
	console.info(dirSum, " sum");
}

function calcDirectoryWeight(files) {
	let sum = 0;
	for (let i = 0; i < files.length; i++) {
        console.log('123123',files[i]);
		if (files[i].includes("vcq.flg")) {
			console.log(files[i], " file");
		}
		const fileSize = files[i].match(/\d+/)[0];
		sum += +fileSize;
	}
	return sum;
}
