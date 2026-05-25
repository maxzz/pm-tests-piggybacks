//#region shared/9-types.ts
var watchedFieldEventNames = [
	"focus",
	"blur",
	"input",
	"change",
	"click"
];
var maxEventNameLength = Math.max(...watchedFieldEventNames.map((name) => name.length));
function expectHtmlElement(element, selector) {
	if (!element) throw new Error(`Element not found for selector: ${selector}`);
	if (!(element instanceof HTMLElement)) throw new TypeError(`Expected HTMLElement for selector: ${selector}`);
	return element;
}
//#endregion
//#region shared/8-print-helpers.ts
function print_Element(event, nickname, element) {
	const paddedType = event.type.padStart(maxEventNameLength, " ");
	let value = element.value?.trim() || "";
	value = value.length ? ` value: ${value}` : "";
	let textContent = element.textContent?.trim() || "";
	textContent = textContent.length ? ` textContent: ${textContent}` : "";
	const isEmpty = !value && !textContent;
	const format = isEmpty ? "%s" : "%o";
	const formatObj = isEmpty ? "" : { element: `${value}${textContent}` };
	const dimEventName = event.type === "focus" || event.type === "blur";
	console.log(`%c${paddedType}%c %c${nickname}%c${format}`, dimEventName ? "color: #797979; " : "color: #000; font-weight: bold;", "", "color: #006B8E; font-size: 10px;", "", formatObj);
}
//#endregion
//#region shared/1-initializers.ts
function attachFieldActivityListeners(fields) {
	const seen = /* @__PURE__ */ new WeakSet();
	for (const { selector, nickname } of fields) for (const el of Array.from(document.querySelectorAll(selector))) {
		const htmlElement = expectHtmlElement(el, selector);
		if (seen.has(htmlElement)) continue;
		seen.add(htmlElement);
		for (const eventName of watchedFieldEventNames) htmlElement.addEventListener(eventName, (event) => {
			print_Element(event, nickname, htmlElement);
		});
	}
}
function attachButtonClickListeners(fields) {
	for (const { selector, nickname } of fields) {
		const htmlElement = expectHtmlElement(document.querySelector(selector), selector);
		htmlElement.addEventListener("click", (e) => {
			e.preventDefault();
			print_Element(e, nickname, htmlElement);
		});
	}
}
//#endregion
export { attachFieldActivityListeners as n, attachButtonClickListeners as t };
