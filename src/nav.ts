import $ from 'jquery'
import { saveNote } from './noteStorage'

function formatButton(label: string, classNames: string, text: string) {
	return $('<button/>')
		.text(label)
		.addClass(classNames + " bg-gray-100 p-2 aspect-square h-10 rounded-lg shadow flex items-center justify-center")
		.on('click', function() {
			const noteArea = $('div[contenteditable]')
			noteArea.html(noteArea.html() + " " + text)
		})
}

export const nav = $('<nav/>')
	.addClass('p-4 pb-0 text-xl flex gap-4')
	.append(
		formatButton('B', 'font-bold', '<b>bold</b>'),
		formatButton('I', 'italic', '<i>italic</i>'),
		formatButton('S', 'line-through', '<s>strike through</s>'),
		formatButton('A', 'text-[blue] underline', '<a href="https://www.example.com">Link</a>'),
		formatButton('code', 'font-mono text-sm', '<code>code</code>'),
		$('<button/>')
			.text('Save')
			.addClass("bg-blue-400 text-white p-2 aspect-square h-10 rounded-lg shadow flex items-center justify-center")
			.on('click', saveNote)
	)