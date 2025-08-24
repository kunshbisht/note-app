import $ from 'jquery';
import { saveNote } from './saveNote';

export function format(e: Event): void {
	const t = e.target as HTMLInputElement; // cast to input
	const $t = $(t);

	const rules: [string, string][] = [
		['# ', 'h1'],
		['## ', 'h2'],
		['### ', 'h3'],
		['#### ', 'h4'],
		['##### ', 'h5'],
		['= ', 'text'],
	];

	for (const [pre, fmt] of rules) {
		if (t.value.startsWith(pre)) {
			$t.attr('data-format', fmt).val(t.value.slice(pre.length));
			break;
		}
	}
}

export function deleteInput(e: JQuery.KeyDownEvent) {
	const target = e.target as HTMLInputElement;
	const $t = $(target);

	if (
		e.key === 'Backspace' &&
		target.selectionStart === 0 &&
		target.selectionEnd === 0
	) {
		e.preventDefault();
		const $prev = $t.prev('input');
		$t.remove();
		if ($prev.length) $prev.trigger('focus');
	}
}

export function onKeyDown(e: JQuery.KeyDownEvent) {
	const $target = $(e.target)
	if (e.key === 'Enter') {
		const $new = input('Write anything');
		$target.after($new);   // insert after current
		$new.trigger('focus');     // focus the new one
	} else if (e.key === 'ArrowDown') {
		$target.next().trigger('focus')
	} else if (e.key === 'ArrowUp') {
		$target.prev().trigger('focus')
	}
}

export default function input(
	className = '',
	attrs: Record<string, any> = {}
): JQuery<HTMLInputElement> {
	return $('<input>', { type: 'text', ...attrs })
		.attr('placeholder', (_, str) => str || 'Write anything')
		.on('keydown', onKeyDown)
		.on('keydown', deleteInput)
		.on('input', format)
		.on('input', saveNote)
		.addClass(`outline-none p-2 ${className}`.trim()) as JQuery<HTMLInputElement>;
}
