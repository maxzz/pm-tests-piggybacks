//#region src/components/9-pages.ts
var pages = [
	{
		folder: "page-a",
		path: "/pages/page-a"
	},
	{
		folder: "page-c",
		path: "/pages/page-c"
	},
	{
		folder: "page-c-extracted",
		path: "/pages/page-c-extracted"
	},
	{
		folder: "page-d",
		path: "/pages/page-d"
	},
	{
		folder: "page-y-for-new",
		path: "/pages/page-y-for-new"
	}
];
//#endregion
//#region src/components/1-headers.ts
function renderNav(navSelector) {
	const nav = document.querySelector(navSelector);
	if (!nav) return;
	const current = normalizePathname(window.location.pathname);
	nav.replaceChildren();
	const home = document.createElement("a");
	home.href = "/";
	home.textContent = "piggybacks";
	home.className = "home-link";
	if (current === "/") home.setAttribute("aria-current", "page");
	nav.appendChild(home);
	for (const page of pages) {
		const href = page.path.endsWith("/") ? page.path : `${page.path}/`;
		const a = document.createElement("a");
		a.href = href;
		a.textContent = page.folder;
		if (normalizePathname(href) === current) a.setAttribute("aria-current", "page");
		nav.appendChild(a);
	}
}
function normalizePathname(pathname) {
	let p = pathname || "/";
	if (p.endsWith("index.html")) p = p.slice(0, -10);
	if (!p.startsWith("/")) p = `/${p}`;
	if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
	return p;
}
//#endregion
export { renderNav as t };
