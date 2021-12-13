import {readFile} from "fs/promises";

async function main() {
	let input = (await readFile(`${__dirname}/inputs/12.txt`, "utf8")).trim().split("\n").map(e => e.split("-"));
	let paths: {[key: string]: string[]} = {};
	let visited: {[key: string]: boolean} = {};
	for (let path of input) {
		let [a, b] = path;
		if (!paths[a]) {
			paths[a] = [];
			visited[a] = false;
		}
		paths[a].push(b);
		if (!paths[b]) {
			paths[b] = [];
			visited[b] = false;
		}
		paths[b].push(a);
	}
	console.log(recursivelyVisit(paths, visited, "start", false)[1].length);
	

}main();

function recursivelyVisit(paths: {[key: string]: string[]}, visited: {[key: string]: boolean}, current: string, doneDouble:boolean) :[number, string[][]] {
	if (current === "end") {
		return [0, [["end"]]];
	}
	let curvis: {[key: string]: boolean} = JSON.parse(JSON.stringify(visited));
	curvis[current] = true;
	let sum = 0;
	let x:string[][] = [];
	for (let next of paths[current]) {
		if (next.toUpperCase() === next) {
			const cur = recursivelyVisit(paths, curvis, next, doneDouble);
			sum += cur[0] + 1;
			x.push(...cur[1].map(e => [current, ...e]));
		} else if (next !== "start" && next !== "end") {
			if (!curvis[next]) {
				const cur = recursivelyVisit(paths, curvis, next, doneDouble);
				sum += cur[0] + 1;
				x.push(...cur[1].map(e => [current, ...e]));
			} else {
				if (!doneDouble) {
					const cur = recursivelyVisit(paths, curvis, next, true);
					sum += cur[0] + 1;
					x.push(...cur[1].map(e => [current, ...e]));
				}
			}
		} else {
			if (!curvis[next]) {
				const cur = recursivelyVisit(paths, curvis, next, doneDouble);
				sum += cur[0] + 1;
				x.push(...cur[1].map(e => [current, ...e]));
			}
		}
	}
	return [sum - 1, x];
}