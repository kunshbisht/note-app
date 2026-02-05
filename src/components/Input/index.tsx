import type { Line } from "../../App";
import { keyEnterHandler, keyArrowHandler, keyBackspaceHandler, onChange, fixHeight } from "./keyboard";

type LineProps = {
	value: Line;
	index: number;
	inputRefs: React.RefObject<HTMLTextAreaElement[]>;
	lines: Line[];
	setLines: React.Dispatch<React.SetStateAction<Line[]>>;
	setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export function Input({ value, index, inputRefs, lines, setLines, setActiveIndex }: LineProps) {
	function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>, i: number) {
		keyEnterHandler(e, i, inputRefs, lines, setLines);
		keyArrowHandler(e, i, inputRefs);
		keyBackspaceHandler(e, i, setLines, inputRefs);
	}

	return (
		<div className="flex" data-list={value.list} data-heading={value.heading}>
			<textarea
				ref={el => {
					if (!el) return;
					inputRefs.current[index] = el;
					fixHeight(el);
				}}
				className="outline-none w-full resize-none whitespace-pre-wrap wrap-break-word"
				placeholder="Write something..."
				onKeyDown={e => onKeyDown(e, index)}
				onChange={e => onChange(e, index, lines, setLines)}
				value={value.text}
				onFocus={() => setActiveIndex(index)}
				rows={1}
			/>
		</div>
	);
}
