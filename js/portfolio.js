'use strict';

(function() {
  var panel = document.getElementById('project-panel');
  var scrim = document.getElementById('panel-scrim');
  var closeBtn = document.getElementById('panel-close');

  function openPanel(item) {
    document.getElementById('panel-title').textContent = item.dataset.title || '';
    document.getElementById('panel-context').textContent = item.dataset.context || '';
    document.getElementById('panel-problem').textContent = item.dataset.problem || '';
    document.getElementById('panel-built').textContent = item.dataset.built || '';

    var toolsEl = document.getElementById('panel-tools');
    toolsEl.innerHTML = '';
    var tools = (item.dataset.tools || '').split(',');
    tools.forEach(function(tool) {
      var tag = document.createElement('span');
      tag.className = 'tool-tag';
      tag.textContent = tool.trim();
      toolsEl.appendChild(tag);
    });

    var cardImg = item.querySelector('.card-image');
    var bgUrl = cardImg.style.backgroundImage.replace(/url\(['"]?([^'"]+)['"]?\)/i, '$1');
    document.getElementById('panel-image').src = bgUrl;
    document.getElementById('panel-image').alt = item.dataset.title || '';

    panel.classList.add('open');
    scrim.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    panel.classList.remove('open');
    scrim.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.grid-item').forEach(function(item) {
    item.addEventListener('click', function() {
      openPanel(this);
    });
  });

  closeBtn.addEventListener('click', closePanel);
  scrim.addEventListener('click', closePanel);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePanel();
  });
})();
