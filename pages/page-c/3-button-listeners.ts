import { attachButtonClickListeners } from "@shared/1-initializers";
import type { WatchedField } from "@shared/9-types";

export function attachButtonListeners() {
    attachButtonClickListeners(watchButtons);
}

const watchButtons: readonly WatchedField[] = [
    {
        selector: '#ctl01_TemplateBody_WebPartManager1_gwpciNewContactSignInCommon_ciNewContactSignInCommon_SubmitButton',
        nickname: 'signin',
    },
];
