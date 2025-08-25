import $ from 'jquery';
import { saveNote } from './saveNote';
import { cleanup } from './cleanup';

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
		['* ', 'list'],
	];

	for (const [pre, fmt] of rules) {
		if (t.value.startsWith(pre)) {
			$t.attr('data-format', fmt).val(t.value.slice(pre.length));
			break;
		}
	}

	const colRules: [string, number][] = [
		['2c ', 2],
		['3c ', 3],
		['4c ', 4]
	]

	for (const rule of colRules) {
		if (t.value.startsWith(rule[0])) {
			t.value = t.value.slice(rule[0].length);
			if ($t.closest('.row').length === 0) {
				const $row = $('<div>').addClass('row')
				const $col1 = $('<div>').addClass('col').appendTo($row)
				for (let i = 1; i < rule[1]; i++) {
					$('<div>').addClass('col').appendTo($row)
				}

				$t.after($row);
				$col1.append($t);
				$row.children().filter((_, el) => $(el).is(':empty')).append(input());
				$t.trigger('focus');
				saveNote()
			}
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
		cleanup()
		if ($prev.length) $prev.trigger('focus');
	}
}

export function onKeyDown(e: JQuery.KeyDownEvent) {
	const $target = $(e.target)
	if (e.key === 'Enter') {
		const $new = input('', {placeholder: 'Write anything'});
		if ($target.attr('data-format') === 'list')
			$new.attr('data-format', 'list')
		$target.after($new);
		$new.trigger('focus');
		saveNote()
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
