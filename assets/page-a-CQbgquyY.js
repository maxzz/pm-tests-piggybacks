import "./modulepreload-polyfill-CakawRF5.js";
import { n as attachFieldActivityListeners, t as attachButtonClickListeners } from "./1-initializers-B67VmqvC.js";
//#region pages/page-a/2-element-listeners.ts
function attachFieldActivityLogging() {
	attachFieldActivityListeners(watchedFields);
}
var watchedFields = [
	{
		selector: "#ctl00_WebPartManager_ESigCaptureWP_SignerField_Edit",
		nickname: "user1"
	},
	{
		selector: "#ctl00_WebPartManager_ESigCaptureWP_SignerPwdField_ctl00",
		nickname: "pass1"
	},
	{
		selector: "#ctl00_WebPartManager_ESigCaptureWP_CosignerComments_ctl00",
		nickname: "comment"
	}
];
//#endregion
//#region pages/page-a/3-button-listeners.ts
function attachButtonListeners() {
	attachButtonClickListeners(watchButtons);
}
var watchButtons = [{
	selector: "#ctl00_WebPartManager_ESigCaptureWP_AddSignerButton",
	nickname: "  add"
}, {
	selector: "#ctl00_WebPartManager_ButtonsBar_SubmitSignatures",
	nickname: "submi"
}];
//#endregion
//#region pages/page-a/0-main.ts
function main() {
	attachFieldActivityLogging();
	attachButtonListeners();
}
main();
//#endregion
