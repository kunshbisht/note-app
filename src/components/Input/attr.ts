import type { Line } from "../../App";

export function getAttr<K extends keyof Line>(i: number, attr: K, lines: Line[]): Line[K] {
	return lines[i][attr];
}

// export function setAttr<K extends keyof Line>(
// 	i: number,
// 	attr: K,
// 	value: Line[K],
// 	setLines: React.Dispatch<React.SetStateAction<Line[]>>
// ) {
// 	setLines(prev => {
// 		const next = [...prev];
// 		next[i][attr] = value;
// 		return next;
// 	});
// }