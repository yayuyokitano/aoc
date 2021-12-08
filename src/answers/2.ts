import {readFile} from "fs/promises";

async function main() {
	const input:[string, number][] = (await readFile(`${__dirname}/inputs/2.txt`, "utf8")).split("\n").map(e => e.split(" ")).map(e => [e[0], Number(e[1])]);
	let hor = 0;
	let ver = 0;
	let aim = 0;
	for (let [direction, amount] of input) {
		switch (direction) {
			case "forward":
				hor += amount;
				ver += aim * amount;
				break;
			case "down":
				aim += amount;
				break;
			case "up":
				aim -= amount;
				break;
		}
	}
	console.log(ver * hor)
}main();
