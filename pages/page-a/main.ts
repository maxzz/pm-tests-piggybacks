import './style.css';

// Event types to watch

const watchedFieldSelectors: readonly string[] = [
    '#ctl00_WebPartManager_ESigCaptureWP_SignerField_Edit',
    '#ctl00_WebPartManager_ESigCaptureWP_SignerPwdField_ctl00',
    '#ctl00_WebPartManager_ESigCaptureWP_CosignerComments_ctl00',
];

function attachFieldActivityLogging(selectors: readonly string[]) {
    const seen = new WeakSet<EventTarget>();

    for (const selector of selectors) {
        for (const el of Array.from(document.querySelectorAll(selector))) {
            if (seen.has(el)) continue;
            seen.add(el);

            el.addEventListener('focus', () => {
                console.log('[focus]', selector, el);
            });
            el.addEventListener('blur', () => {
                console.log('[blur]', selector, el);
            });
            el.addEventListener('input', () => {
                console.log('[input]', selector, el);
            });
            el.addEventListener('change', () => {
                console.log('[change]', selector, el);
            });
            el.addEventListener('click', () => {
                console.log('[click]', selector, el);
            });
        }
    }
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
        console.log('[submit]', selector, e);
    });
}

// Main function

function main() {
    attachFieldActivityLogging(watchedFieldSelectors);
    preventButtonSubmit('#ctl00_WebPartManager_ESigCaptureWP_AddSignerButton');
}

main();
