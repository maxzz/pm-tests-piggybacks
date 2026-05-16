import './style.css';

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

function attachFieldActivityLogging(fields: readonly WatchedField[]) {
    const seen = new WeakSet<EventTarget>();

    for (const { selector, nickname } of fields) {
        for (const el of Array.from(document.querySelectorAll(selector))) {
            if (seen.has(el)) {
                continue;
            }
            seen.add(el);

            el.addEventListener('focus', () => {
                console.log(`[focus]: ${nickname}`, print_Element(el));
            });
            el.addEventListener('blur', () => {
                console.log(`[blur]: ${nickname}`, print_Element(el));
            });
            el.addEventListener('input', () => {
                console.log(`[input]: ${nickname}`, print_Element(el));
            });
            el.addEventListener('change', () => {
                console.log(`[change]: ${nickname}`, print_Element(el));
            });
            el.addEventListener('click', () => {
                console.log(`[click]: ${nickname}`, print_Element(el));
            });
        }
    }
}

function print_Element(element: Element) {
    console.log({element: `[${element.tagName}]: value: ${element.getAttribute('value')} textContent: ${element.textContent}`});
}

function print_Event(event: Event) {
    console.log({event: `[${event.type}]: target: ${event.target} currentTarget: ${event.currentTarget} composedPath: ${event.composedPath()} trusted: ${event.isTrusted}`});
}

// Prevent button from submitting the form

function preventButtonSubmit(selector: string) {
    const element = document.querySelector(selector);
    if (!element) {
        console.error(`Button not found: ${selector}`);
        return;
    }

    element.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`[submit]: ${selector}`, print_Event(e));
    });
}

// Main function

function main() {
    attachFieldActivityLogging(watchedFields);
    preventButtonSubmit('#ctl00_WebPartManager_ESigCaptureWP_AddSignerButton');
}

main();
