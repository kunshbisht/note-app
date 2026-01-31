import { useState, useRef, useEffect } from "react";
import { Input } from "./components/Input";
import { loadNote, saveNote } from "./localStorage";

export type Attribute = 'list' | 'heading'

export type Line = {
	text: string;
	list: string;
	heading: string;
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
	);
}