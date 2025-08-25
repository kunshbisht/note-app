import input, { deleteInput, format } from './input';
import { getNote, type contentType } from './saveNote';
import './style.css'
import $ from 'jquery';

$('body')
  .addClass('p-4 h-screen flex flex-col')
  .on('dblclick', e => {
    if (e.target !== e.currentTarget) return
    input().appendTo('body').trigger('focus')
  })

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
          '<code>2c Columns</code>',
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

const note = getNote();
console.log(note);

// Title input
input('py-4 rounded-lg text-5xl font-bold', {
  placeholder: 'New Note',
  autofocus: '',
  id: 'title'
})
  .off('input', format as any)
  .off('keydown', deleteInput)
  .appendTo('body')
  .val(note.title);

// Restore content
note.content.forEach(el => {
  // Simple text input
  if (typeof el.value === 'string') {
    input()
      .attr('data-format', el['data-format'])
      .val(el.value)
      .appendTo('body');
    return;
  }

  // Handle "cols" format
  if (el['data-format'] === 'cols') {
    const $row = $('<div>').addClass('row');

    el.value.forEach(col => {
      const $col = $('<div>').addClass('col').appendTo($row);

      // Add string children to column
      (col.value as contentType[])
        .filter(child => typeof child.value === 'string')
        .forEach(child => {
          input()
            .attr('data-format', child['data-format'])
            .val(child.value as string)
            .appendTo($col);
        });
    });

    // Add row to the document
    $('body').append($row);
  }
});

// If content empty, add one input
if (!note.content.length) {
  input().appendTo('body');
}