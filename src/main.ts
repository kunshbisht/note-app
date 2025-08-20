import $ from 'jquery';
import './style.css';
import { htmlToMarkdown, markdownToHtml } from './markdown';
import { nav } from './nav';
import { saveNote, getNote } from './noteStorage';

const app = $('#app');

const container = $('<div/>').addClass('p-6 flex-1 flex flex-col gap-4');

export const titleInput = $('<input/>')
  .addClass('p-4 rounded-xl outline-none bg-gray-200 text-3xl font-bold')
  .attr('placeholder', 'Add a title (use Tab/⇥ to write note)')
  .attr('autofocus', '');

export const noteArea = $('<div/>')
  .addClass('p-4 rounded-xl text-justify overflow-scroll outline-none bg-gray-200 flex-1')
  .attr('contentEditable', 'true')
  .on('mousedown', 'a', function(e) {
    e.preventDefault();
    const href = $(this).attr('href');
    if (href) window.open(href, '_blank');
  })
  .on("blur", function() {
    const $el = $(this);
    const originalContent = $el.html() || "";
    $el.html(markdownToHtml(originalContent));
  })
  .on('focus', function() {
    const $el = $(this);
    const originalContent = $el.html() || "";
    $el.html(htmlToMarkdown(originalContent));
  });

noteArea.on('click', 'a', function(e) {
  e.stopPropagation();
  e.preventDefault();
  const href = $(this).attr('href');
  if (href) window.open(href, '_blank');
});

$(window).on('keydown', function(e) {
  if (e.ctrlKey && e.key == 's') saveNote();
})

$(getNote)

container.append(titleInput, noteArea);
app.append(nav, container);
