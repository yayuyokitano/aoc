import {readFile} from "fs/promises";

async function main() {
	const input = (await readFile(`${__dirname}/inputs/4.txt`, "utf8")).split("\n\n");
	const numbers = (input.shift()?.split(",") as string[]).map(Number);
	const boards = input.map(e => e.split("\n").map(e => e.trim().split(/\s+/).map(Number)));
	let rows = Array.from({length: boards.length}, e => Array.from({length: 5}, f => 0));
	let cols = Array.from({length: boards.length}, e => Array.from({length: 5}, f => 0));
	let cells = Array.from({length: boards.length}, e => Array.from({length: 5}, f => Array.from({length: 5}, g => false)));
	for (let number of numbers) {
		let i = 0;
		while (i < boards.length) {
			for (let j = 0; j < 5; j++) {
				for (let k = 0; k < 5; k++) {
					if (boards[i][j][k] === number) {
						rows[i][j]++;
						cols[i][k]++;
						cells[i][j][k] = true;
						if (rows[i][j] === 5 || cols[i][k] === 5) {
							let sum = 0;
							for (let xx = 0; xx < 5; xx++) {
								for (let yy = 0; yy < 5; yy++) {
									sum += Number(!cells[i][xx][yy]) * boards[i][xx][yy];
								}
							}
							console.log(sum * number);
							boards.splice(i, 1);
							rows.splice(i, 1);
							cols.splice(i, 1);
							cells.splice(i, 1);
							i--;
							j = 5;
							k = 5;
						}
					}
				}
			}
			i++
		}
	}
}main();
