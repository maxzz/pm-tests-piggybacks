import { type WatchedField, expectHtmlElement, watchedFieldEventNames, } from './9-types.ts';
import { print_Element } from './8-print-helpers.ts';

export function attachFieldActivityListeners(fields: readonly WatchedField[]) {
    const seen = new WeakSet<EventTarget>();

    for (const { selector, nickname } of fields) {
        for (const el of Array.from(document.querySelectorAll(selector))) {
            const htmlElement = expectHtmlElement(el, selector);

            if (seen.has(htmlElement)) {
                continue;
            }
            seen.add(htmlElement);

            for (const eventName of watchedFieldEventNames) {
                htmlElement.addEventListener(eventName, (event) => {
                    print_Element(event, nickname, htmlElement);
                });
            }
        }
    }
}

export function attachButtonClickListeners(fields: readonly WatchedField[]) {
    for (const { selector, nickname } of fields) {
        const element = document.querySelector(selector);
        const htmlElement = expectHtmlElement(element, selector);

        htmlElement.addEventListener('click', (e) => {
            e.preventDefault();
            print_Element(e, nickname, htmlElement);
        });
    }
}
