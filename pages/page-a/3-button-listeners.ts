import { type WatchedField, expectHtmlElement } from '@shared/9-types.ts';
import { print_Element } from '@shared/8-print-helpers.ts';

export function attachButtonListeners() {
    for (const button of watchButtons) {

        const { selector, nickname } = button;
        const element = document.querySelector(selector);
        const htmlElement = expectHtmlElement(element, selector);

        htmlElement.addEventListener('click', (e) => {
            e.preventDefault();
            print_Element(e, nickname, htmlElement);
        });
    }
}

const watchButtons: readonly WatchedField[] = [
    {
        selector: '#ctl00_WebPartManager_ESigCaptureWP_AddSignerButton',
        nickname: '  add',
    },
    {
        selector: '#ctl00_WebPartManager_ButtonsBar_SubmitSignatures',
        nickname: 'submi',
    },
];
