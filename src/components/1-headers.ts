import { pages } from "./9-pages";

export function renderNav(navSelector: string) {
    const nav = document.querySelector<HTMLElement>(navSelector);
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
        const urlPath = page.path.startsWith('./') ? page.path.slice(2) : page.path;
        const href = `/${urlPath}/`;
        const a = document.createElement('a');
        a.href = href;
        a.textContent = page.folder;

        const hrefNormalized = normalizePathname(href);
        if (hrefNormalized === current) a.setAttribute('aria-current', 'page');

        nav.appendChild(a);
    }
}

function normalizePathname(pathname: string) {
    let p = pathname || '/';
    if (p.endsWith('index.html')) p = p.slice(0, -'index.html'.length);
    if (!p.startsWith('/')) p = `/${p}`;
    if (p !== '/' && p.endsWith('/')) p = p.slice(0, -1);
    return p;
}

