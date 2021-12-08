import {readFile} from "fs/promises";

function xd(from:number, to:number) {
	let diff = Math.abs(from - to);
	return diff * (diff + 1) / 2;
}

async function main() {
	let input = (await readFile(`${__dirname}/inputs/7.txt`, "utf8")).trim().split(",").map(Number);
	//let input = [16,1,2,0,4,2,7,1,2,14];
	let last = Infinity;
	let cur = 0;
	let i = 0;
	let res = [];
	while (true) {
		cur = input.reduce((a, c) => {
			console.log(a);
			return a + xd(c, i)
		});
		if (i > 2000) {
			break;
		}
		res.push(cur);
		i++;
	}
	console.log(Math.min(...res));
}main();
