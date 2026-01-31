import { useState, useRef, useEffect } from "react";
import { Input } from "./components/Input";
import { loadNote, saveNote } from "./localStorage";

export type Attribute = keyof Line;
export type ListType = 'list' | 'none';
export type HeadingType = 'none' | 'h1' | 'h2' | 'h3' | 'bold';

export type Line = {
	text: string;
	list: ListType;
	heading: HeadingType;
};

export default function App() {
	const [lines, setLines] = useState<Line[]>([
		{text:'', list: 'list', heading: 'none'}
	]);
	const inputRefs = useRef<HTMLInputElement[]>([]);

	useEffect(() => {
		setLines(loadNote());
	}, []);
	
	useEffect(() => {
		saveNote(lines);
	}, [lines]);

	return (
		<div className="flex flex-col">
			<div className="m-4 flex flex-col gap-2">
				{lines.map((val, i) => (
					<Input
						key={i}
						value={val}
						index={i}
						inputRefs={inputRefs}
						lines={lines}
						setLines={setLines}
					/>
				))}
			</div>
		</div>
	);
}