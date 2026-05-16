export type WatchedField = { selector: string; nickname: string };

export const watchedFields: readonly WatchedField[] = [
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

export function attachFieldActivityLogging(fields: readonly WatchedField[]) {
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
    value = value.length ? ` value: ${value}` : '';

    let textContent = element.textContent?.trim() || '';
    textContent = textContent.length ? ` textContent: ${textContent}` : '';

    const isEmpty = !value && !textContent;

    const format = isEmpty ? '%s' : '%o';
    const formatObj = isEmpty ? '' : { element: `${value}${textContent}` };

    console.log(
        `%c${eventName}%c %c<${nickname}>%c${format}`,
        'color: #000; font-weight: bold;',
        'color: #000;',
        'color: #006B8E;',
        'color: #000;',
        formatObj,
    );
}

export function print_Event(event: Event) {
    console.log({
        event: `[${event.type}]: target: ${event.target} currentTarget: ${event.currentTarget} composedPath: ${event.composedPath()} trusted: ${event.isTrusted}`,
    });
}
