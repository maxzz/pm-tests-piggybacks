export type WatchedField = { selector: string; nickname: string; };

export const watchedFieldEventNames = [
    'focus',
    'blur',
    'input',
    'change',
    'click',
] as const;

export const maxEventNameLength = Math.max(...watchedFieldEventNames.map((name) => name.length));

export function expectHtmlElement(element: Element | null, selector: string): HTMLElement {
    if (!element) {
        throw new Error(`Element not found for selector: ${selector}`);
    }
    if (!(element instanceof HTMLElement)) {
        throw new TypeError(`Expected HTMLElement for selector: ${selector}`);
    }
    return element;
}
