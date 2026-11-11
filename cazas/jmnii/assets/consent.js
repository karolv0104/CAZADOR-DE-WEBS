/* Privacy notice banner: shown once; the visitor's choice is kept in localStorage. */
(function () {
  var KEY = 'jmnii-privacy-choice';
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (stored) return;

  function build() {
    var box = document.createElement('section');
    box.className = 'jm-consent';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Privacy notice');

    var text = document.createElement('p');
    text.appendChild(document.createTextNode('We use essential technologies to ensure a secure browsing experience. Review our '));
    var link = document.createElement('a');
    link.href = 'privacy.html';
    link.textContent = 'Privacy Notice';
    text.appendChild(link);
    text.appendChild(document.createTextNode('.'));

    var actions = document.createElement('div');
    actions.className = 'jm-actions';
    function button(label, cls, value) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = cls;
      b.textContent = label;
      b.addEventListener('click', function () {
        try { localStorage.setItem(KEY, JSON.stringify({ choice: value, date: new Date().toISOString() })); } catch (e) {}
        box.classList.remove('is-visible');
        setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 650);
      });
      return b;
    }
    actions.appendChild(button('Accept', 'jm-accept', 'accepted'));
    actions.appendChild(button('Decline', 'jm-decline', 'declined'));

    box.appendChild(text);
    box.appendChild(actions);
    document.body.appendChild(box);

    /* Wait for the opening animation (if any) before appearing */
    var delay = document.documentElement.classList.contains('intro') ? 3200 : 1200;
    setTimeout(function () { requestAnimationFrame(function () { box.classList.add('is-visible'); }); }, delay);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
