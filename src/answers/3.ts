import {readFile} from "fs/promises";

function onoff(input:string[]) {
	const on = new Array(input[0].length).fill(0);
	const off = new Array(input[0].length).fill(0);
	for (let binary of input) {
		for (let i = 0; i < binary.length; i++) {
			if (binary[i] === "1") {
				on[i]++;
			} else {
				off[i]++;
			}
		}
	}
	return [on, off];
}

function filteronoff(input:string[], on:number[], off:number[]) {
	let filteredon = input;
	let filteredoff = input;
	let poson = on;
	let posoff = off;
	let negon = on;
	let negoff = off;
	for (let i = 0; i < input[0].length; i++) {
		console.log(off);
		if (filteredon.length > 1) {
			const mostFrequent = Number(poson[i] > posoff[i]).toString();
			const isEqual = poson[i] === posoff[i];
			filteredon = filteredon.filter(e => isEqual ? e[i] === "1" : e[i] === mostFrequent);
		}
		
		if (filteredoff.length > 1) {
			const mostFrequent = Number(negon[i] > negoff[i]).toString();
			const isEqual = negon[i] === negoff[i];
			const newfilteredoff = filteredoff.filter(e => isEqual ? e[i] === "0" : e[i] !== mostFrequent);
			if (newfilteredoff.length >= 1) {
				filteredoff = newfilteredoff;
			}
		}
		[poson, posoff] = onoff(filteredon);
		[negon, negoff] = onoff(filteredoff);
	}
	console.log(filteredon, filteredoff);
	return parseInt(filteredon[0], 2) * parseInt(filteredoff[0], 2);
}

async function main() {
	const input = (await readFile(`${__dirname}/inputs/3.txt`, "utf8")).split("\n");
	const [on, off] = onoff(input);
	let gamma = new Array(input[0].length).fill(0);
	for (let i = 0; i < input[0].length; i++) {
		if (on[i] > off[i]) {
			gamma[i] = 1;
		}
	};
	const epsilon = gamma.map(e => Number(!(Boolean(e))));
	console.log(parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2));
	
	console.log(filteronoff(input, on, off))

	

}main();