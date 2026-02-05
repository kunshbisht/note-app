import type { Line } from "../../App";
import { isCaretOnFirstVisualLine, isCaretOnLastVisualLine } from "./caret";
import { getAttr } from "./attr";

export function keyEnterHandler(e: React.KeyboardEvent<HTMLTextAreaElement>, i: number, inputRefs: React.RefObject<HTMLTextAreaElement[]>, lines: Line[], setLines: React.Dispatch<React.SetStateAction<Line[]>>) {
	if (e.key === "Enter") {
		e.preventDefault();

		const line = e.currentTarget;
		const left = line.value.slice(0, line.selectionStart!);
		const right = line.value.slice(line.selectionEnd!);
		const list = getAttr(i, 'list', lines);
		const heading = getAttr(i, 'heading', lines);

		setLines(prev => [
			...prev.slice(0, i),
			{ text: left, list, heading },
			{ text: right, list, heading: 'none' },
			...prev.slice(i + 1),
		] as Line[]);

		requestAnimationFrame(() => {
			inputRefs.current[i + 1].focus();
			inputRefs.current[i + 1].setSelectionRange(0, 0);
		});
	}
}

export function keyArrowHandler(
	e: React.KeyboardEvent<HTMLTextAreaElement>,
	i: number,
	inputRefs: React.RefObject<HTMLTextAreaElement[]>) {
	const el = e.currentTarget;

	if (e.altKey || e.ctrlKey || e.metaKey) return;

	if (e.key === "ArrowUp") {
		if (!isCaretOnFirstVisualLine(el)) return;

		e.preventDefault();
		inputRefs.current[i - 1]?.focus();
	}

	if (e.key === "ArrowDown") {
		if (!isCaretOnLastVisualLine(el)) return;

		e.preventDefault();
		inputRefs.current[i + 1]?.focus();
	}
}

export function keyBackspaceHandler(e: React.KeyboardEvent<HTMLTextAreaElement>, i: number, setLines: React.Dispatch<React.SetStateAction<Line[]>>, inputRefs: React.RefObject<HTMLTextAreaElement[]>) {
	if (e.key === "Backspace" &&
		e.currentTarget.selectionStart === 0 &&
		e.currentTarget.selectionEnd === 0 &&
		i > 0) {
		e.preventDefault();

		setLines(prev => {
			const next = [...prev];
			const prevLen = next[i - 1].text.length;
			next[i - 1].text += next[i].text;
			next.splice(i, 1);

			requestAnimationFrame(() => {
				inputRefs.current[i - 1]?.focus();
				inputRefs.current[i - 1].setSelectionRange(prevLen, prevLen);
			});

			return next;
		});
	}
}

export function onChange(e: React.ChangeEvent<HTMLTextAreaElement>, i: number, lines: Line[], setLines: React.Dispatch<React.SetStateAction<Line[]>>) {
	let value = e.target.value;
	let list = getAttr(i, 'list', lines);
	let heading = getAttr(i, 'heading', lines);

	if (value.startsWith('* ')) {
		list = 'list';
		value = value.slice(2);
	} else if (value.startsWith('= ')) {
		list = 'none';
		heading = 'none';
		value = value.slice(2);
	} else if (value.startsWith('! ')) {
		heading = 'bold';
		value = value.slice(2);
	} else if (value.startsWith('### ')) {
		heading = 'h3';
		value = value.slice(4);
	} else if (value.startsWith('## ')) {
		heading = 'h2';
		value = value.slice(3);
	} else if (value.startsWith('# ')) {
		heading = 'h1';
		value = value.slice(2);
	}

	fixHeight(e.target);

	setLines(prev => {
		const next = [...prev];
		next[i] = {
			...next[i], text: value, list, heading
		};
		return next;
	});
}

export function fixHeight(el: HTMLTextAreaElement) {
	el.style.height = "auto";
	el.style.height = el.scrollHeight + "px";
}