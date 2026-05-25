import "./modulepreload-polyfill-CakawRF5.js";
import { n as attachFieldActivityListeners, t as attachButtonClickListeners } from "./1-initializers-B67VmqvC.js";
//#region pages/page-c/2-element-listeners.ts
function attachFieldActivityLogging() {
	attachFieldActivityListeners(watchedFields);
}
var watchedFields = [
	{
		selector: "#ctl01_TemplateBody_WebPartManager1_gwpciNewContactSignInCommon_ciNewContactSignInCommon_signInUserName",
		nickname: "user1"
	},
	{
		selector: "#ctl01_TemplateBody_WebPartManager1_gwpciNewContactSignInCommon_ciNewContactSignInCommon_signInPassword",
		nickname: "pass1"
	},
	{
		selector: "#ctl01_ciNewUtilityNavigationCommon1_ctl05_SearchTerms",
		nickname: "search"
	}
];
//#endregion
//#region pages/page-c/3-button-listeners.ts
function attachButtonListeners() {
	attachButtonClickListeners(watchButtons);
}
var watchButtons = [{
	selector: "#ctl01_TemplateBody_WebPartManager1_gwpciNewContactSignInCommon_ciNewContactSignInCommon_SubmitButton",
	nickname: "signin"
}];
//#endregion
//#region pages/page-c/0-main.ts
function main() {
	attachFieldActivityLogging();
	attachButtonListeners();
}
main();
//#endregion
