import $ from 'jquery'
import { saveNote } from './saveNote';

export function cleanup($el: JQuery = $('body')) {
	$el.find('.col:empty').remove();
	$el.find('.row:empty').remove();
	$('.row').each(function () {
		const $row = $(this);
		const $cols = $row.children('.col');

		if ($cols.length === 1) {
			$cols.contents().unwrap();
			$cols.remove

			$row.contents().unwrap()
			$row.remove();
		}
	});
	saveNote();
}