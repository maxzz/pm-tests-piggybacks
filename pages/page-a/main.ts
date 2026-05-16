import './style.css';

type WatchedField = { selector: string; nickname: string };

const watchedFields: readonly WatchedField[] = [
    {
        selector: '#ctl00_WebPartManager_ESigCaptureWP_SignerField_Edit',
        nickname: 'signer',
    },
    {
        selector: '#ctl00_WebPartManager_ESigCaptureWP_SignerPwdField_ctl00',
        nickname: 'signerPwd',
    },
    {
        selector: '#ctl00_WebPartManager_ESigCaptureWP_CosignerComments_ctl00',
        nickname: 'signerComment',
    },
];

function attachFieldActivityLogging(fields: readonly WatchedField[]) {
    const seen = new WeakSet<EventTarget>();

    for (const { selector, nickname } of fields) {
        for (const el of Array.from(document.querySelectorAll(selector))) {
            if (seen.has(el)) continue;
            seen.add(el);

            el.addEventListener('focus', () => {
                console.log('[focus]', nickname, el);
            });
            el.addEventListener('blur', () => {
                console.log('[blur]', nickname, el);
            });
            el.addEventListener('input', () => {
                console.log('[input]', nickname, el);
            });
            el.addEventListener('change', () => {
                console.log('[change]', nickname, el);
            });
            el.addEventListener('click', () => {
                console.log('[click]', nickname, el);
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
    attachFieldActivityLogging(watchedFields);
    preventButtonSubmit('#ctl00_WebPartManager_ESigCaptureWP_AddSignerButton');
}

main();
