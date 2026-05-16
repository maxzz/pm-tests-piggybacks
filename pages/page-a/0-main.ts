import { attachFieldActivityLogging } from './2-element-listeners.ts';
import { attachButtonListeners } from './3-button-listeners.ts';
import './style.css';

function main() {
    attachFieldActivityLogging();
    attachButtonListeners();
}

main();
