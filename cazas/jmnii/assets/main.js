/* JMNII Global Holdings — site behaviour (kept external so the Content-Security-Policy can forbid inline scripts). */
    (function () {
      var root = document.documentElement;
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var $ = function (s, c) { return (c || document).querySelector(s); };
      var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

      /* Intro curtain plays once per visit */
      if (root.classList.contains('intro')) {
        try { sessionStorage.setItem('jmnii-intro', '1'); } catch (e) {}
        setTimeout(function () { root.classList.remove('intro'); }, 2500);
      }

      /* Live local time in each market */
      var clocks = $$('[data-clock]');
      function tick() {
        var now = new Date();
        clocks.forEach(function (el) {
          try { el.textContent = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: el.dataset.clock }); } catch (e) {}
        });
      }
      tick(); setInterval(tick, 15000);

      /* Reveals */
      var reveals = $$('.reveal');
      if (reduced || !('IntersectionObserver' in window)) reveals.forEach(function (el) { el.classList.add('in'); });
      else {
        var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
        reveals.forEach(function (el) { io.observe(el); });
      }

      /* Active section in the navigation */
      var links = $$('.nav-link');
      if ('IntersectionObserver' in window) {
        var so = new IntersectionObserver(function (es) {
          es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id); }); });
        }, { rootMargin: '-45% 0px -50% 0px' });
        ['about', 'approach', 'capabilities', 'presence', 'leadership', 'contact'].forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
      }

      /* Scroll-linked: manifesto words + approach progress */
      var statement = $('#statement'), words = [];
      if (statement) {
        statement.innerHTML = statement.textContent.trim().split(/\s+/).map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
        words = $$('.w', statement);
      }
      var stepsList = $('#steps'), steps = $$('.step'), fill = $('#progress'), ticking = false;
      function onScroll() {
        if (ticking) return; ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          var vh = window.innerHeight;
          if (words.length) {
            var r = statement.getBoundingClientRect();
            var p = reduced ? 1 : Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (r.height + vh * 0.3)));
            var n = Math.round(p * words.length);
            words.forEach(function (w, i) { w.classList.toggle('lit', i < n); });
          }
          if (stepsList) {
            var b = stepsList.getBoundingClientRect();
            var q = Math.min(1, Math.max(0, (vh * 0.62 - b.top) / b.height));
            fill.style.transform = 'scaleY(' + (reduced ? 1 : q).toFixed(3) + ')';
            steps.forEach(function (s) { s.classList.toggle('is-on', reduced || s.getBoundingClientRect().top < vh * 0.64); });
          }
        });
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      onScroll();

      /* Capabilities accordion */
      $$('.acc').forEach(function (btn) {
        btn.addEventListener('click', function () { btn.setAttribute('aria-expanded', String(btn.getAttribute('aria-expanded') !== 'true')); });
      });

      /* Mobile menu */
      var toggle = $('#menu-toggle'), menu = $('#mobile-menu');
      function setMenu(open) {
        menu.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.style.overflow = open ? 'hidden' : '';
      }
      toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
      $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

      /* Biography drawer */
      var drawer = $('#drawer'), body = $('#drawer-body'), lastFocus = null;
      function openBio(id, trigger) {
        body.innerHTML = document.getElementById(id).innerHTML;
        /* Emails are assembled here (not written in the HTML) so spam bots cannot harvest them */
        $$('.js-mail', body).forEach(function (m) {
          var email = m.dataset.u + '@' + m.dataset.d;
          m.href = 'mailto:' + email;
          m.textContent = email;
        });
        lastFocus = trigger;
        drawer.querySelector('.panel').scrollTop = 0;
        drawer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        setTimeout(function () { $('#drawer-close').focus(); }, 60);
      }
      function closeBio() {
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
      }
      $$('.bio-open').forEach(function (b) { b.addEventListener('click', function () { openBio(b.dataset.bio, b); }); });
      $$('[data-close]', drawer).forEach(function (c) { c.addEventListener('click', closeBio); });
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (drawer.classList.contains('is-open')) closeBio();
        if (menu.classList.contains('is-open')) setMenu(false);
      });

      /* Contact form — sent to info@jmnii.com through Web3Forms; confirm only on success */
      var form = $('#contact-form');
      var sent = $('#form-sent');
      var formError = $('#form-error');
      function showSent() {
        form.classList.add('hidden');
        sent.classList.remove('hidden');
        sent.focus();
      }
      if (new URLSearchParams(location.search).has('sent')) showSent(); /* no-JS fallback */
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        var fd = new FormData(form);
        if (fd.get('bot-field')) return; /* honeypot: silently drop bots */
        var btn = form.querySelector('button[type="submit"]');
        var label = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Sending…';
        formError.classList.add('hidden');
        var payload = {
          access_key: '768c3b1c-0a3e-4fff-b27f-8e1617b496eb',
          subject: 'New inquiry from jmnii.com: ' + fd.get('inquiry-type'),
          from_name: 'JMNII Website',
          name: fd.get('full-name'),
          company: fd.get('company'),
          email: fd.get('email'),
          country: fd.get('country'),
          inquiry_type: fd.get('inquiry-type'),
          message: fd.get('message')
        };
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then(function (res) {
            return res.json().catch(function () { return {}; }).then(function (data) {
              if (!res.ok || !data.success) throw new Error(data.message || ('HTTP ' + res.status));
            });
          })
          .then(function () {
            form.reset();
            showSent();
          })
          .catch(function () {
            formError.classList.remove('hidden');
          })
          .finally(function () {
            btn.disabled = false;
            btn.textContent = label;
          });
      });
    })();

    /* =========================================================
       HERO — the three cities
       Desktop (> 1024px, mouse): the cursor chooses the city in focus —
         left = London, centre = Miami, right = the Netherlands —
         with a focus pull (blur to sharp) and GPU parallax (translate3d).
       All devices: the cities cycle on their own every 7 s and the tabs
         select a city directly. Touch screens get no parallax.
       ========================================================= */
    (function () {
      var hero = document.getElementById('hero');
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var order = ['miami', 'london', 'netherlands'];
      var figs = {}, tabs = {};
      Array.prototype.forEach.call(hero.querySelectorAll('.city'), function (f) { figs[f.dataset.city] = f; });
      Array.prototype.forEach.call(hero.querySelectorAll('.city-tab'), function (t) { tabs[t.dataset.city] = t; });
      var DWELL = 7000, current = 'miami', timer = null, pausedUntil = 0;
      hero.style.setProperty('--dwell', DWELL + 'ms');

      function show(key) {
        current = key;
        order.forEach(function (k) {
          var on = k === key;
          figs[k].classList.toggle('is-active', on);
          figs[k].setAttribute('aria-hidden', String(!on));
          tabs[k].classList.toggle('is-active', on);
          tabs[k].setAttribute('aria-selected', String(on));
          tabs[k].classList.toggle('no-timer', on && Date.now() < pausedUntil);
          if (on) { var bar = tabs[k].querySelector('.city-bar > span'); bar.style.transition = 'none'; void bar.offsetWidth; bar.style.transition = ''; }
        });
      }
      function schedule() {
        clearTimeout(timer);
        if (reduced) return;
        timer = setTimeout(function () {
          if (Date.now() >= pausedUntil) show(order[(order.indexOf(current) + 1) % order.length]);
          schedule();
        }, DWELL);
      }
      order.forEach(function (k) {
        tabs[k].addEventListener('click', function () { pausedUntil = Date.now() + 12000; show(k); schedule(); });
      });
      new IntersectionObserver(function (es) { if (es[0].isIntersecting) schedule(); else clearTimeout(timer); }).observe(hero);

      /* Desktop: cursor-driven focus + parallax */
      var imgs = Array.prototype.slice.call(hero.querySelectorAll('.city-img'));
      var text = document.getElementById('layer-text');
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null, active = false, rect = null, zone = null;
      function frame() {
        cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
        imgs.forEach(function (im) { var sp = +im.dataset.speed; im.style.transform = 'translate3d(' + (-cx * sp).toFixed(2) + 'px,' + (-cy * sp * 0.6).toFixed(2) + 'px,0)'; });
        text.style.transform = 'translate3d(' + (cx * 10).toFixed(2) + 'px,' + (cy * 6).toFixed(2) + 'px,0)';
        raf = (Math.abs(tx - cx) < 0.001 && Math.abs(ty - cy) < 0.001) ? null : requestAnimationFrame(frame);
      }
      function onMove(e) {
        rect = rect || hero.getBoundingClientRect();
        tx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
        ty = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
        if (e.clientY < rect.bottom - 90) {                       // the tab bar has its own controls
          var z = tx < -0.34 ? 'london' : tx > 0.34 ? 'netherlands' : 'miami';
          if (z !== zone) { zone = z; pausedUntil = Date.now() + 9000; if (z !== current) show(z); schedule(); }
        }
        if (!raf) raf = requestAnimationFrame(frame);
      }
      function onLeave() { tx = 0; ty = 0; zone = null; if (!raf) raf = requestAnimationFrame(frame); }
      function enable() { if (active) return; active = true; hero.addEventListener('mousemove', onMove, { passive: true }); hero.addEventListener('mouseleave', onLeave, { passive: true }); }
      function disable() {
        if (!active) return; active = false;
        hero.removeEventListener('mousemove', onMove); hero.removeEventListener('mouseleave', onLeave);
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        imgs.forEach(function (im) { im.style.transform = ''; }); text.style.transform = '';
      }
      function check() { rect = null; if (window.innerWidth > 1024 && !reduced && window.matchMedia('(pointer: fine)').matches) enable(); else disable(); }
      check();
      window.addEventListener('resize', check, { passive: true });
      window.addEventListener('scroll', function () { rect = null; }, { passive: true });
    })();

    /* =========================================================
       SIGNATURE — 3D PLEXUS NETWORK (native canvas, no library)
       · Nodes live in a 3D volume, drift autonomously and the whole
         volume turns slowly; they are projected with true perspective.
       · Nodes closer than a 3D threshold are joined by hairlines whose
         opacity falls with distance and depth (silver / ivory).
       · Pointer: simulated gravity pulls nearby nodes toward the cursor
         (inverse-square falloff, softened) — an optical relief "lens".
       · Scroll: scroll velocity adds spin and a slight tilt to the volume.
       · Performance: one requestAnimationFrame loop, typed arrays
         allocated once (no per-frame allocation, so no GC churn),
         DPR capped at 2, paused off-screen and in background tabs,
         node count scaled to the viewport. Reduced motion: one still frame.
       ========================================================= */
    (function () {
      var canvas = document.getElementById('plexus');
      if (!canvas || !canvas.getContext) return;
      var section = document.getElementById('signature');
      var ctx = canvas.getContext('2d', { alpha: false });
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      var N, HUBS = 3, LINK = 0.42, FOCAL = 2.2;
      var px, py, pz, vx, vy, vz, sx, sy, sd, ox, oy;   // typed arrays, allocated on resize only
      var W = 0, H = 0, DPR = 1, scale = 1;
      var rotY = 0, tilt = 0, spin = 0.00045, scrollKick = 0, lastScroll = window.scrollY;
      var mx = -9999, my = -9999, pull = 0, running = false, raf = null, visible = false;

      function seed(i) {                                   // deterministic layout, no Math.random churn
        var t = Math.sin(i * 12.9898) * 43758.5453; return t - Math.floor(t);
      }
      function allocate() {
        var area = W * H;
        N = Math.max(60, Math.min(170, Math.round(area / 9000)));
        px = new Float32Array(N); py = new Float32Array(N); pz = new Float32Array(N);
        vx = new Float32Array(N); vy = new Float32Array(N); vz = new Float32Array(N);
        sx = new Float32Array(N); sy = new Float32Array(N); sd = new Float32Array(N);
        ox = new Float32Array(N); oy = new Float32Array(N);
        for (var i = 0; i < N; i++) {
          px[i] = seed(i + 1) * 2 - 1;
          py[i] = (seed(i + 101) * 2 - 1) * 0.62;
          pz[i] = seed(i + 201) * 2 - 1;
          vx[i] = (seed(i + 301) - 0.5) * 0.0011;
          vy[i] = (seed(i + 401) - 0.5) * 0.0008;
          vz[i] = (seed(i + 501) - 0.5) * 0.0011;
        }
        // three hubs (Miami, London, the Netherlands) sit on a wide arc
        px[0] = -0.62; py[0] = 0.18; pz[0] = 0.15;
        px[1] = 0.58;  py[1] = -0.24; pz[1] = -0.1;
        px[2] = 0.74;  py[2] = -0.12; pz[2] = 0.35;
      }
      function resize() {
        var r = section.getBoundingClientRect();
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
        canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        scale = Math.min(W, H * 1.6) * 0.62;
        if (!px || Math.abs(N - Math.max(60, Math.min(170, Math.round(W * H / 9000)))) > 20) allocate();
        draw();
      }

      function step() {
        // autonomous drift inside a soft box
        for (var i = HUBS; i < N; i++) {
          px[i] += vx[i]; py[i] += vy[i]; pz[i] += vz[i];
          if (px[i] > 1 || px[i] < -1) vx[i] = -vx[i];
          if (py[i] > 0.62 || py[i] < -0.62) vy[i] = -vy[i];
          if (pz[i] > 1 || pz[i] < -1) vz[i] = -vz[i];
        }
        // scroll velocity → extra spin and tilt, decaying smoothly
        var y = window.scrollY, dy = y - lastScroll; lastScroll = y;
        scrollKick += dy * 0.000012; scrollKick *= 0.92;
        rotY += spin + scrollKick;
        var r = section.getBoundingClientRect();
        var targetTilt = ((r.top + r.height / 2) - window.innerHeight / 2) / window.innerHeight * 0.35;
        tilt += (targetTilt - tilt) * 0.06;
        pull += ((mx > -9000 ? 1 : 0) - pull) * 0.06;     // ease the gravity in and out
      }

      function draw() {
        var cy = Math.cos(rotY), sy0 = Math.sin(rotY), ct = Math.cos(tilt), st = Math.sin(tilt);
        var cxs = W / 2, cys = H / 2, R = Math.min(W, H) * 0.32, G = 2600;
        ctx.globalAlpha = 1; ctx.fillStyle = '#0B0B0B'; ctx.fillRect(0, 0, W, H);

        // project + gravity lens
        for (var i = 0; i < N; i++) {
          var x = px[i] * cy - pz[i] * sy0, z = px[i] * sy0 + pz[i] * cy;
          var y = py[i] * ct - z * st; z = py[i] * st + z * ct;
          var k = FOCAL / (FOCAL + z);
          var X = cxs + x * scale * k, Y = cys + y * scale * k;
          var dx = mx - X, dy = my - Y, d2 = dx * dx + dy * dy;
          var f = pull * G / (d2 + 3200);                  // softened inverse-square gravity
          if (f > 0.55) f = 0.55;
          ox[i] += (dx * f - ox[i]) * 0.12; oy[i] += (dy * f - oy[i]) * 0.12;
          sx[i] = X + ox[i]; sy[i] = Y + oy[i]; sd[i] = k;
        }

        // links (one fixed colour; per-line strength via globalAlpha = no string allocation per frame)
        ctx.lineWidth = 0.6; ctx.strokeStyle = '#D6D5D1';
        for (var a = 0; a < N; a++) {
          for (var b = a + 1; b < N; b++) {
            var ddx = px[a] - px[b], ddy = py[a] - py[b], ddz = pz[a] - pz[b];
            var dist = ddx * ddx + ddy * ddy + ddz * ddz;
            var lim = (a < HUBS || b < HUBS) ? LINK * 1.6 : LINK;
            if (dist > lim * lim) continue;
            var alpha = (1 - Math.sqrt(dist) / lim) * 0.62 * Math.min(sd[a], sd[b]);
            if (a < HUBS && b < HUBS) alpha = 0.32;
            ctx.globalAlpha = alpha;
            ctx.beginPath(); ctx.moveTo(sx[a], sy[a]); ctx.lineTo(sx[b], sy[b]); ctx.stroke();
          }
        }
        // cursor tethers
        if (pull > 0.05) {
          ctx.strokeStyle = '#FBF9F6';
          for (var c = 0; c < N; c++) {
            var tx = mx - sx[c], ty = my - sy[c], td = tx * tx + ty * ty;
            if (td > R * R * 0.35) continue;
            ctx.globalAlpha = (1 - Math.sqrt(td) / (R * 0.6)) * 0.35 * pull;
            ctx.beginPath(); ctx.moveTo(sx[c], sy[c]); ctx.lineTo(mx, my); ctx.stroke();
          }
        }
        // nodes
        for (var n = 0; n < N; n++) {
          var hub = n < HUBS, s = hub ? 2.8 * sd[n] : 1.4 * sd[n];
          ctx.globalAlpha = hub ? 1 : 0.5 + 0.5 * (sd[n] - 0.6);
          ctx.fillStyle = hub ? '#FBF9F6' : '#D6D5D1';
          ctx.beginPath(); ctx.arc(sx[n], sy[n], s, 0, 6.2832); ctx.fill();
          if (hub) { ctx.globalAlpha = 0.35; ctx.strokeStyle = '#B9B8B4'; ctx.beginPath(); ctx.arc(sx[n], sy[n], s * 4.5, 0, 6.2832); ctx.stroke(); }
        }
        ctx.globalAlpha = 1;
      }

      function loop() {
        if (!running) { raf = null; return; }
        step(); draw();
        raf = requestAnimationFrame(loop);
      }
      function start() { if (reduced || running) return; running = true; if (!raf) raf = requestAnimationFrame(loop); }
      function stop() { running = false; }

      // pointer: mouse, pen and touch
      function pointer(e) {
        var r = canvas.getBoundingClientRect();
        mx = e.clientX - r.left; my = e.clientY - r.top;
      }
      section.addEventListener('pointermove', pointer, { passive: true });
      section.addEventListener('pointerdown', pointer, { passive: true });
      section.addEventListener('pointerleave', function () { mx = my = -9999; }, { passive: true });

      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible && !document.hidden) start(); else stop();
      }, { rootMargin: '120px 0px' }).observe(section);
      document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else if (visible) start(); });
      if ('ResizeObserver' in window) new ResizeObserver(resize).observe(section); else window.addEventListener('resize', resize);
      resize();
    })();
