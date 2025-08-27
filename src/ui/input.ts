import $ from 'jquery';
import { deleteInput, format, onKeyDown } from '../core/format';
import { saveNote } from '../core/note';

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
