export function print_Element(eventName: string, nickname: string, element: Element) {
    let value = (element as HTMLInputElement).value?.trim() || '';
    value = value.length ? ` value: ${value}` : '';

    let textContent = element.textContent?.trim() || '';
    textContent = textContent.length ? ` textContent: ${textContent}` : '';

    const isEmpty = !value && !textContent;

    const format = isEmpty ? '%s' : '%o';
    const formatObj = isEmpty ? '' : { element: `${value}${textContent}` };

    console.log(
        `%c${eventName}%c %c${nickname}%c${format}`,
        'color: #000; font-weight: bold;',
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
