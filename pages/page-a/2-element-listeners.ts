import { attachFieldActivityListeners } from '@shared/1-initializers.ts';
import type { WatchedField } from '@shared/9-types.ts';

export function attachFieldActivityLogging() {
    attachFieldActivityListeners(watchedFields);
}

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
