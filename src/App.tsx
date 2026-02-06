import { useState, useRef, useEffect } from "react";
import { Input } from "./components/Input";
import { loadNote, saveNote } from "./localStorage";
import { fa1, fa2, fa3, faBold, faHeading, faList, faPenToSquare, faT, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "./components/IconButton";
import { faClone, faFileLines } from "@fortawesome/free-regular-svg-icons";
import { MetadataSection } from "./MetadataSection";

export type ListType = 'list' | 'none';
export type HeadingType = 'none' | 'h1' | 'h2' | 'h3' | 'bold';

export type Line = {
	text: string;
	list: ListType;
	heading: HeadingType;
};

type NavButtonType = {
	icon: IconDefinition;
	icon2?: IconDefinition;
	patch: Partial<Line>;
};

const navButtons: NavButtonType[] = [
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
	const inputRefs = useRef<HTMLTextAreaElement[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		setLines(loadNote());
		inputRefs.current[inputRefs.current.length - 1].focus()
	}, []);

	useEffect(() => {
		saveNote(lines);
	}, [lines]);

	return (
		<div className="flex flex-col h-screen">
			<div className="flex justify-center bg-blue-500 p-4 gap-2">
				{navButtons.map((navButton, i) => <IconButton
					key={i}
					onClick={() => {
						setLines(prev => {
							const next = [...prev];
							try {
								next[activeIndex] = {
									...next[activeIndex],
									...navButton.patch
								}
								return next;
							} catch {
								return prev;
							}
						})
					}}
					active={
						(!navButton.patch.heading || lines[activeIndex]?.heading === navButton.patch.heading) &&
						(!navButton.patch.list || lines[activeIndex]?.list === navButton.patch.list)
					}
					disabled={activeIndex === -1}
					icon={navButton.icon}
					icon2={navButton.icon2}
				/>)}
				<div className="w-0.5 mx-2 bg-blue-700 rounded-full"></div>
				<IconButton
					key={-1}
					onClick={() => {
						setActiveIndex(activeIndex === -1 ? lines.length - 1 : -1);
					}}
					icon={activeIndex === -1 ? faFileLines : faPenToSquare}
				/>
				<IconButton
					key={-2}
					onClick={() => {
						navigator.clipboard.writeText(
							lines.map(line => {
								const headingPrefix = {
									h1: '# ',
									h2: '## ',
									h3: '### ',
									none: '',
									bold: ''
								}[line.heading];

								const isBold = line.heading === 'bold';
								const listPrefix = line.list === 'list' ? '* ' : '';

								return (
									listPrefix +
									headingPrefix +
									(isBold ? `**${line.text}**` : line.text)
								);
							}).join('\n')
						);
						alert("Note content copied to clipboard!");
					}}
					icon={faClone}
					disabled={activeIndex === -1}
				/>
			</div>
			<div className="p-8 mx-auto mt-8 box-border w-full bg-white md:w-3xl shadow-[0_0_15px_#0002] flex flex-1 flex-col gap-2 overflow-scroll">
				{
					activeIndex === -1
						? <MetadataSection />
						: lines.map((val, i) => (
							<Input
								key={i}
								value={val}
								index={i}
								inputRefs={inputRefs}
								lines={lines}
								setLines={setLines}
								setActiveIndex={setActiveIndex}
							/>
						))
				}
			</div>
		</div>
	);
}