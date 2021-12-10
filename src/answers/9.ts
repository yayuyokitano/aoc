import {readFile} from "fs/promises";

function rec(point:number[], input:number[][]):number[][] {
	let size = [[point[0], point[1]]];
	if (point[0] !== 0 && input[point[0]-1][point[1]] > input[point[0]][point[1]] && input[point[0]-1][point[1]] !== 9) {
		size.push(...rec([point[0]-1,point[1]], input));
	}
	if (point[0] < input.length - 1 && input[point[0]+1][point[1]] > input[point[0]][point[1]] && input[point[0]+1][point[1]] !== 9) {
		size.push(...rec([point[0]+1,point[1]], input));
	}
	if (point[1] !== 0 && input[point[0]][point[1]-1] > input[point[0]][point[1]] && input[point[0]][point[1]-1] !== 9) {
		size.push(...rec([point[0],point[1]-1], input));
	}
	if (point[1] < input[point[0]].length - 1 && input[point[0]][point[1]+1] > input[point[0]][point[1]] && input[point[0]][point[1]+1] !== 9) {
		size.push(...rec([point[0],point[1]+1], input));
	}
	return size;
}

function unique(input:number[][]) {
	let out:number[][] = [];
	for (let i = 0; i < input.length; i++) {
		if (out.filter(e => e[0] === input[i][0] && e[1] === input[i][1]).length === 0) {
			out.push(input[i]);
		}
	}
	return out;
}

async function main() {
	let input = (await readFile(`${__dirname}/inputs/9.txt`, "utf8")).trim().split("\n").map(e => e.split("").map(Number));
	let sum = 0;
	let points:number[][] = [];
	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[i].length; j++) {
			let adj = [];
			if (i !== 0) {
				adj.push(input[i-1][j]);
			}
			if (i < input.length - 1) {
				adj.push(input[i + 1][j]);
			}
			if (j !== 0) {
				adj.push(input[i][j-1]);
			}
			if (j < input.length - 1) {
				adj.push(input[i][j+1]);
			}
			if (adj.filter(e => e <= input[i][j]).length === 0) {
				sum += input[i][j] + 1;
				points.push([i,j]);
			}
		}
	}
	let sizes = points.map(e => unique(rec(e, input)).length).sort((a,b) => b-a);
	console.log(sum);
	console.log(sizes[0]*sizes[1]*sizes[2]);
}main();