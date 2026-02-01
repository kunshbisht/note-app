import { useState, useRef, useEffect } from "react";
import { Input } from "./components/Input";
import { loadNote, saveNote } from "./localStorage";
import { fa1, fa2, fa3, faBold, faHeading, faList, faPencil, faPenRuler, faPenToSquare, faT, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "./components/IconButton";

export type ListType = 'list' | 'none';
export type HeadingType = 'none' | 'h1' | 'h2' | 'h3' | 'bold';

export type Line = {
	text: string;
	list: ListType;
	heading: HeadingType;
};

const navButtons: { icon: IconDefinition; icon2?: IconDefinition; patch: Partial<Line>; }[] = [
	{ icon: faT, patch: { list: "none", heading: "none" } },
	{ icon: faHeading, icon2: fa1, patch: { list: "none", heading: "h1" } },
	{ icon: faHeading, icon2: fa2, patch: { list: "none", heading: "h2" } },
	{ icon: faHeading, icon2: fa3, patch: { list: "none", heading: "h3" } },
	{ icon: faBold, patch: { heading: "bold" } },
	{ icon: faList, patch: { list: "list", heading: "none" } },
]

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
			<div className="flex justify-center bg-blue-500 p-4 gap-2">
				<IconButton
					onClick={() => {}}
					icon={faPenToSquare}
				/>
				{navButtons.map(navButton => <IconButton
					onClick={() => {
						setLines(prev => {
							const next = [...prev];
							next[activeIndex] = {
								...next[activeIndex],
								...navButton.patch
							}
							return next
						})
					}}
					icon={navButton.icon}
					icon2={navButton.icon2}
				/>)}
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