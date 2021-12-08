import {readFile} from "fs/promises";

function getDigitPatterns(input:string[]) {
	input.sort((a, b) => a.length - b.length);
	let key:string[] = ["","","","","","","","","",""]
	key[1] = input.shift() as string;
	key[7] = input.shift() as string;
	key[4] = input.shift() as string;
	key[8] = input.pop() as string;
	let threeTwoFive = input.slice(0,3);
	let zeroNineSix = input.slice(3,6);
	key[6] = zeroNineSix.filter(e => !([...key[1]].every(f => e.includes(f))))[0];
	zeroNineSix = zeroNineSix.filter(e => e !== key[6]);
	key[9] = zeroNineSix.filter(e => [...key[4]].every(f => e.includes(f)))[0];
	key[0] = zeroNineSix.filter(e => e !== key[9])[0];
	key[3] = threeTwoFive.filter(e => [...key[1]].every(f => e.includes(f)))[0];
	threeTwoFive = threeTwoFive.filter(e => e !== key[3]);
	key[5] = threeTwoFive.filter(e => [...e].every(f => key[6].includes(f)))[0];
	key[2] = threeTwoFive.filter(e => e !== key[5])[0];
	return key.map(e => [...e].sort().join(""));
}

async function main() {
	const input = (await readFile(`${__dirname}/inputs/8.txt`, "utf8")).trim().split("\n").map(e => e.split(" | ").map(e => e.split(/\s+/)));
	let num = 0;

	for (let display of input) {
		const key = Object.fromEntries([...getDigitPatterns(display[0]).entries()].map(e => [e[1], e[0]]));
		let digits = "";
		for (let output of display[1].map(e => [...e].sort().join(""))) {
			digits += key[output].toString();
		}
		num += parseInt(digits, 10);
	}
	console.log(num);
}main();

