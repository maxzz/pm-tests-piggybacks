import { attachButtonClickListeners } from '@shared/1-initializers.ts';
import type { WatchedField } from '@shared/9-types.ts';

export function attachButtonListeners() {
    attachButtonClickListeners(watchButtons);
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
