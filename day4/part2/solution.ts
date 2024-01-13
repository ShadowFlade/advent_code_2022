import * as fs from "fs";
import * as path from "path";

export default function solution42() {
	const filepath = path.resolve(__dirname, "../part1/data.txt");
	const assignments = fs
		.readFileSync(filepath, { encoding: "utf8" })
		.split("\n")
		.filter((item) => !!item);
	let totalOverlaps = 0;
	let totalNumberOfRangesWithin = 0;
	assignments.forEach((ass) => {
		const elves = ass.split(",");
		const elf1Range = elves[0].split("-");
		const elf2Range = elves[1].split("-");
		let numberOfElfsRangeWithin = 0;
		if (+elf1Range[0] >= +elf2Range[0] && +elf1Range[0] <= +elf2Range[1]) {
			numberOfElfsRangeWithin = 1;
			totalNumberOfRangesWithin += 1;
		} else if (
			+elf1Range[1] >= +elf2Range[0] &&
			+elf1Range[1] <= +elf2Range[1]
		) {
			numberOfElfsRangeWithin = 2;
			totalNumberOfRangesWithin += 1;
		} else if (
			+elf2Range[0] >= +elf1Range[0] &&
			+elf2Range[0] <= +elf1Range[1]
		) {
			numberOfElfsRangeWithin = 1;
			totalNumberOfRangesWithin += 1;
		} else if (
			+elf2Range[1] >= +elf1Range[0] &&
			+elf2Range[1] <= +elf1Range[1]
		) {
			totalNumberOfRangesWithin += 1;
		}
	});
}
