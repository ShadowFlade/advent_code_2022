const { log } = require("console");
const fs = require("fs");
let data = fs.readFileSync("./data.txt", { encoding: "utf8", flag: "r" });
let maxSum = 0;
data = data.split("\n" + "\n");
let indexOfElf;
data.forEach((elf, index) => {
    let caloriesSum = 0;
    elf.split("\n").forEach((item) => {
		caloriesSum +=+item;

		if (caloriesSum > maxSum) {
			maxSum = caloriesSum;
			indexOfElf = index;
		}
	});
});

return maxSum;
