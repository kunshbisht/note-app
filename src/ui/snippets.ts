import $ from 'jquery';

export function initSnippets() {
	if (localStorage.getItem('show')) return;

	const snippets = [
		'# Heading 1',
		'## Heading 2',
		'### Heading 3',
		'#### Heading 4',
		'##### Heading 5',
		'= Regular',
		'* List',
		'!! Bold',
		'// italic',
		'~~ Hush',
		'2c Columns (2)',
		'3c Columns (3)',
		'4c Columns (4)',
		'Drop online image to load preview (beta)',
	];

	const overlay = $('<div/>')
		.addClass('absolute inset-0 bg-black/30 backdrop-blur flex items-center justify-center');

	const container = $('<div/>')
		.addClass('bg-white w-fit p-4 rounded-xl relative flex flex-col shadow-lg');

	// Add title
	container.append('<b class="text-2xl mb-2">Snippets</b>');

	// Add code snippets
	snippets.forEach(snippet => container.append(`<code>${snippet}</code>`));

	// Close button
	const closeBtn = $('<button/>')
		.text('x')
		.addClass('absolute right-2 top-2 bg-red-500 rounded w-6 h-6 flex items-center justify-center text-white font-bold')
		.on('click', () => {
			localStorage.setItem('show', 'true');
			overlay.remove();
		});

	container.append(closeBtn);
	overlay.append(container).appendTo('body');
}