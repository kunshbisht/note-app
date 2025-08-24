import input, { deleteInput, format } from './input';
import { getNote } from './saveNote';
import './style.css'
import $ from 'jquery';

const note = getNote();
console.log(note)

$('body').addClass('m-4 flex flex-col')

input('py-4 rounded-lg text-5xl font-bold', { placeholder: 'New Note (use Tab to write note)', autofocus: '', id: 'title' })
  .off('input', format as any)
  .off('keydown', deleteInput)
  .appendTo('body')
  .val(note.title);

if (note.content) {
  // Insert HTML directly
  $('body').append(note.content.map(
    el => input()
      .attr('data-format', el['data-format'])
      .val(el.value)
  ));

} else {
  input().appendTo('body');
}