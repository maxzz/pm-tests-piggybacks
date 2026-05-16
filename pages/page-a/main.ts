import './style.css';
import { attachFieldActivityLogging, print_Event, watchedFields } from './2-events-trace.ts';

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
