/* ===========================================================
   Shared site chrome: navbar, mobile drawer, footer, reveals.
   Each page sets: <body data-page="home" data-prefix="">  (root)
                   <body data-page="about" data-prefix="../"> (subfolder)
   =========================================================== */
(function () {
    'use strict';

    const body = document.body;
    const page = body.getAttribute('data-page') || 'home';
    const prefix = body.getAttribute('data-prefix') || '';
    const CV = prefix + 'About%20Jim/Jim_Christian_Ayco_Resume.pdf';

    const links = [
        { id: 'home', label: 'Home', href: prefix + 'index.html' },
        { id: 'about', label: 'About', href: prefix + 'about/index.html' },
        { id: 'experience', label: 'Experience', href: prefix + 'work/index.html' },
        { id: 'projects', label: 'Projects', href: prefix + 'projects/index.html' },
        { id: 'skills', label: 'Skills', href: prefix + 'skills/index.html' },
        { id: 'contact', label: 'Contact', href: prefix + 'contact/index.html' },
    ];

    /* ---------- Navbar ---------- */
    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.innerHTML = `
      <div class="wrap nav-inner">
        <a class="nav-logo" href="${prefix}index.html" aria-label="Home">
          <span class="mark">JC</span><span>Jim Christian Ayco</span>
        </a>
        <div class="nav-links">
          ${links.map(l => `<a class="nav-link ${l.id === page ? 'active' : ''}" href="${l.href}"${l.id === page ? ' aria-current="page"' : ''}>${l.label}</a>`).join('')}
        </div>
        <div style="display:flex;align-items:center;gap:.6rem">
          <button class="theme-toggle" id="themeBtn" aria-label="Toggle dark mode" title="Toggle dark mode">
            <svg class="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <svg class="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke-linecap="round"/></svg>
          </button>
          <a class="btn btn-primary nav-cv-desktop" href="${CV}" download>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Download CV
          </a>
          <button class="hamburger" id="hbtn" aria-label="Open menu" aria-expanded="false" aria-controls="mdrawer">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>`;
    body.insertBefore(nav, body.firstChild);

    /* ---------- Mobile drawer ---------- */
    const overlay = document.createElement('div');
    overlay.className = 'm-overlay';
    const drawer = document.createElement('div');
    drawer.className = 'm-drawer';
    drawer.id = 'mdrawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', 'Navigation menu');
    drawer.innerHTML =
        links.map(l => `<a class="${l.id === page ? 'active' : ''}" href="${l.href}"${l.id === page ? ' aria-current="page"' : ''}>${l.label}</a>`).join('') +
        `<a class="m-cv" href="${CV}" download>Download CV</a>`;
    nav.insertAdjacentElement('afterend', drawer);
    nav.insertAdjacentElement('afterend', overlay);

    const hbtn = nav.querySelector('#hbtn');
    const bars = hbtn.querySelectorAll('span');
    let open = false;

    function setBars(x) {
        bars[0].style.transform = x ? 'translateY(7px) rotate(45deg)' : '';
        bars[1].style.opacity = x ? '0' : '1';
        bars[2].style.transform = x ? 'translateY(-7px) rotate(-45deg)' : '';
    }
    function openMenu() {
        open = true; drawer.classList.add('show'); overlay.classList.add('show');
        hbtn.setAttribute('aria-expanded', 'true'); hbtn.setAttribute('aria-label', 'Close menu');
        body.style.overflow = 'hidden'; setBars(true);
        const first = drawer.querySelector('a'); if (first) first.focus();
    }
    function closeMenu() {
        open = false; drawer.classList.remove('show'); overlay.classList.remove('show');
        hbtn.setAttribute('aria-expanded', 'false'); hbtn.setAttribute('aria-label', 'Open menu');
        body.style.overflow = ''; setBars(false);
    }
    hbtn.addEventListener('click', function (e) { e.stopPropagation(); open ? closeMenu() : openMenu(); });
    overlay.addEventListener('click', closeMenu);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) { closeMenu(); hbtn.focus(); } });
    window.addEventListener('resize', () => { if (window.innerWidth > 900 && open) closeMenu(); });

    /* ---------- Footer ---------- */
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="wrap" style="padding-top:2.25rem;padding-bottom:2.25rem;display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between">
        <p style="font-size:.9rem;color:#94a3b8;margin:0">© 2026 Jim Christian Ayco. All rights reserved.</p>
        <div style="display:flex;gap:.65rem;align-items:center">
          <a href="https://www.linkedin.com/in/jim-christian-ayco-a28b52297/" target="_blank" rel="noopener" aria-label="LinkedIn" style="width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
          </a>
          <a href="https://github.com/jimayco" target="_blank" rel="noopener" aria-label="GitHub" style="width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="mailto:jimchritianayco@gmail.com" aria-label="Email" style="width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>`;
    body.appendChild(footer);

    /* ---------- Theme toggle (persisted) ---------- */
    const themeBtn = nav.querySelector('#themeBtn');
    themeBtn.addEventListener('click', function () {
        const root = document.documentElement;
        const dark = root.getAttribute('data-theme') === 'dark';
        if (dark) { root.removeAttribute('data-theme'); try { localStorage.setItem('theme', 'light'); } catch (e) { } }
        else { root.setAttribute('data-theme', 'dark'); try { localStorage.setItem('theme', 'dark'); } catch (e) { } }
        if (window.__syncBgTheme) window.__syncBgTheme();
    });

    /* ---------- AI-automation background network ---------- */
    (function bgCanvas() {
        // tool -> [brand color, monogram]
        const TOOL = {
            n8n: ['#ea4b71', 'n8'], OpenAI: ['#10a37f', 'AI'], Claude: ['#d97757', 'C'],
            HubSpot: ['#ff7a59', 'H'], Gmail: ['#ea4335', 'M'], Sheets: ['#34a853', 'GS'],
            API: ['#4b8bff', '{}'], Webhook: ['#7c5cff', '»'], PostgreSQL: ['#336791', 'P'],
            Firebase: ['#ffa000', '◆'], GitHub: ['#6e7681', 'GH'], WordPress: ['#21759b', 'W'],
            Database: ['#38bdf8', 'DB'], Figma: ['#a259ff', 'F'], JSON: ['#64748b', '{}'], MySQL: ['#00758f', 'My'],
        };
        // per-page arrangements: [xPercent, yPercent, tool]
        const LAYOUTS = {
            home: [[5, 12, 'n8n'], [12, 26, 'Webhook'], [3, 40, 'Sheets'], [9, 54, 'Gmail'], [4, 70, 'API'], [11, 85, 'PostgreSQL'],
                   [94, 16, 'HubSpot'], [88, 30, 'OpenAI'], [95, 45, 'Claude'], [90, 60, 'Firebase'], [94, 74, 'GitHub'], [89, 88, 'WordPress']],
            about: [[5, 16, 'Claude'], [11, 32, 'Figma'], [3, 50, 'GitHub'], [9, 70, 'n8n'], [5, 86, 'API'],
                    [93, 18, 'OpenAI'], [88, 36, 'Firebase'], [95, 56, 'Gmail'], [90, 76, 'Sheets']],
            experience: [[5, 14, 'n8n'], [11, 30, 'Webhook'], [3, 48, 'HubSpot'], [9, 68, 'Gmail'], [5, 86, 'Sheets'],
                         [94, 18, 'API'], [89, 38, 'OpenAI'], [95, 60, 'Database'], [90, 82, 'GitHub']],
            projects: [[4, 16, 'n8n'], [10, 34, 'JSON'], [4, 56, 'Webhook'], [9, 80, 'API'],
                       [94, 20, 'HubSpot'], [89, 42, 'Gmail'], [95, 66, 'Sheets'], [90, 86, 'OpenAI']],
            skills: [[5, 15, 'GitHub'], [11, 32, 'Firebase'], [3, 52, 'MySQL'], [9, 74, 'n8n'],
                     [93, 18, 'Claude'], [88, 40, 'OpenAI'], [95, 62, 'API'], [90, 84, 'WordPress']],
            contact: [[5, 20, 'Gmail'], [11, 42, 'Webhook'], [4, 68, 'n8n'],
                      [94, 22, 'API'], [89, 48, 'HubSpot'], [95, 74, 'Database']],
        };
        const layout = LAYOUTS[page] || LAYOUTS.home;
        const W = 1440, H = 1000, NW = 128, NH = 46, BADGE = 28;
        const pts = layout.map((n, i) => ({ x: n[0] / 100 * W, y: n[1] / 100 * H, t: n[2], side: n[0] < 50 ? 'L' : 'R', i }));

        let lines = '';
        ['L', 'R'].forEach(side => {
            const col = pts.filter(p => p.side === side).sort((a, b) => a.y - b.y);
            for (let i = 0; i < col.length - 1; i++) {
                const a = col[i], c = col[i + 1];
                const ax = a.x + NW / 2, ay = a.y + NH, cx = c.x + NW / 2, cy = c.y;
                lines += `<path class="bg-line ${i > 1 ? 'bg-hideable' : ''}" style="animation-delay:${(i * 0.4).toFixed(1)}s" d="M ${ax} ${ay} C ${ax} ${ay + 55}, ${cx} ${cy - 55}, ${cx} ${cy}"/>`;
            }
        });

        const cards = pts.map(p => {
            const [color, mono] = TOOL[p.t] || ['#4b8bff', '•'];
            return `<g class="bg-node ${p.i > 5 ? 'bg-hideable' : ''}" style="animation-delay:${(p.i * 0.7).toFixed(1)}s">
                <rect class="bg-card" x="${p.x}" y="${p.y}" width="${NW}" height="${NH}" rx="12"/>
                <rect class="bg-badge" x="${p.x + 9}" y="${p.y + (NH - BADGE) / 2}" width="${BADGE}" height="${BADGE}" rx="8" fill="${color}"/>
                <text class="bg-mono" x="${p.x + 9 + BADGE / 2}" y="${p.y + NH / 2 + 4}" text-anchor="middle" font-size="12">${mono}</text>
                <text class="bg-label" x="${p.x + 46}" y="${p.y + NH / 2 + 4}" font-size="14">${p.t}</text>
              </g>`;
        }).join('');

        const div = document.createElement('div');
        div.className = 'bg-canvas';
        div.setAttribute('aria-hidden', 'true');
        div.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${lines}${cards}</svg>`;
        body.insertBefore(div, body.firstChild);
    })();

    /* ---------- Dark-mode flashlight on profile (home, desktop) ---------- */
    if (page === 'home') {
        const art = document.querySelector('.hero-art');
        if (art && !window.matchMedia('(pointer: coarse)').matches) {
            const torch = document.createElement('div');
            torch.className = 'torch';
            art.appendChild(torch);
            let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
            function loop() {
                cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
                torch.style.setProperty('--tx', cx.toFixed(1) + 'px');
                torch.style.setProperty('--ty', cy.toFixed(1) + 'px');
                if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) raf = requestAnimationFrame(loop);
                else raf = 0;
            }
            art.addEventListener('pointerenter', () => art.classList.add('torch-on'));
            art.addEventListener('pointerleave', () => art.classList.remove('torch-on'));
            art.addEventListener('pointermove', function (e) {
                const r = art.getBoundingClientRect();
                tx = e.clientX - r.left; ty = e.clientY - r.top;
                if (!raf) raf = requestAnimationFrame(loop);
            });
        }
    }

    /* ---------- Reveal on scroll ---------- */
    const items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && items.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
        }, { threshold: 0.12 });
        items.forEach(el => io.observe(el));
    } else {
        items.forEach(el => el.classList.add('in'));
    }
})();
