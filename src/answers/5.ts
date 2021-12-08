import {readFile} from "fs/promises";

async function main() {
	const input = (await readFile(`${__dirname}/inputs/5.txt`, "utf8")).trim().split("\n");
	const arr = Array.from({length: 1000}, () => Array.from({length: 1000}, () => 0));
	for (let line of input) {
		const [x1, y1, x2, y2] = line.split(" -> ").map(e => e.split(",")).flat().map(Number);
		if (x1 === x2) {
			for (let y = Math.min(y1, y2); y <= Math.max(y1,y2); y++) {
				arr[x1][y]++;
			}
		} else if (y1 == y2) {
			for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
				arr[x][y1]++;
			}
		} else {
			let x = x1;
			let y = y1;
			while (true) {
				arr[x][y]++;
				if (x === x2 || y === y2) {
					break;
				}
				if (x < x2) {
					x++;
				} else if (x > x2) {
					x--;
				}
				if (y < y2) {
					y++;
				} else if (y > y2) {
					y--;
				}
			}
		}
	}
	console.log(arr.flat().reduce((a, b) => a + Number(b > 1), 0));
}main();