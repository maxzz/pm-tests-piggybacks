import { pages } from "./9-pages";

export function renderNav(navSelector: string) {
    const nav = document.querySelector<HTMLElement>(navSelector);
    if (!nav) return;

    const current = normalizePathname(window.location.pathname);

    nav.replaceChildren();

    const home = document.createElement("a");
    home.href = import.meta.env.BASE_URL || "/";
    home.textContent = "piggybacks";
    home.className = "home-link";
    if (current === normalizePathname(new URL(home.href, window.location.origin).pathname))
        home.setAttribute("aria-current", "page");
    nav.appendChild(home);

    for (const page of pages) {
        const href = hrefFromPagesPath(page.path);
        const a = document.createElement("a");
        a.href = href;
        a.textContent = page.folder;

        const hrefNormalized = normalizePathname(href);
        if (hrefNormalized === current) a.setAttribute("aria-current", "page");

        nav.appendChild(a);
    }
}

function normalizePathname(pathname: string) {
    let p = pathname || "/";
    if (p.endsWith("index.html")) {
        p = p.slice(0, -"index.html".length);
    }
    if (!p.startsWith("/")) {
        p = `/${p}`;
    }
    if (p !== "/" && p.endsWith("/")) {
        p = p.slice(0, -1);
    }
    return p;
}

/** Resolve a repo-relative path from `9-pages` (e.g. `./pages/foo`) to a pathname `href` that respects `import.meta.env.BASE_URL` (local `/` vs GitHub Pages `/repo/`). */
function hrefFromPagesPath(pagesPath: string): string {
    const rel = pagesPath.startsWith("./") ? pagesPath.slice(2) : pagesPath.replace(/^\//, "");
    const base = import.meta.env.BASE_URL || "/";
    const baseUrl = new URL(base, window.location.href);
    const resolved = new URL(rel, baseUrl);
    
    let pathname = resolved.pathname;
    if (pathname !== "/" && !pathname.endsWith("/")) {
        pathname += "/";
    }
    return pathname;
}
