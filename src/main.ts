import $ from 'jquery';
import './styles/main.css';

import { getNote } from './core/note';
import { restoreNote } from './ui/restore';
import { initSnippets } from './ui/snippets';
import enableImageDrop from './ui/imageDrop';
import input from './ui/input';
import { saveNote } from './core/note';
import { enableBackgroundInput } from './ui/background';

// Make input on double click
enableBackgroundInput()

// Prevent default browser drag/drop
$(document).on('dragover dragenter drop', e => e.preventDefault());

// Init snippets modal (only once)
initSnippets();

// Enable image drop
enableImageDrop($('body'), url => {
  const $img = $('<img>')
    .attr('data-format', 'preview')
    .attr('src', url)
    .on('contextmenu', e => {
      e.preventDefault();
      $img.remove();
      saveNote();
    })
    .appendTo('body');
  saveNote();
});

// Title input
const note = getNote();
input('py-4 rounded-lg text-5xl font-bold', {
  placeholder: 'New Note',
  autofocus: '',
  id: 'title'
}).appendTo('body').val(note.title);

// Restore content
restoreNote(note);

// If empty, insert a blank input
if (!note.content.length) {
  input().appendTo('body');
  saveNote();
}
