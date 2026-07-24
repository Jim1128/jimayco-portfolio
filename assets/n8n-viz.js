/* ===========================================================
   n8n workflow board renderer — data-driven from real JSON exports.
   Recreates the n8n editor look: dark dotted canvas, node cards with
   colored icons + labels, curved connections, animated data packets.
   Full boards support scroll-to-zoom and drag-to-pan.
   =========================================================== */
(function () {
    'use strict';

    const NODE_W = 104, NODE_H = 66, PAD = 90, LABEL_H = 40;

    // n8n-node type -> [icon, accent color]
    const TYPES = {
        webhook: ['🔗', '#ea4b71'], respondToWebhook: ['↩', '#ea4b71'],
        code: ['{ }', '#b3b3bd'], function: ['{ }', '#b3b3bd'], functionItem: ['{ }', '#b3b3bd'],
        set: ['✎', '#69b3ff'], merge: ['⇄', '#a26bf0'], if: ['IF', '#38c1b3'],
        switch: ['SW', '#38c1b3'], filter: ['≡', '#38c1b3'],
        googleSheets: ['GS', '#34a853'], gmail: ['✉', '#ea4335'], gmailTrigger: ['✉', '#ea4335'],
        httpRequest: ['🌐', '#4b8bff'], hubspot: ['H', '#ff7a59'], noOp: ['•', '#8a8a94'],
        wait: ['⏱', '#9aa0aa'], scheduleTrigger: ['⏱', '#9aa0aa'], cron: ['⏱', '#9aa0aa'],
        manualTrigger: ['▶', '#9aa0aa'], openAi: ['✦', '#10a37f'], anthropic: ['✦', '#d97757'],
        agent: ['🤖', '#a26bf0'], lmChatOpenAi: ['✦', '#10a37f'], lmChatAnthropic: ['✦', '#d97757'],
        slack: ['#', '#e01e5a'], splitInBatches: ['⋔', '#69b3ff'], itemLists: ['≣', '#69b3ff'],
        googleDrive: ['GD', '#4b8bff'], spreadsheetFile: ['GS', '#34a853'], emailReadImap: ['✉', '#ea4335'],
        errorTrigger: ['⚠', '#ff5a5a'], executeWorkflow: ['⟳', '#69b3ff'], stickyNote: ['▤', '#d9b038'],
        aggregate: ['∑', '#69b3ff'], removeDuplicates: ['≂', '#38c1b3'], dateTime: ['◷', '#9aa0aa'],
        html: ['</>', '#b3b3bd'], extractFromFile: ['▤', '#34a853'], convertToFile: ['▤', '#34a853'],
    };
    function meta(t) { return TYPES[t] || ['⚙', '#7c9bff']; }
    function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
    let SEQ = 0;

    function buildBounds(nodes) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        nodes.forEach(n => {
            minX = Math.min(minX, n.x); minY = Math.min(minY, n.y);
            maxX = Math.max(maxX, n.x + NODE_W); maxY = Math.max(maxY, n.y + NODE_H);
        });
        return { vbX: minX - PAD, vbY: minY - PAD, vbW: (maxX + PAD) - (minX - PAD), vbH: (maxY + PAD + LABEL_H) - (minY - PAD) };
    }

    // returns inner SVG markup (defs + edges + packets + nodes)
    function buildInner(wf, uid, opts) {
        const nodes = wf.nodes || [];
        const byName = {};
        nodes.forEach(n => byName[n.n] = n);

        let paths = '', packets = '', cards = '';
        (wf.edges || []).forEach((e, i) => {
            const s = byName[e[0]], t = byName[e[1]];
            if (!s || !t) return;
            const sx = s.x + NODE_W, sy = s.y + NODE_H / 2;
            const tx = t.x, ty = t.y + NODE_H / 2;
            const dx = Math.max(45, Math.abs(tx - sx) * 0.5);
            const d = `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`;
            const pid = uid + 'p' + i;
            paths += `<path id="${pid}" d="${d}" fill="none" stroke="#4c505e" stroke-width="2"/>`;
            if (!opts.mini) {
                packets += `<circle r="3.6" fill="#7ca8ff"><animateMotion dur="2.6s" begin="${(i % 7) * 0.35}s" repeatCount="indefinite"><mpath href="#${pid}"/></animateMotion></circle>`;
            }
        });

        nodes.forEach(n => {
            const [icon, color] = meta(n.t);
            const cx = n.x, cy = n.y;
            const label = n.n.length > 20 ? n.n.slice(0, 19) + '…' : n.n;
            cards += `<g>
                <circle cx="${cx}" cy="${cy + NODE_H / 2}" r="3" fill="#6b6f7d"/>
                <circle cx="${cx + NODE_W}" cy="${cy + NODE_H / 2}" r="3" fill="#6b6f7d"/>
                <rect x="${cx}" y="${cy}" width="${NODE_W}" height="${NODE_H}" rx="12" fill="#2b2d37" stroke="${color}" stroke-opacity="0.9" stroke-width="1.5"/>
                <rect x="${cx + 6}" y="${cy + 6}" width="${NODE_H - 12}" height="${NODE_H - 12}" rx="9" fill="${color}22"/>
                <text x="${cx + NODE_H / 2}" y="${cy + NODE_H / 2 + 7}" text-anchor="middle" font-size="20" fill="${color}">${esc(icon)}</text>
                ${opts.mini ? '' : `<text x="${cx + NODE_W / 2}" y="${cy + NODE_H + 17}" text-anchor="middle" font-size="12" font-weight="700" fill="#d4d8e2">${esc(label)}</text>
                <text x="${cx + NODE_W / 2}" y="${cy + NODE_H + 31}" text-anchor="middle" font-size="10" fill="#7a828f">${esc(n.t)}</text>`}
              </g>`;
        });

        const dots = `<pattern id="${uid}dot" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.3" fill="#2c2e37"/></pattern>`;
        return { dots, paths, packets, cards };
    }

    window.renderN8nBoard = function (container, wf, opts) {
        opts = opts || {};
        const nodes = wf.nodes || [];
        if (!nodes.length) { container.innerHTML = '<p style="color:#8a94a6;padding:1rem">No graph data.</p>'; return; }
        const uid = 'b' + (SEQ++).toString(36);
        const b = buildBounds(nodes);
        const inner = buildInner(wf, uid, opts);

        // ---------- MINI (static, fitted) ----------
        if (opts.mini) {
            container.innerHTML =
                `<svg viewBox="${b.vbX} ${b.vbY} ${b.vbW} ${b.vbH}" preserveAspectRatio="xMidYMid meet"
                      style="width:100%;height:100%;display:block;background:#17171d">
                   <defs>${inner.dots}</defs>
                   <rect x="${b.vbX}" y="${b.vbY}" width="${b.vbW}" height="${b.vbH}" fill="url(#${uid}dot)"/>
                   ${inner.paths}${inner.cards}
                 </svg>`;
            return;
        }

        // ---------- FULL (zoom + pan) ----------
        container.innerHTML =
            `<div class="n8n-canvas" tabindex="0" aria-label="${esc(wf.title)} workflow board — scroll to zoom, drag to pan">
               <div class="n8n-viewport">
                 <svg width="${b.vbW}" height="${b.vbH}" viewBox="${b.vbX} ${b.vbY} ${b.vbW} ${b.vbH}" style="display:block">
                   <defs>${inner.dots}</defs>
                   <rect x="${b.vbX}" y="${b.vbY}" width="${b.vbW}" height="${b.vbH}" fill="url(#${uid}dot)"/>
                   ${inner.paths}${inner.packets}${inner.cards}
                 </svg>
               </div>
               <div class="n8n-zoom-btns">
                 <button type="button" data-z="in" aria-label="Zoom in">+</button>
                 <button type="button" data-z="out" aria-label="Zoom out">−</button>
                 <button type="button" data-z="reset" aria-label="Reset view" style="font-size:.7rem">⟲</button>
               </div>
               <span class="n8n-zoom-hint">Scroll to zoom · drag to pan</span>
             </div>`;

        const canvas = container.querySelector('.n8n-canvas');
        const vp = container.querySelector('.n8n-viewport');

        const state = { s: 1, x: 0, y: 0, min: 0.2, max: 3 };
        function apply(smooth) {
            vp.classList.toggle('smooth', !!smooth);
            vp.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.s})`;
        }
        function fit() {
            const cw = canvas.clientWidth, ch = canvas.clientHeight;
            const f = Math.min(cw / b.vbW, ch / b.vbH);
            state.s = f; state.min = Math.max(0.1, f * 0.6); state.max = f * 5 + 3;
            state.x = (cw - b.vbW * f) / 2;
            state.y = (ch - b.vbH * f) / 2;
            apply(false);
        }
        function zoomAt(px, py, factor) {
            const ns = Math.min(state.max, Math.max(state.min, state.s * factor));
            const k = ns / state.s;
            state.x = px - (px - state.x) * k;
            state.y = py - (py - state.y) * k;
            state.s = ns;
            apply(true);
        }
        // wheel zoom (scoped to board, never scrolls page)
        canvas.addEventListener('wheel', function (e) {
            e.preventDefault(); e.stopPropagation();
            const r = canvas.getBoundingClientRect();
            zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 0.89);
        }, { passive: false });
        // drag pan
        let drag = null;
        canvas.addEventListener('pointerdown', function (e) {
            drag = { x: e.clientX, y: e.clientY, ox: state.x, oy: state.y };
            canvas.classList.add('dragging'); canvas.setPointerCapture(e.pointerId);
        });
        canvas.addEventListener('pointermove', function (e) {
            if (!drag) return;
            state.x = drag.ox + (e.clientX - drag.x);
            state.y = drag.oy + (e.clientY - drag.y);
            apply(false);
        });
        function endDrag() { drag = null; canvas.classList.remove('dragging'); }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);
        canvas.addEventListener('dblclick', function () { fit(); });
        // buttons
        canvas.querySelector('[data-z="in"]').addEventListener('click', () => zoomAt(canvas.clientWidth / 2, canvas.clientHeight / 2, 1.25));
        canvas.querySelector('[data-z="out"]').addEventListener('click', () => zoomAt(canvas.clientWidth / 2, canvas.clientHeight / 2, 0.8));
        canvas.querySelector('[data-z="reset"]').addEventListener('click', fit);

        // fit once laid out
        requestAnimationFrame(fit);
        container._n8nFit = fit; // allow caller to refit after container resizes
    };
})();
