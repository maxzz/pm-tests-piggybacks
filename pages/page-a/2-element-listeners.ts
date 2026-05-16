import { print_Element } from './8-print-helpers.ts';
import { type WatchedField, expectHtmlElement, watchedFieldEventNames } from './9-types.ts';

export function attachFieldActivityLogging() {
    attachFieldActivityLogging_internal(watchedFields);
}

const watchedFields: readonly WatchedField[] = [
    {
        selector: '#ctl00_WebPartManager_ESigCaptureWP_SignerField_Edit',
        nickname: 'user1',
    },
    {
        selector: '#ctl00_WebPartManager_ESigCaptureWP_SignerPwdField_ctl00',
        nickname: 'pass1',
    },
    {
        selector: '#ctl00_WebPartManager_ESigCaptureWP_CosignerComments_ctl00',
        nickname: 'comment',
    },
];

function attachFieldActivityLogging_internal(fields: readonly WatchedField[]) {
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
