const fs = require("fs");
const path = require('path')
let data = fs.readFileSync(path.resolve(__dirname,"../data.txt"), {encoding:'utf8'});
let maxSum1 = 0;
data = data.split("\n" + "\n");
let maxSum2 = 0;
let maxSum3 = 0;
data.forEach((elf, index) => {
	let caloriesSum = 0;

	elf.split("\n").forEach((calories) => {

		caloriesSum += +calories;

		if (caloriesSum > maxSum1) {
			maxSum1 = caloriesSum;
			indexOfElf = index;
		}
	});
});
data.forEach((elf, index) => {
	let caloriesSum = 0;

	elf.split("\n").forEach((calories) => {

		caloriesSum += +calories;

		if (caloriesSum > maxSum2 && caloriesSum < maxSum1) {
			maxSum2 = caloriesSum;
			indexOfElf = index;
		}
	});
});
data.forEach((elf, index) => {
	let caloriesSum = 0;

	elf.split("\n").forEach((calories) => {

		caloriesSum += +calories;

		if (caloriesSum > maxSum3 && caloriesSum < maxSum1 && caloriesSum < maxSum2) {
			maxSum3 = caloriesSum;
			indexOfElf = index;
		}
	});
});
console.log(maxSum1 + maxSum2 + maxSum3);
