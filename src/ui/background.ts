import $ from 'jquery';
import input from './input';
import { saveNote } from '../core/note';

export function enableBackgroundInput() {
	$('#app')
		.addClass('p-4 h-screen flex flex-col')
		.on('dblclick', e => {
			if (e.target !== e.currentTarget) return;
			input().appendTo('#app').trigger('focus');
			saveNote();
		});
}
