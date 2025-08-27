import $ from 'jquery';
import input from './input';
import { saveNote } from '../core/note';

export function enableBackgroundInput() {
	$('body')
		.addClass('p-4 h-screen flex flex-col')
		.on('dblclick', e => {
			if (e.target !== e.currentTarget) return;
			input().appendTo('body').trigger('focus');
			saveNote();
		});
}
