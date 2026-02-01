import { useState, useRef, useEffect } from "react";
import { Input } from "./components/Input";
import { loadNote, saveNote } from "./localStorage";
import { fa1, fa2, fa3, faBold, faHeading, faList, faT } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "./components/IconButton";

export type ListType = 'list' | 'none';
export type HeadingType = 'none' | 'h1' | 'h2' | 'h3' | 'bold';

export type Line = {
	text: string;
	list: ListType;
	heading: HeadingType;
};

export default function App() {
	const [lines, setLines] = useState<Line[]>([
		{ text: '', list: 'list', heading: 'none' }
	]);
	const inputRefs = useRef<HTMLInputElement[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		setLines(loadNote());
		inputRefs.current[inputRefs.current.length - 1].focus()
	}, []);

	useEffect(() => {
		saveNote(lines);
	}, [lines]);

	useEffect(() => {
		console.log(activeIndex);
	}, [activeIndex])

	return (
		<div className="flex flex-col h-screen bg-blue-50">
			<div className="flex justify-center bg-blue-500 p-4">
				<div className="absolute left-4">
					<button
						className="bg-blue-50 text-black rounded-lg flex p-2 px-3 font-bold items-center justify-center
							cursor-pointer hover:bg-blue-100 active:bg-blue-200 transition-colors">
						Video Idea (Coming soon)
					</button>
				</div>
				<div className="flex gap-4">
					<IconButton lastActiveIndex={activeIndex} setLines={setLines} icon={faT} patch={{ list: "none", heading: "none" }} />
					<IconButton lastActiveIndex={activeIndex} setLines={setLines} icon={faHeading} icon2={fa1} patch={{ list: "none", heading: "h1" }} />
					<IconButton lastActiveIndex={activeIndex} setLines={setLines} icon={faHeading} icon2={fa2} patch={{ list: "none", heading: "h2" }} />
					<IconButton lastActiveIndex={activeIndex} setLines={setLines} icon={faHeading} icon2={fa3} patch={{ list: "none", heading: "h3" }} />
					<IconButton lastActiveIndex={activeIndex} setLines={setLines} icon={faBold} patch={{ heading: "bold" }} />
					<IconButton lastActiveIndex={activeIndex} setLines={setLines} icon={faList} patch={{ list: "list", heading: "none" }} />
				</div>
			</div>
			<div className="p-8 mx-auto mt-8 box-border w-full bg-white md:w-3xl shadow-[0_0_15px_#0002] flex flex-1 flex-col gap-2">
				{lines.map((val, i) => (
					<Input
						key={i}
						value={val}
						index={i}
						inputRefs={inputRefs}
						lines={lines}
						setLines={setLines}
						setActiveIndex={setActiveIndex}
					/>
				))}
			</div>
		</div>
	);
}