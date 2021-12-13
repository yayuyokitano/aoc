import {readFile} from "fs/promises";

async function main() {
	const input = (await readFile(`${__dirname}/inputs/13.txt`, "utf8")).trim().split("\n\n");
	const processedPoints = input[0].split("\n").map(line => line.split(",").map(Number));
	const folds = input[1].split("\n").map(line => line.split(" ").slice(-1)[0].split("="));
	
	let coordinates = new Array(Math.max(...processedPoints.map(point => point[0])) + 1).fill(0).map(() => new Array(Math.max(...processedPoints.map(point => point[1])) + 1).fill(false));
	for (let coordinate of processedPoints) {
		coordinates[coordinate[0]][coordinate[1]] = true;
	}
	console.log(countCoordinates(foldCoordinates(coordinates, folds[0])));
	for (let fold of folds) {
		coordinates = foldCoordinates(coordinates, fold);
	}
	coordinates = coordinates.slice(0, 40).map(e => e.slice(0, 6));
	for (let i = 0; i < coordinates[0].length; i++) {
		let line = "";
		for (let j = 0; j < coordinates.length; j++) {
			if (coordinates[j][i]) {
				line += "#";
			} else {
				line += ".";
			}
		}
		console.log(line);
	}
}main();

function countCoordinates(coordinates:boolean[][]) {
	return coordinates.flat().filter(Boolean).length;
}

function foldCoordinates(coordinates:boolean[][], fold:string[]) {
	if (fold[0] === "x") {
		for (let x = Number(fold[1]); x < coordinates.length; x++) {
			for (let y = 0; y < coordinates[x].length; y++) {
				if (!coordinates[x][y]) {
					continue;
				}
				coordinates[x][y] = false;
				coordinates[Number(fold[1]) - (x - Number(fold[1]))][y] = true;
			}
		}
	} else {
		for (let x = 0; x < coordinates.length; x++) {
			for (let y = Number(fold[1]); y < coordinates[x].length; y++) {
				if (!coordinates[x][y]) {
					continue;
				}
				coordinates[x][y] = false;
				coordinates[x][Number(fold[1]) - (y - Number(fold[1]))] = true;
			}
		}
	}
	return coordinates;
}