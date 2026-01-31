import type { Attribute, Line } from "../App";

type LineProps = {
	value: Line;
	index: number;
	inputRefs: React.RefObject<HTMLInputElement[]>;
	lines: Line[];
	setLines: React.Dispatch<React.SetStateAction<Line[]>>;
};

export function Input({ value, index, inputRefs, lines, setLines }: LineProps) {
	function getAttr(i: number, attr: Attribute) {
		return lines[i][attr];
	}

	function setAttr(i: number, attr: Attribute, value: string) {
		setLines(prev => {
			const next = [...prev];
			next[i][attr] = value;
			return next;
		})
	}

	function keyEnterHandler(e: React.KeyboardEvent<HTMLInputElement>, i: number) {
		if (e.key === "Enter") {
			e.preventDefault();

			const line = e.currentTarget;
			const left = line.value.slice(0, line.selectionStart!);
			const right = line.value.slice(line.selectionEnd!);
			const list = getAttr(i, 'list');

			setLines(prev => [
				...prev.slice(0, i),
				{ text: left, list },
				{ text: right, list },
				...prev.slice(i + 1),
			] as Line[]);

			requestAnimationFrame(() => {
				setAttr(i + 1, 'list', getAttr(i, 'list'));
				inputRefs.current[i + 1].focus();
				inputRefs.current[i + 1].setSelectionRange(0, 0);
			});
		}
	}

	function keyArrowHandler(e: React.KeyboardEvent<HTMLInputElement>, i: number) {
		if (e.key === "ArrowUp" && !e.altKey && !e.ctrlKey && !e.metaKey) {
			inputRefs.current[i - 1]?.focus();
		}

		if (e.key === "ArrowDown" && !e.altKey && !e.ctrlKey && !e.metaKey) {
			inputRefs.current[i + 1]?.focus();
		}
	}

	function keyBackspaceHandler(e: React.KeyboardEvent<HTMLInputElement>, i: number) {
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

	function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>, i: number) {
		keyEnterHandler(e, i);
		keyArrowHandler(e, i);
		keyBackspaceHandler(e, i);
	}

	function onChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
		let value = e.target.value;
		let list = getAttr(i, 'list');
		let heading = getAttr(i, 'heading');

		if (value.startsWith('* ')) {
			list = 'list';
			value = value.slice(2);
		} else if (value.startsWith('= ')) {
			list = 'none';
			heading = 'none'
			value = value.slice(2);
		} else if (value.startsWith('! ')) {
			heading = 'bold';
			value = value.slice(2);
		} else if (value.startsWith('# ')) {
			heading = 'h1';
			value = value.slice(2);
		} else if (value.startsWith('## ')) {
			heading = 'h2';
			value = value.slice(3);
		} else if (value.startsWith('### ')) {
			heading = 'h3';
			value = value.slice(4);
		}

		setAttr(i, 'list', list);
		setAttr(i, 'heading', heading);

		setLines(prev => {
			const next = [...prev];
			next[i].text = value;
			return next;
		});
	}

	return (
		<div data-list={value.list} data-heading={value.heading}>
			<input
				ref={el => {
					if (el) inputRefs.current[index] = el;
				}}
				className="outline-none"
				placeholder="Write something..."
				onKeyDown={e => onKeyDown(e, index)}
				onChange={e => onChange(e, index)}
				value={value.text}
				autoFocus
			/>
		</div>
	);
}
