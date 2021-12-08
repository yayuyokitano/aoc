import {readFile} from "fs/promises";

async function main() {
	const input = (await readFile(`${__dirname}/inputs/1.txt`, "utf-8")).split("\n").map(Number);
	let prev = Infinity;
	let count = 0;
	let input2:number[] = [];

	for (let i = 0; i < input.length - 2; i++) {
		input2.push((input[i] + input[i + 1] + input[i + 2]) / 3);
	}

	for (let value of input2) {
		if (value > prev) {
			count++;
		}
		prev = value;
	}
	console.log(count);
}main();
