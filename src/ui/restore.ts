import { saveNote } from "../core/note";
import type { ContentType } from "../types/note";
import input from "./input";
import $ from 'jquery';

export function restoreNote(note: {
    title: string;
    content: ContentType[];
}) {
	note.content.forEach(el => {
		// Simple text input
		if (el['data-format'] === 'preview' && typeof el.value === 'string') {
			$('<img>')
				.attr('data-format', 'preview')
				.attr('src', el.value)
				.on('contextmenu', function (e) {
					e.preventDefault()
					$(this).remove()
					saveNote()
				})
				.appendTo('body');
			return;
		}

		if (typeof el.value === 'string') {
			input()
				.attr('data-format', el['data-format'])
				.val(el.value)
				.appendTo('body');
			return;
		}

		// Handle "cols" format
		if (el['data-format'] === 'cols') {
			const $row = $('<div>').addClass('row');

			el.value.forEach(col => {
				const $col = $('<div>').addClass('col').appendTo($row);

				// Add string children to column
				(col.value as ContentType[])
					.filter(child => typeof child.value === 'string')
					.forEach(child => {
						input()
							.attr('data-format', child['data-format'])
							.val(child.value as string)
							.appendTo($col);
					});
			});

			// Add row to the document
			$('body').append($row);
		}
	});

	// If content empty, add one input
	if (!note.content.length) {
		input().appendTo('body');
		saveNote()
	}
}