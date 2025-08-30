import $ from 'jquery';
import { getNote, saveNote } from '../core/note';
import { restoreNote } from '../ui/restore';
import { initSnippets } from '../ui/snippets';
import enableImageDrop from '../ui/imageDrop';
import input from '../ui/input';
import { enableBackgroundInput } from '../ui/background';

export function showEditor() {
	$('#app').empty();

	enableBackgroundInput();
	$(document).on('dragover dragenter drop', e => e.preventDefault());

	initSnippets();

	enableImageDrop($('#app'), url => {
		const $img = $('<img>')
			.attr('data-format', 'preview')
			.attr('src', url)
			.on('contextmenu', e => {
				e.preventDefault();
				$img.remove();
				saveNote();
			})
			.appendTo('#app');
		saveNote();
	});

	const note = getNote();
	input('py-4 rounded-lg text-5xl font-bold', {
		placeholder: 'New Note',
		autofocus: '',
		id: 'title'
	}).appendTo('#app').val(note.title);

	restoreNote(note);

	if (!note.content.length) {
		input().appendTo('#app');
		saveNote();
	}
}
