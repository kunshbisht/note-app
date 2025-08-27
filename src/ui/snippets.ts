import $ from 'jquery';

export function initSnippets() {
	if (!localStorage.getItem('show')) {
		$('<div/>')
			.addClass('absolute inset-0 bg-black/30 backdrop-blur flex items-center justify-center')
			.append(
				$('<div/>')
					.addClass('bg-white w-fit p-4 rounded-xl relative flex flex-col shadow-lg')
					.append(
						'<b class="text-2xl">Snippets</b>',
						'<code># Heading 1</code>',
						'<code>## Heading 2</code>',
						'<code>### Heading 3</code>',
						'<code>#### Heading 4</code>',
						'<code>##### Heading 5</code>',
						'<code>= Regular</code>',
						'<code>* List</code>',
						'<code>2c Columns (2)</code>',
						'<code>3c Columns (3)</code>',
						'<code>4c Columns (4)</code>',
						'<code>4c Columns (4)</code>',
						'<code>Drop online image to load preview (beta)</code>',
						$('<button/>')
							.text('x')
							.addClass('absolute right-2 top-2 bg-red-500 rounded w-6')
							.on('click', e => {
								localStorage.setItem('show', 'true')
								$(e.target).parent().parent().remove()
							})
					)
			)
			.appendTo('body')
	}
}