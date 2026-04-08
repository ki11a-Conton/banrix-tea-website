import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

window.__BASE_URL__ = import.meta.env.BASE_URL;

// GitHub Pages SPA redirect handler (works with 404.html)
(function () {
  var redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== window.location.href) {
    window.history.replaceState(null, null, redirect);
  }
})();

(function () {
  var search = window.location.search;
  if (search && search[1] === '/') {
    var path = search.slice(2).split('&')[0].replace(/~and~/g, '&');
    sessionStorage.redirect = window.location.origin + window.location.pathname + '#' + path;
    window.location.href = window.location.origin + window.location.pathname;
    return;
  }
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/banrix-tea-website">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
