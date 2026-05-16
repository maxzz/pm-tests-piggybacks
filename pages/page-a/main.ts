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
                print_Element('focus', nickname, el);
            });
            el.addEventListener('blur', () => {
                print_Element('blur', nickname, el);
            });
            el.addEventListener('input', () => {
                print_Element('input', nickname, el);
            });
            el.addEventListener('change', () => {
                print_Element('change', nickname, el);
            });
            el.addEventListener('click', () => {
                print_Element('click', nickname, el);
            });
        }
    }
}

function print_Element(eventName: string, nickname: string, element: Element) {
    let value = (element as HTMLInputElement).value?.trim() || '';
    value = value.length ? `value: ${value}` : '';
    
    let textContent = element.textContent?.trim() || '';
    textContent = textContent.length ? ` textContent: ${textContent}` : '';
    
    const isEmpty = !value && !textContent;

    let format = '%o'
    if (isEmpty) {
        format = '%s';
    }

    console.log(
        `<${eventName}>${nickname}:${format}`,
        isEmpty ? '' : { element: `${value}${textContent}` });
}

function print_Event(event: Event) {
    console.log({ event: `[${event.type}]: target: ${event.target} currentTarget: ${event.currentTarget} composedPath: ${event.composedPath()} trusted: ${event.isTrusted}` });
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
