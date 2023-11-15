const { log } = require("console");
const fs = require("fs");
let data = fs.readFileSync("./data.txt", { encoding: "utf8", flag: "r" });
let maxSum = 0;
data = data.split(/\r/);
console.log(data.length, " is");
let indexOfElf;
data.forEach((elf, index) => {
	let caloriesSum = 0;
        log(caloriesSum,' calories sum');
	if (caloriesSum > maxSum) {
		maxSum = caloriesSum;
		indexOfElf = index;
	}
});
console.log(data,' data');

console.log(maxSum, " last index of elf");
return maxSum;
