import { attachFieldActivityListeners } from "@shared/1-initializers";
import type { WatchedField } from "@shared/9-types";

export function attachFieldActivityLogging() {
    attachFieldActivityListeners(watchedFields);
}

const watchedFields: readonly WatchedField[] = [
    {
        selector: '#ctl01_TemplateBody_WebPartManager1_gwpciNewContactSignInCommon_ciNewContactSignInCommon_signInUserName',
        nickname: 'user1',
    },
    {
        selector: '#ctl01_TemplateBody_WebPartManager1_gwpciNewContactSignInCommon_ciNewContactSignInCommon_signInPassword',
        nickname: 'pass1',
    },
    {
        selector: '#ctl01_ciNewUtilityNavigationCommon1_ctl05_SearchTerms',
        nickname: 'search',
    },
];
