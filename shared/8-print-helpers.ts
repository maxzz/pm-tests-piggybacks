import { maxEventNameLength } from "./9-types";

export function print_Element(event: Event, nickname: string, element: Element) {
    const paddedType = event.type.padStart(maxEventNameLength, ' ');

    let value = (element as HTMLInputElement).value?.trim() || '';
    value = value.length ? ` value: ${value}` : '';

    let textContent = element.textContent?.trim() || '';
    textContent = textContent.length ? ` textContent: ${textContent}` : '';

    const isEmpty = !value && !textContent;
    const format = isEmpty ? '%s' : '%o';
    const formatObj = isEmpty ? '' : { element: `${value}${textContent}` };

    const dimEventName = event.type === 'focus' || event.type === 'blur';

    console.log(
        `%c${paddedType}%c %c${nickname}%c${format}`,
        dimEventName ? 'color: #797979; ' : 'color: #000; font-weight: bold;',
        '',
        'color: #006B8E; font-size: 10px;',
        '',
        formatObj,
    );
}

export function print_Event(event: Event) {
    console.log({
        type: event.type,
        path: {
            target: event.target,
            currentTarget: event.currentTarget,
            composedPath: event.composedPath(),
        },
        isTrusted: event.isTrusted,
    });
}
