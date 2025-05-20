// ==UserScript==
// @name         Google Forms + Som ao Enviar (Popup)
// @match        https://docs.google.com/forms/d/*/viewform*
// @grant        none
// @run-at       document-idle
// ==/UserScript==
(function(){
  'use strict';
  // URL direta do seu MP3
  const audioUrl = 'https://raw.githubusercontent.com/joaobrunon/public/main/urna.mp3';

  // Função que abre o popup e injeta o player
  function tocarEmPopup() {
    const html = `
      <html><body style="margin:0;padding:0;overflow:hidden">
        <audio src="${audioUrl}" autoplay></audio>
      </body></html>`;
    window.open(
      'data:text/html;charset=utf-8,' + encodeURIComponent(html),
      '_blank',
      'width=1,height=1,menubar=no,toolbar=no,location=no,status=no'
    );
  }

  // Acha o botão “Enviar” (pode demorar a aparecer no DOM)
  function bindOnSubmit() {
    const btn = Array.from(document.querySelectorAll('div[role=button]'))
                     .find(el => el.textContent.trim().toLowerCase() === 'enviar');
    if (btn) {
      btn.addEventListener('click', tocarEmPopup, { once: true });
      return true;
    }
    return false;
  }

  // Se não achar já, observa o DOM até ele aparecer
  if (!bindOnSubmit()) {
    new MutationObserver((mut, obs) => {
      if (bindOnSubmit()) obs.disconnect();
    }).observe(document.body, { childList: true, subtree: true });
  }
})();
