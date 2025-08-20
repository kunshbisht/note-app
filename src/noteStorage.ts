import { noteArea, titleInput } from './main';

export function saveNote() {
  noteArea.trigger('blur');
  const obj = JSON.stringify({
    title: titleInput.val(),
    content: noteArea.html()
  });
  console.log(obj);
  localStorage.setItem("note", obj);
}
export function getNote() {
  const note = JSON.parse(localStorage.getItem("note") || '{}') as { title: string; content: string; } | null;
  if (!note) return;
  titleInput.val(note.title);
  noteArea.html(note.content);
}
