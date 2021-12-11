import {readFile} from "fs/promises";

function getAdjacent(x:number,y:number, input:number[][]) {
	let adjacent:[number,number][] = [];
	if (x > 0) {
		if (y > 0) {
			adjacent.push([x-1, y-1]);
		}
		adjacent.push([x-1, y]);
		if (y < input[0].length - 1) {
			adjacent.push([x-1, y+1]);
		}
	}
	if (x < input.length - 1) {
		if (y > 0) {
			adjacent.push([x+1, y-1]);
		}
		adjacent.push([x+1, y]);
		if (y < input[0].length - 1) {
			adjacent.push([x+1, y+1]);
		}
	}
	if (y > 0) {
		adjacent.push([x, y-1]);
	}
	if (y < input[0].length - 1) {
		adjacent.push([x, y+1]);
	}
	return adjacent;
}

function incrementAround (x:number, y:number, input:number[][]) {
	input[x][y] = -1;
	const adjacent = getAdjacent(x, y, input);
	for (let [xx, yy] of adjacent) {
		if (input[xx][yy] != -1) {
			input[xx][yy]++;
		}
		if (input[xx][yy] > 9) {
			input = incrementAround(xx, yy, input);
		}
	}
	return input;
}

function round(input:number[][]) {
	for (let x = 0; x < input.length; x++) {
		for (let y = 0; y < input[x].length; y++) {
			input[x][y]++;
		}
	}
	for (let x = 0; x < input.length; x++) {
		for (let y = 0; y < input[x].length; y++) {
			if (input[x][y] > 9) {
				input = incrementAround(x, y, input);
			}
		}
	}
	let sum = 0;
	for (let x = 0; x < input.length; x++) {
		for (let y = 0; y < input[x].length; y++) {
			if (input[x][y] === -1) {
				sum++;
				input[x][y] = 0;
			}
		}
	}
	return sum;

}

async function main() {
	let input = (await readFile(`${__dirname}/inputs/11.txt`, "utf8")).trim().split("\n").map(e => [...e].map(Number));
	let sum = 0;
	const tot = input.length * input[0].length;
	let done = false;
	let i = 0;
	while (!done) {
		let cur = sum;
		i++;
		console.log(i);
		sum += round(input);
		if (sum - cur === tot) {
			done = true;
		}
	}
	console.log(i);
	
}main();