import { pages } from './pages.ts';

import typescriptLogo from './assets/typescript.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';

import './nav.css';
import './style.css';

function normalizePathname(pathname: string) {
    let p = pathname || '/';
    if (p.endsWith('index.html')) p = p.slice(0, -'index.html'.length);
    if (!p.startsWith('/')) p = `/${p}`;
    if (p !== '/' && p.endsWith('/')) p = p.slice(0, -1);
    return p;
}

function renderNav() {
    const nav = document.querySelector<HTMLElement>('#page-nav');
    if (!nav) return;

    const current = normalizePathname(window.location.pathname);

    nav.replaceChildren();

    const home = document.createElement('a');
    home.href = '/';
    home.textContent = 'piggybacks';
    home.className = 'home-link';
    if (current === '/') home.setAttribute('aria-current', 'page');
    nav.appendChild(home);

    for (const page of pages) {
        const href = `/${page.path}/`;
        const a = document.createElement('a');
        a.href = href;
        a.textContent = page.folder;

        const hrefNormalized = normalizePathname(href);
        if (hrefNormalized === current) a.setAttribute('aria-current', 'page');

        nav.appendChild(a);
    }
}

renderNav();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
</section>
`;

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)