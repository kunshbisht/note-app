import $ from 'jquery';

type contentType = {
    'data-format': string;
    value: string;
}[]

export function saveNote() {
	const title = $('#title').val() as string;

	const content: contentType = $('body')
		.children('input:not(#title)')
		.map(function () {
			const $this = $(this);
			return {
				'data-format': $this.attr('data-format') || 'text',
				'value': ($this.val() as string) || ''
			};
		})
		.get();

	localStorage.setItem('note', JSON.stringify({ title, content }));
}

export function getNote(): { title: string; content: contentType } {
	const data = localStorage.getItem('note');
	if (!data) return { title: '', content: [] };

	try {
		return JSON.parse(data);
	} catch {
		console.error('Failed to parse note from localStorage');
		return { title: '', content: [] };
	}
}
