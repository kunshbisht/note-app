import $ from 'jquery';
import './styles/main.css';
import { showHome } from './routes/home';
import { showEditor } from './routes/editor';

function router() {
  const hash = window.location.hash || '#/';
  if (hash === '#/') showHome();
  if (hash === '#editor') showEditor();
}

$(window).on('hashchange', router);
router(); // initial load
