import {readFile} from "fs/promises";

const charMap:{
	"(": ")",
	"[": "]",
	"{": "}",
	"<": ">"
} = {
	"(": ")",
	"[": "]",
	"{": "}",
	"<": ">"
}
const sums = {
	")": 1,
	"]": 2,
	"}": 3,
	">": 4
}

function checkCorrupt(input:string[]) {
	let sum = 0;
	let stack:("<"|"("|"["|"{")[] = [];
	let out:string[] = [];
	for (let line of input) {
		sum = 0;
		for (let char of line) {
			if (charMap.hasOwnProperty(char)) {
				stack.push(char as ("<"|"("|"["|"{"));
			} else {
				if (charMap[stack[stack.length - 1]] !== char) {
					sum = sums[char as ((">"|")"|"]"|"}"))];
					break;
				} else {
					stack = stack.slice(0, -1);
				}
			}
		}
		if (sum === 0) {
			out.push(line);
		}
	}
	return out;
}

function checkIncomplete(input:string[]) {
	let sum = [];
	let out:string[] = [];
	for (let line of input) {
		let cur = 0;
		let stack = "";
		for (let char of line) {
			if (charMap.hasOwnProperty(char)) {
				stack += char;
			} else {
				stack = stack.slice(0, -1);
			}
		}
		for (let char of [...stack].reverse()) {
			cur *= 5;
			cur += sums[charMap[char as ("<"|"("|"["|"{")]];
		}
		console.log(stack, cur);
		sum.push(cur);
	}
	console.log(sum.length);
	return sum.sort((a, b) => a-b)[((sum.length - 1) / 2)];
}

async function main() {
	let input = (await readFile(`${__dirname}/inputs/10.txt`, "utf8")).trim().split("\n") as ("<"|">"|"("|")"|"["|"]"|"{"|"}")[];
	const in2 = checkCorrupt(input);
	const num = checkIncomplete(in2);
	console.log(num);
}main();