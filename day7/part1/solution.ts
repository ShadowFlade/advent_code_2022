import * as fs from "fs";
import * as path from "path";

export default function main() {
	const filepath = path.resolve(__dirname, "./data.txt");
	const data = fs.readFileSync(filepath, { encoding: "utf8" }).split("\n");
	let currentDirectory = "";
	const directories = {};
	for (let i = 0; i < data.length - 1; i++) {
		if (data[i][0] == "$") {
            console.log(data[i]);
			const parsed = data[i].match(/\$ (\w+)(?:$| (.+))/);
            console.log(parsed,' parsed');
			const command = parsed[1];
            console.log(command,' command')
			switch (command) {
				case "cd":
					if (currentDirectory == "..") {
						currentDirectory = directories[parsed[2]].prev;
                        console.log('go directory back');
					} else if (parsed[2] == "/") {
                        console.log('root');
						directories["/"] = {};
						currentDirectory = "/";
					} else {
                        console.log('new direcotry');
						const newDirectory = {
							prev: directories[currentDirectory],
						};
						console.log("smth");
						directories[currentDirectory][parsed[2]] = newDirectory;
						directories[parsed[2]] = newDirectory;
					}

					currentDirectory = parsed[2];
					break;
				case "ls":
					const nextCommandIndex = data.findIndex(
						(item, index) => index > i && item[0] == "$"
					);
					const filesAndDirectories = data.slice(i + 1, nextCommandIndex);
					//redundant copying, we can just filter out indexes and give calc function links to objects but whatever im lazy
					const files = [];
					filesAndDirectories.forEach((item) => {
						if (item.slice(0, 3) != "dir") {
							files.push(item);
						}
					});

					i += nextCommandIndex;
					const dirWeight = calcDirectoryWeight(files);
					directories[currentDirectory] += +dirWeight;
					break;
			}
		}
	}
	let dirSum = 0;
	console.log(directories);
	Object.keys(directories).forEach((item) => {
		if (item == "/") {
			return;
		} else {
			console.log(directories[item], item, " item");
			dirSum += directories[item];
		}
	});
	console.info(dirSum, " sum");
}

function calcDirectoryWeight(files) {
	let sum = 0;
	for (let i = 0; i < files.length - 1; i++) {
        console.log(files[i],' file')
		const fileSize = +files[i].match(/\d+/)[0];
		sum += fileSize;
	}
	return sum;
}
