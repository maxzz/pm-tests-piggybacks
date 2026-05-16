import { print_Element } from './8-print-helpers.ts';

export function attachFieldActivityLogging() {
    attachFieldActivityLogging_internal(watchedFields);
}

type WatchedField = { selector: string; nickname: string; };

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

const watchedFieldEventNames = [
    ' focus',
    '  blur',
    ' input',
    'change',
    ' click',
] as const;

function attachFieldActivityLogging_internal(fields: readonly WatchedField[]) {
    const seen = new WeakSet<EventTarget>();

    for (const { selector, nickname } of fields) {
        for (const el of Array.from(document.querySelectorAll(selector))) {
            if (!el) {
                console.error(`Element not found: ${selector}`);
                continue;
            }
            if (!(el instanceof HTMLElement)) {
                console.error(`Element is not an HTMLElement: ${selector}`);
                continue;
            }
            if (seen.has(el)) {
                continue;
            }
            seen.add(el);

            const htmlElement = el as HTMLElement;
            for (const eventName of watchedFieldEventNames) {
                htmlElement.addEventListener(eventName.trim(), () => {
                    print_Element(eventName, nickname, htmlElement);
                });
            }
        }
    }
}
