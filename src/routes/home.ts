import $ from 'jquery';

export function showHome() {
	$('#app').empty();
	$('<h1>').text('Welcome Home').appendTo('#app');
}