import { attachFieldActivityLogging } from "./2-element-listeners";
import { attachButtonListeners } from "./3-button-listeners";
import './style.css';

function main() {
    attachFieldActivityLogging();
    attachButtonListeners();
}

main();
