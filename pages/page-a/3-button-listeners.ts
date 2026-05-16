import { print_Event } from './8-print-helpers.ts';

export function attachButtonListeners() {
    preventButtonSubmit('#ctl00_WebPartManager_ESigCaptureWP_AddSignerButton');
    preventButtonSubmit('#ctl00_WebPartManager_ButtonsBar_SubmitSignatures');
}

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
