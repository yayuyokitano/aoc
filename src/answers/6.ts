import {readFile} from "fs/promises";

async function main() {
	let input = (await readFile(`${__dirname}/inputs/6.txt`, "utf8")).trim().split(",").map(Number);
	let processed = [0,0,0,0,0,0,0,0,0];
	for (let num of input) {
		processed[num]++;
	}
	for (let i = 1; i <= 256; i++) {
		let zero = processed[0];
		for (let j = 0; j < processed.length - 1; j++) {
			processed[j] = processed[j + 1];
		}
		processed[8] = zero;
		processed[6] += zero;
		console.log(i, processed.reduce((a, b) => a + b));
	}
	console.log(processed.reduce((a, b) => a + b));
}main();
